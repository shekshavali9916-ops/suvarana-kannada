import type { QuizCategory, QuizQuestion } from '../data/karnatakaData';

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
}

export interface ChatValidationResult {
  valid: boolean;
  cleaned: string;
  error?: string;
}

export interface QuizAnswerRecord {
  questionId: string;
  selectedIndex: number;
  correctIndex: number;
  isCorrect: boolean;
}

export interface QuizSummary {
  total: number;
  correct: number;
  accuracyPercent: number;
  bestStreak: number;
  masteryTitle: string;
  masteryKannada: string;
  feedback: string;
}

export interface TextBlock {
  type: 'paragraph' | 'list' | 'heading';
  content: string;
  items?: string[];
}

export function validateChatInput(rawInput: string): ChatValidationResult {
  const cleaned = rawInput.trim();
  if (!cleaned) {
    return {
      valid: false,
      cleaned: '',
      error: 'Please enter a question about Kannada or Karnataka heritage.',
    };
  }
  if (cleaned.length > 2000) {
    return {
      valid: false,
      cleaned: cleaned.slice(0, 2000),
      error: 'Please keep your question under 2,000 characters.',
    };
  }
  return { valid: true, cleaned };
}

export function buildChatHistoryPayload(
  messages: ChatMessage[],
  maxTurns = 14
): Array<{ role: 'user' | 'model'; text: string }> {
  return messages
    .filter((msg) => msg.text.trim().length > 0)
    .slice(-maxTurns)
    .map((msg) => ({
      role: msg.role,
      text: msg.text.trim(),
    }));
}

export function filterItemsByQueryAndCategory<T extends { category?: string; domain?: string }>(
  items: T[],
  query: string,
  activeCategory: string,
  searchFields: (item: T) => string[]
): T[] {
  const normalizedQuery = query.trim().toLowerCase();

  return items.filter((item) => {
    const itemCategory = item.category ?? item.domain ?? '';
    const matchesCategory = activeCategory === 'All' || itemCategory === activeCategory;
    if (!matchesCategory) {
      return false;
    }

    if (!normalizedQuery) {
      return true;
    }

    return searchFields(item).some((field) => field.toLowerCase().includes(normalizedQuery));
  });
}

export function selectQuizQuestions(
  allQuestions: QuizQuestion[],
  category: QuizCategory,
  limit = 10
): QuizQuestion[] {
  const pool =
    category === 'All'
      ? [...allQuestions]
      : allQuestions.filter((question) => question.category === category);

  return pool.slice(0, Math.max(1, Math.min(limit, pool.length)));
}

export function evaluateQuizAnswer(
  question: QuizQuestion,
  selectedIndex: number,
  currentStreak: number
): { isCorrect: boolean; nextStreak: number; record: QuizAnswerRecord } {
  const isCorrect = selectedIndex === question.correctIndex;
  const nextStreak = isCorrect ? currentStreak + 1 : 0;

  return {
    isCorrect,
    nextStreak,
    record: {
      questionId: question.id,
      selectedIndex,
      correctIndex: question.correctIndex,
      isCorrect,
    },
  };
}

export function calculateQuizSummary(
  records: QuizAnswerRecord[],
  bestStreak: number
): QuizSummary {
  const total = records.length;
  const correct = records.filter((r) => r.isCorrect).length;
  const accuracyPercent = total > 0 ? Math.round((correct / total) * 100) : 0;

  if (accuracyPercent >= 90) {
    return {
      total,
      correct,
      accuracyPercent,
      bestStreak,
      masteryTitle: 'Kannada Vidwan',
      masteryKannada: 'ಕನ್ನಡ ವಿದ್ವಾನ್',
      feedback: 'Remarkable command of Karnataka’s history, literature, and living traditions.',
    };
  }
  if (accuracyPercent >= 70) {
    return {
      total,
      correct,
      accuracyPercent,
      bestStreak,
      masteryTitle: 'Sahitya Rasika',
      masteryKannada: 'ಸಾಹಿತ್ಯ ರಸಿಕ',
      feedback: 'Strong cultural fluency across Karnataka’s dynasties, laureates, and landmarks.',
    };
  }
  if (accuracyPercent >= 50) {
    return {
      total,
      correct,
      accuracyPercent,
      bestStreak,
      masteryTitle: 'Heritage Explorer',
      masteryKannada: 'ಪರಂಪರೆ ಅನ್ವೇಷಕ',
      feedback: 'A solid foundation—explore the Jnanpith and Heritage archives to sharpen your mastery.',
    };
  }
  return {
    total,
    correct,
    accuracyPercent,
    bestStreak,
    masteryTitle: 'Curious Learner',
    masteryKannada: 'ಕನ್ನಡ ವಿದ್ಯಾರ್ಥಿ',
    feedback: 'A great beginning—chat with Suvarna or browse the cultural guides and try another round.',
  };
}

export function calculateLanguageProgress(
  masteredIds: string[],
  totalPhrases: number
): { masteredCount: number; totalPhrases: number; percent: number } {
  const uniqueCount = new Set(masteredIds).size;
  const clampedCount = Math.min(uniqueCount, Math.max(0, totalPhrases));
  const percent = totalPhrases > 0 ? Math.round((clampedCount / totalPhrases) * 100) : 0;

  return {
    masteredCount: clampedCount,
    totalPhrases,
    percent,
  };
}

export function parseFormattedResponse(rawText: string): TextBlock[] {
  const lines = rawText.replace(/\r\n/g, '\n').split('\n');
  const blocks: TextBlock[] = [];
  let listBuffer: string[] = [];
  let paragraphBuffer: string[] = [];

  const flushParagraph = () => {
    if (paragraphBuffer.length > 0) {
      blocks.push({
        type: 'paragraph',
        content: paragraphBuffer.join(' ').trim(),
      });
      paragraphBuffer = [];
    }
  };

  const flushList = () => {
    if (listBuffer.length > 0) {
      blocks.push({
        type: 'list',
        content: '',
        items: [...listBuffer],
      });
      listBuffer = [];
    }
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) {
      flushParagraph();
      flushList();
      continue;
    }

    const headingMatch = line.match(/^#{1,3}\s+(.+)$/);
    if (headingMatch) {
      flushParagraph();
      flushList();
      blocks.push({
        type: 'heading',
        content: headingMatch[1].trim(),
      });
      continue;
    }

    const bulletMatch = line.match(/^([-*•]|\d+\.)\s+(.+)$/);
    if (bulletMatch) {
      flushParagraph();
      listBuffer.push(bulletMatch[2].trim());
      continue;
    }

    flushList();
    paragraphBuffer.push(line);
  }

  flushParagraph();
  flushList();
  return blocks;
}
