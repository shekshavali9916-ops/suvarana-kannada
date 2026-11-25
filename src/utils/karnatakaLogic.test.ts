import test from 'node:test';
import assert from 'node:assert/strict';
import {
  HERITAGE_AND_EVENTS,
  JNANPITH_LAUREATES,
  QUIZ_QUESTIONS,
  KANNADA_PHRASES,
} from '../data/karnatakaData';
import {
  validateChatInput,
  buildChatHistoryPayload,
  filterItemsByQueryAndCategory,
  selectQuizQuestions,
  evaluateQuizAnswer,
  calculateQuizSummary,
  calculateLanguageProgress,
  parseFormattedResponse,
} from './karnatakaLogic';

test('validateChatInput rejects blank and overly long prompts', () => {
  const empty = validateChatInput('   ');
  assert.equal(empty.valid, false);
  assert.ok(empty.error);

  const tooLong = validateChatInput('a'.repeat(2005));
  assert.equal(tooLong.valid, false);

  const valid = validateChatInput('  Tell me about Kuvempu  ');
  assert.equal(valid.valid, true);
  assert.equal(valid.cleaned, 'Tell me about Kuvempu');
});

test('buildChatHistoryPayload trims empty items and limits to maxTurns', () => {
  const history = Array.from({ length: 20 }, (_, i) => ({
    id: `m-${i}`,
    role: (i % 2 === 0 ? 'user' : 'model') as 'user' | 'model',
    text: `Turn ${i}`,
    timestamp: '10:00',
  }));
  const payload = buildChatHistoryPayload(history, 6);
  assert.equal(payload.length, 6);
  assert.equal(payload[0].text, 'Turn 14');
  assert.equal(payload[5].text, 'Turn 19');
});

test('archive data contains all 8 Kannada Jnanpith laureates in chronological order', () => {
  assert.equal(JNANPITH_LAUREATES.length, 8);
  assert.equal(JNANPITH_LAUREATES[0].year, 1967);
  assert.equal(JNANPITH_LAUREATES[7].year, 2010);
});

test('filterItemsByQueryAndCategory filters heritage items by category and text search', () => {
  const eventsOnly = filterItemsByQueryAndCategory(
    HERITAGE_AND_EVENTS,
    '',
    'Cultural Events',
    (item) => [item.title, item.kannadaTitle, item.summary, item.region]
  );
  assert.ok(eventsOnly.length > 0);
  assert.ok(eventsOnly.every((item) => item.category === 'Cultural Events'));

  const hampiSearch = filterItemsByQueryAndCategory(
    HERITAGE_AND_EVENTS,
    'Hampi',
    'All',
    (item) => [item.title, item.kannadaTitle, item.summary, item.region]
  );
  assert.ok(hampiSearch.length >= 2);
});

test('quiz selection, answer evaluation, streaks, and mastery summary work accurately', () => {
  const jnanpithPool = selectQuizQuestions(QUIZ_QUESTIONS, 'Jnanpith', 10);
  assert.ok(jnanpithPool.length >= 3);
  assert.ok(jnanpithPool.every((q) => q.category === 'Jnanpith'));

  const first = jnanpithPool[0];
  const right = evaluateQuizAnswer(first, first.correctIndex, 2);
  assert.equal(right.isCorrect, true);
  assert.equal(right.nextStreak, 3);

  const wrong = evaluateQuizAnswer(first, (first.correctIndex + 1) % 4, 3);
  assert.equal(wrong.isCorrect, false);
  assert.equal(wrong.nextStreak, 0);

  const highSummary = calculateQuizSummary(
    [right.record, right.record, right.record, right.record, right.record, right.record, right.record, right.record, right.record, right.record],
    10
  );
  assert.equal(highSummary.accuracyPercent, 100);
  assert.equal(highSummary.masteryTitle, 'Kannada Vidwan');

  const midSummary = calculateQuizSummary([right.record, wrong.record], 1);
  assert.equal(midSummary.accuracyPercent, 50);
  assert.equal(midSummary.masteryTitle, 'Heritage Explorer');
});

test('calculateLanguageProgress deduplicates IDs and clamps percentage', () => {
  const progress = calculateLanguageProgress(['ph-1', 'ph-1', 'ph-2', 'ph-3', 'ph-4'], KANNADA_PHRASES.length);
  assert.equal(progress.masteredCount, 4);
  assert.equal(progress.percent, Math.round((4 / KANNADA_PHRASES.length) * 100));
});

test('parseFormattedResponse extracts headings, bullet lists, and paragraphs cleanly', () => {
  const raw = `## Mysuru Dasara\n\nMysuru celebrates Nada Habba.\n\n- Golden Howdah\n- Illuminated Palace\n\nVisit in October.`;
  const blocks = parseFormattedResponse(raw);
  assert.equal(blocks.length, 4);
  assert.equal(blocks[0].type, 'heading');
  assert.equal(blocks[0].content, 'Mysuru Dasara');
  assert.equal(blocks[1].type, 'paragraph');
  assert.equal(blocks[2].type, 'list');
  assert.deepEqual(blocks[2].items, ['Golden Howdah', 'Illuminated Palace']);
  assert.equal(blocks[3].type, 'paragraph');
});
