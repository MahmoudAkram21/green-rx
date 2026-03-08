import { GoogleGenAI, Type } from '@google/genai';

const BATCH_EXTRACTION_PROMPT = `From this medication package or product image, extract ONLY the batch number (or lot number) visible on the package. Return only valid JSON with a single key "batchNumber". Use empty string if you cannot read or find any batch/lot number.`;

let ai: InstanceType<typeof GoogleGenAI> | null = null;

function getAI(): InstanceType<typeof GoogleGenAI> {
  if (!ai) {
    ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
  return ai;
}

/**
 * Extract batch/lot number from a medication package image using Gemini.
 * Returns the batch number string or null on failure or empty.
 */
export async function extractBatchNumberFromImage(
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
        BATCH_EXTRACTION_PROMPT,
      ],
      config: {
        responseMimeType: 'application/json',
        responseJsonSchema: {
          type: Type.OBJECT,
          properties: {
            batchNumber: { type: Type.STRING, description: 'Batch or lot number on the package' },
          },
          required: ['batchNumber'],
        },
      },
    });

    const text = (response as { text?: string })?.text;
    if (!text || typeof text !== 'string') {
      return null;
    }

    const parsed = JSON.parse(text) as Record<string, unknown>;
    const batchNumber = typeof parsed.batchNumber === 'string' ? parsed.batchNumber.trim() : '';
    return batchNumber || null;
  } catch {
    return null;
  }
}
