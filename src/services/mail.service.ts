import nodemailer from "nodemailer";
import mailRepository from "../repositories/mail.repository";
import { prisma } from "../lib/prisma";
import crypto from "crypto";

let transporter: nodemailer.Transporter | null = null;

/** Returns true if mail env vars are set so we can send. */
export function isMailConfigured(): boolean {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_PASSWORD;
  const host = process.env.GMAIL_HOST;
  const port = process.env.GMAIL_PORT;
  return !!(user && pass && host && port);
}

function getTransporter(): nodemailer.Transporter {
  if (!transporter) {
    const host = process.env.GMAIL_HOST || "smtp.gmail.com";
    const port = Number(process.env.GMAIL_PORT) || 587;
    transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD,
      },
      tls: {
        rejectUnauthorized: process.env.NODE_ENV === "production",
      },
    });
  }
  return transporter;
}

export interface SendMailOptions {
  to: string;
  subject: string;
  html?: string;
  text?: string;
  from?: string;
}

export async function sendMail(options: SendMailOptions): Promise<void> {
  if (!isMailConfigured()) {
    console.warn(
      "[mail] Not configured on server: set GMAIL_USER, GMAIL_PASSWORD, GMAIL_HOST, GMAIL_PORT. Skipping send."
    );
    return;
  }
  const t = getTransporter();
  const from = options.from || process.env.GMAIL_USER;
  if (!from) {
    console.warn("[mail] GMAIL_USER missing, skipping send.");
    return;
  }
  await t.sendMail({
    from,
    to: options.to,
    subject: options.subject,
    html: options.html,
    text: options.text,
  });
}

const BATCH_SIZE = 50;

export async function sendBulk(
  recipients: string[],
  options: Omit<SendMailOptions, "to">
): Promise<void> {
  for (let i = 0; i < recipients.length; i += BATCH_SIZE) {
    const batch = recipients.slice(i, i + BATCH_SIZE);
    await Promise.all(
      batch.map((to) => sendMail({ ...options, to }))
    );
  }
}


export async function sendOtpEmail(email: string, accessToken: string, userId: number): Promise<number> {

  const expiresAt = new Date(Date.now() + 1000 * 60 * 5);
  const newOtp = crypto.randomInt(100000, 999999);
  const createdOtp = await mailRepository.createOrUpdateOtp(email, newOtp, expiresAt);

  await prisma.otpSession.upsert({
    where: {
      userId_otpId: {
        userId: userId,
        otpId: createdOtp.id
      }
    },
    update: {
      token: accessToken,
    },
    create: {
      userId: userId,
      otpId: createdOtp.id,
      token: accessToken
    }
  })

  await sendMail({
    to: email,
    subject: 'Your OTP for verification',
    html: `<p>Your OTP is ${newOtp}</p>`
  })

  return newOtp;
}