import { GoogleGenAI, Type } from '@google/genai';

export interface ExtractedMedicineData {
  tradeName: string;
  activeSubstance: string;
  concentration?: string;
  dosageForm?: string;
}

const EXTRACTION_PROMPT = `From this medication package or product image, extract the following and return only the requested JSON:
- tradeName: the brand or trade name of the medicine (as shown on the package)
- activeSubstance: the generic/active substance name (e.g. paracetamol, ibuprofen)
- concentration: strength/concentration if visible (e.g. "500mg", "10mg/ml") or empty string if not found
- dosageForm: form of the medicine if visible (e.g. tablets, syrup, cream) or empty string if not found

Return only valid JSON with these keys. Use empty string for any field you cannot read from the image.`;

let ai: InstanceType<typeof GoogleGenAI> | null = null;

function getAI(): InstanceType<typeof GoogleGenAI> {
  if (!ai) {
    ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
  return ai;
}

/**
 * Extract trade name and active substance (and optional concentration, dosage form)
 * from a medication image using Gemini. Returns null on failure or empty extraction.
 */
export async function extractMedicineFromImage(
  imageBuffer: Buffer,
  mimeType: string
): Promise<ExtractedMedicineData | null> {
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
        EXTRACTION_PROMPT,
      ],
      config: {
        responseMimeType: 'application/json',
        responseJsonSchema: {
          type: Type.OBJECT,
          properties: {
            tradeName: { type: Type.STRING, description: 'Brand or trade name' },
            activeSubstance: { type: Type.STRING, description: 'Generic/active substance name' },
            concentration: { type: Type.STRING, description: 'Strength or concentration if visible' },
            dosageForm: { type: Type.STRING, description: 'Dosage form if visible' },
          },
          required: ['tradeName', 'activeSubstance'],
        },
      },
    });

    const text = (response as { text?: string })?.text;
    if (!text || typeof text !== 'string') {
      return null;
    }

    const parsed = JSON.parse(text) as Record<string, unknown>;
    const tradeName = typeof parsed.tradeName === 'string' ? parsed.tradeName.trim() : '';
    const activeSubstance = typeof parsed.activeSubstance === 'string' ? parsed.activeSubstance.trim() : '';

    if (!tradeName && !activeSubstance) {
      return null;
    }

    return {
      tradeName: tradeName || '',
      activeSubstance: activeSubstance || '',
      concentration: typeof parsed.concentration === 'string' ? parsed.concentration.trim() || undefined : undefined,
      dosageForm: typeof parsed.dosageForm === 'string' ? parsed.dosageForm.trim() || undefined : undefined,
    };
  } catch {
    return null;
  }
}
