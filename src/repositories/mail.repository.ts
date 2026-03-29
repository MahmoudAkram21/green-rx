import { EmailOtpCreateInput } from "../../generated/client/models";
import { prisma } from "../lib/prisma";

class MailRepository {
    async createOtp(data : EmailOtpCreateInput) {
        return prisma.emailOtp.create({
            data,
            include : {
                otpSessions : {
                    include : {
                        user : {
                            select : {
                                id : true,
                            }
                        }
                    }
                }
            }
        })
    }


    async getOtpByEmail(email: string) {
        return prisma.emailOtp.findUnique({
            where: {
                email
            },
            include : {
                otpSessions : {
                    include : {
                        user : {
                            select : {
                                id : true,
                            }
                        }
                    }
                }
            }
        })
    }


    async updateOtp(id: number, data: {attempts?: number, expiresAt?: Date , otp?: number}) {
        return prisma.emailOtp.update({
            where: {
                id
            },
            data: {
                attempts: data.attempts,
                expiresAt: data.expiresAt,
                otp: data.otp
            }
        })
    }
    async createOrUpdateOtp(email: string, otp: number, expiresAt: Date) {
        const existingOtp = await this.getOtpByEmail(email);
        if (existingOtp) {
            return this.updateOtp(existingOtp.id, { otp });
        }
        return this.createOtp({ email, otp, expiresAt });
    }

    async deleteOtp(id: number) {
        return prisma.emailOtp.delete({
            where: {
                id
            }
        })
    }


}
export default new MailRepository();