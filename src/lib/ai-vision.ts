const OPENAI_API_KEY = process.env.EXPO_PUBLIC_OPENAI_API_KEY;

export interface ScannedFoodResult {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  weight_grams: number;
  confidence: number;
}

export async function analyzeFoodImage(base64Image: string): Promise<ScannedFoodResult> {
  if (!OPENAI_API_KEY) {
    throw new Error('OpenAI API key no configurada. Añade EXPO_PUBLIC_OPENAI_API_KEY en tu .env');
  }

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content:
            'Eres un nutricionista experto. Analiza la imagen de comida y devuelve SIEMPRE un JSON estricto con este formato exacto: {"name": "string", "calories": number, "protein": number, "carbs": number, "fat": number, "weight_grams": number, "confidence": number}. Los valores nutricionales deben ser por la porcion visible en la foto. Confidence entre 0 y 1. Responde SOLO con el JSON, sin markdown ni explicaciones.',
        },
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: 'Analiza esta foto de comida y devuelve el JSON con los macros estimados.',
            },
            {
              type: 'image_url',
              image_url: {
                url: `data:image/jpeg;base64,${base64Image}`,
              },
            },
          ],
        },
      ],
      max_tokens: 500,
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`OpenAI error: ${err}`);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content || '';

  // Limpiar posible markdown ```json ... ```
  const clean = content.replace(/```json?/g, '').replace(/```/g, '').trim();

  try {
    const parsed: ScannedFoodResult = JSON.parse(clean);
    return parsed;
  } catch {
    throw new Error('No se pudo parsear la respuesta de la IA');
  }
}
