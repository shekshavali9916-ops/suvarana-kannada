import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT) || 3000;
const IS_PROD = process.env.NODE_ENV === 'production';

const SUVARNA_SYSTEM_INSTRUCTION = `You are "Suvarna" (ಸುವರ್ಣ), a dedicated scholarly cultural guide, historian, and language tutor exclusively focused on Karnataka and the Kannada language.

STRICT DOMAIN SCOPE:
- You ONLY answer questions related to Kannada and Karnataka:
  1. Karnataka's past history, kingdoms, and dynasties (Kadambas, Western Gangas, Badami & Kalyani Chalukyas, Rashtrakutas, Hoysalas, Vijayanagara Empire, Bahmani/Adil Shahi Deccan heritage in Karnataka, Kingdom of Mysore/Wodeyars, Keladi Nayakas, Kittur, Chitradurga, Unification / Ekikarana of Karnataka).
  2. Famous cultural events, festivals, and performing arts (Mysuru Dasara, Hampi Utsav, Kambala, Bengaluru Karaga, Yakshagana, Dollu Kunitha, Ugadi, Pattadakal Dance Festival, Kannada Rajyotsava, Makara Sankranti, Bhoota Kola).
  3. Karnataka tourism destinations, UNESCO World Heritage sites, hill stations, coastal towns, temples, wildlife sanctuaries, and travel itineraries within Karnataka.
  4. Kannada language learning: vocabulary, everyday phrases, grammar, Kannada script (Varnamale), transliteration, pronunciation guidance, and proverbs (Gaadegalu).
  5. Jnanpith Prashasti winners in Kannada (Kuvempu, D. R. Bendre, K. Shivaram Karanth, Masti Venkatesha Iyengar, V. K. Gokak, U. R. Ananthamurthy, Girish Karnad, Chandrashekhara Kambara) and broader Kannada literature (Pampa, Ranna, Ponna, Vachana Sahitya, Dasa Sahitya, Navodaya, Navya, Bandaya).
  6. Famous historical figures, rulers, social reformers, scientists, artists, musicians, and cultural icons from Karnataka (Basavanna, Akkamahadevi, Kittur Rani Chennamma, Krishnadevaraya, Sir M. Visvesvaraya, Purandara Dasa, Kempegowda I, Onake Obavva, Dr. Rajkumar, Bhimsen Joshi, C. N. R. Rao, Shakuntala Devi, etc.).
  7. Traditional Karnataka cuisine, crafts (Mysore silk, Channapatna toys, Bidriware, Ilkal sarees, Sandalwood carving), and geography.

OFF-TOPIC HANDLING:
- If the user asks about topics unrelated to Kannada or Karnataka (for example: general programming, unrelated world politics, non-Karnataka recipes, generic math homework, foreign sports, or general tech support), politely decline in 2 warm sentences. State that Suvarna is devoted solely to Karnataka heritage and the Kannada language, and suggest 2-3 compelling Karnataka topics they can ask about instead.

STYLE & FORMAT:
- Keep responses warm, historically accurate, structured, and concise (typically 120 to 260 words unless the user asks for an in-depth itinerary or essay).
- Include authentic Kannada words or phrases in Kannada script alongside Romanized transliteration when helpful (e.g., ನಮಸ್ಕಾರ — Namaskāra).
- If the user writes in Kannada or asks you to reply in Kannada, respond fluently in Kannada.
- Use clean short paragraphs and concise bullet points (using "- ") rather than dense walls of text.`;

interface ChatHistoryTurn {
  role: 'user' | 'model';
  text: string;
}

function createGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY?.trim();
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '1mb' }));

  app.get('/api/health', (_req, res) => {
    res.json({ ok: true, service: 'suvarna-kannada' });
  });

  app.post('/api/chat', async (req, res) => {
    try {
      const body = req.body as { message?: unknown; history?: unknown };
      const rawMessage = typeof body?.message === 'string' ? body.message.trim() : '';

      if (!rawMessage) {
        res.status(400).json({ error: 'Please enter a question about Kannada or Karnataka.' });
        return;
      }

      if (rawMessage.length > 2000) {
        res.status(400).json({ error: 'Message is too long. Please keep questions under 2,000 characters.' });
        return;
      }

      const ai = createGeminiClient();
      if (!ai) {
        res.status(503).json({
          error:
            'The Gemini API key is not configured on the server. Please set GEMINI_API_KEY in Settings > Secrets to enable live responses.',
        });
        return;
      }

      const sanitizedHistory: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];
      if (Array.isArray(body.history)) {
        for (const entry of body.history.slice(-16)) {
          const turn = entry as Partial<ChatHistoryTurn>;
          if (
            (turn.role === 'user' || turn.role === 'model') &&
            typeof turn.text === 'string' &&
            turn.text.trim().length > 0
          ) {
            sanitizedHistory.push({
              role: turn.role,
              parts: [{ text: turn.text.trim().slice(0, 3000) }],
            });
          }
        }
      }

      const callChat = async () => {
        const chat = ai.chats.create({
          model: 'gemini-4-hydrogen',
          history: sanitizedHistory,
          config: {
            systemInstruction: SUVARNA_SYSTEM_INSTRUCTION,
          },
        });
        return chat.sendMessage({ message: rawMessage });
      };

      let response;
      try {
        response = await callChat();
      } catch (firstErr: unknown) {
        const status =
          typeof firstErr === 'object' && firstErr !== null && 'status' in firstErr
            ? Number((firstErr as { status?: unknown }).status)
            : 0;
        if (status === 500 || status === 502 || status === 503 || status === 504) {
          await new Promise((resolve) => setTimeout(resolve, 800));
          response = await callChat();
        } else {
          throw firstErr;
        }
      }

      const reply = response.text?.trim();

      if (!reply) {
        res.status(502).json({
          error: 'Suvarna received an empty response from the language model. Please try asking again.',
        });
        return;
      }

      res.json({ reply });
    } catch (err: unknown) {
      const status =
        typeof err === 'object' && err !== null && 'status' in err
          ? Number((err as { status?: unknown }).status)
          : 500;
      const message = err instanceof Error ? err.message : 'Unexpected server error';
      console.error('[Suvarna Chat API Error]', status, message);

      if (
        status === 403 ||
        status === 401 ||
        message.includes('API_KEY_INVALID') ||
        message.includes('PERMISSION_DENIED')
      ) {
        res.status(403).json({
          error:
            'API key authentication failed. Please check or select a valid GEMINI_API_KEY in Settings > Secrets.',
        });
        return;
      }

      if (status === 429 || message.includes('RESOURCE_EXHAUSTED')) {
        res.status(429).json({
          error:
            'The Gemini service is temporarily rate-limited. Please wait a moment or check your API key quota in Settings > Secrets.',
        });
        return;
      }

      if (status === 404 || message.includes('NOT_FOUND')) {
        res.status(404).json({
          error: 'The configured Gemini model was not found. Please check model availability.',
        });
        return;
      }

      res.status(status >= 400 && status < 600 ? status : 500).json({
        error: `Unable to reach Suvarna right now (status ${status || 500}). Please try again shortly.`,
      });
    }
  });

  if (IS_PROD) {
    const distDir = path.resolve(__dirname, 'dist');
    app.use(express.static(distDir));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Suvarna Kannada server listening on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
