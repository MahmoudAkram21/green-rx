import { GoogleGenAI, Type } from '@google/genai';

const LICENSE_EXTRACTION_PROMPT = `You are reading a professional license or registration document (e.g. Egyptian doctor syndicate card, pharmacist license).
Extract ONLY the main license / registration identification number as printed (digits and letters if present). Ignore names, dates, and titles.
Return JSON with a single key "licenseNumber". Use empty string if the number is not readable, too blurry, cropped, or missing.`;

let ai: InstanceType<typeof GoogleGenAI> | null = null;

function getAI(): InstanceType<typeof GoogleGenAI> {
  if (!ai) {
    ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
  return ai;
}

/**
 * Normalize license strings for comparison: trim, uppercase letters, remove spaces, dashes, slashes.
 * Edge cases (OCR noise, locale-specific formats) may need follow-up tuning.
 */
export function normalizeLicenseNumberForCompare(value: string): string {
  return value
    .trim()
    .toUpperCase()
    .replace(/\s+/g, '')
    .replace(/[-/]/g, '');
}

/**
 * Extract license number from a license document image using Gemini.
 * Returns null when API key is missing, request fails, parse fails, or model returns empty (unreadable).
 */
export async function extractLicenseNumberFromImage(
  imageBuffer: Buffer,
  mimeType: string
): Promise<string | null> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }

  try {
    const base64 = imageBuffer.toString('base64');
    const client = getAI();

    const response = await client.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        {
          inlineData: {
            mimeType,
            data: base64,
          },
        },
        LICENSE_EXTRACTION_PROMPT,
      ],
      config: {
        responseMimeType: 'application/json',
        responseJsonSchema: {
          type: Type.OBJECT,
          properties: {
            licenseNumber: { type: Type.STRING, description: 'License or registration number as printed' },
          },
          required: ['licenseNumber'],
        },
      },
    });

    const text = (response as { text?: string })?.text;
    if (!text || typeof text !== 'string') {
      return null;
    }

    const parsed = JSON.parse(text) as Record<string, unknown>;
    const licenseNumber =
      typeof parsed.licenseNumber === 'string' ? parsed.licenseNumber.trim() : '';
    return licenseNumber || null;
  } catch {
    return null;
  }
}
