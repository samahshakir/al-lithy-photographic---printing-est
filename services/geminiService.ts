
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY || "";

export const getProductAdvice = async (query: string, lang: 'ar' | 'en') => {
  if (!API_KEY) return null;
  
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  const systemInstruction = lang === 'ar' 
    ? "أنت مساعد خبير لمؤسسة الليثي لمواد التصوير. ساعد العميل في اختيار ورق التصوير أو مواد الطباعة المناسبة بناءً على استفساره. كن مهنياً ومختصراً."
    : "You are an expert advisor for Al Lithy Photographic Est. Help customers choose the right photo paper or printing materials based on their inquiry. Be professional and concise.";

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: query,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return null;
  }
};
