import { GoogleGenerativeAI } from '@google/generative-ai';
import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

type AIProvider = 'gemini' | 'openai';

const getProvider = (): AIProvider => {
  const provider = process.env.AI_PROVIDER as AIProvider;
  return provider === 'openai' ? 'openai' : 'gemini';
};

// Gemini response
const getGeminiResponse = async (prompt: string): Promise<string> => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'your_gemini_api_key_here') {
    throw new Error('GEMINI_API_KEY is not configured. Please add your key to backend/.env');
  }

  const genAI = new GoogleGenerativeAI(apiKey);

  // Try models in priority order — 2.5-flash first as it has wider quota availability
  const modelNames = ['gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-flash-latest'];
  let lastError: Error | null = null;

  for (const modelName of modelNames) {
    try {
      const model = genAI.getGenerativeModel({
        model: modelName,
        generationConfig: {
          temperature: 0.7,
          topP: 0.9,
          maxOutputTokens: 2048,
        },
      });

      const result = await model.generateContent(prompt);
      const candidate = result.response.candidates?.[0];
      const text = result.response.text();

      // Warn if truncated by token limit
      if (candidate?.finishReason === 'MAX_TOKENS') {
        console.warn(`[Gemini] Response was truncated (MAX_TOKENS). Consider increasing maxOutputTokens.`);
      }

      if (!text) throw new Error('Empty response from Gemini.');
      console.log(`✅ Gemini response received using model: ${modelName}`);
      return text;
    } catch (err) {
      lastError = err instanceof Error ? err : new Error(String(err));
      console.warn(`Gemini model ${modelName} failed: ${lastError.message}`);
    }
  }

  throw new Error(`Gemini API failed: ${lastError?.message || 'Unknown error'}. Check your API key at https://aistudio.google.com/app/apikey`);
};

// OpenAI response
const getOpenAIResponse = async (prompt: string): Promise<string> => {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error('OPENAI_API_KEY is not configured.');

  const openai = new OpenAI({ apiKey });

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'system',
        content:
          'You are HealthGPT, a compassionate healthcare assistant for rural communities in India. Always prioritize safety and recommend professional medical help when needed.',
      },
      { role: 'user', content: prompt },
    ],
    temperature: 0.7,
    max_tokens: 1024,
  });

  const text = completion.choices[0]?.message?.content;
  if (!text) throw new Error('Empty response from OpenAI.');
  return text;
};

// Main AI call with fallback
export const getAIResponse = async (prompt: string): Promise<string> => {
  const provider = getProvider();

  try {
    if (provider === 'openai') {
      return await getOpenAIResponse(prompt);
    }
    return await getGeminiResponse(prompt);
  } catch (primaryError) {
    console.warn(`Primary AI provider (${provider}) failed:`, primaryError);

    // Try fallback
    try {
      if (provider === 'openai') {
        console.log('Falling back to Gemini...');
        return await getGeminiResponse(prompt);
      } else {
        console.log('Falling back to OpenAI...');
        return await getOpenAIResponse(prompt);
      }
    } catch (fallbackError) {
      console.error('Both AI providers failed:', fallbackError);
      throw new Error(
        'Unable to get AI response. Please check your API keys and try again.'
      );
    }
  }
};
