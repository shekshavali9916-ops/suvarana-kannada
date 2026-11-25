import { useState } from 'react';
import {
  Volume2,
  Check,
  RotateCw,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
} from 'lucide-react';
import { KANNADA_PHRASES, KANNADA_VOWELS, type KannadaPhrase } from '../data/karnatakaData';
import { calculateLanguageProgress } from '../utils/karnatakaLogic';

interface LanguageStudioViewProps {
  masteredIds: string[];
  onToggleMastered: (id: string) => void;
  onAskSuvarna: (prompt: string) => void;
}

type StudioTab = 'phrasebook' | 'flashcards' | 'varnamale';
const PHRASE_CATEGORIES = ['All', 'Greetings', 'Travel', 'Dining', 'Essentials'] as const;

export function LanguageStudioView({
  masteredIds,
  onToggleMastered,
  onAskSuvarna,
}: LanguageStudioViewProps) {
  const [activeTab, setActiveTab] = useState<StudioTab>('phrasebook');
  const [phraseCategory, setPhraseCategory] =
    useState<(typeof PHRASE_CATEGORIES)[number]>('All');
  const [cardIndex, setCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [speakingId, setSpeakingId] = useState<string | null>(null);

  const progress = calculateLanguageProgress(masteredIds, KANNADA_PHRASES.length);

  const visiblePhrases =
    phraseCategory === 'All'
      ? KANNADA_PHRASES
      : KANNADA_PHRASES.filter((p) => p.category === phraseCategory);

  const currentCard: KannadaPhrase = KANNADA_PHRASES[cardIndex % KANNADA_PHRASES.length];
  const isCurrentMastered = masteredIds.includes(currentCard.id);

  const speakKannada = (text: string, id: string) => {
    setSpeakingId(id);
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'kn-IN';
        utterance.rate = 0.88;
        utterance.onend = () => setSpeakingId(null);
        utterance.onerror = () => setSpeakingId(null);
        window.speechSynthesis.speak(utterance);
        return;
      } catch {
        // Fall through to brief visual indicator
      }
    }
    window.setTimeout(() => setSpeakingId(null), 700);
  };

  const handleNextCard = () => {
    setIsFlipped(false);
    setCardIndex((prev) => (prev + 1) % KANNADA_PHRASES.length);
  };

  const handlePrevCard = () => {
    setIsFlipped(false);
    setCardIndex((prev) => (prev - 1 + KANNADA_PHRASES.length) % KANNADA_PHRASES.length);
  };

  return (
    <div className="max-w-[1160px] mx-auto px-6 sm:px-8 py-8 space-y-8">
      <header className="border-b border-[#E5DCCB] pb-6">
        <p className="text-xs font-medium text-[#8B1E24] tracking-wide">
          Local Language Learning Tools · <span className="font-kannada">ಕನ್ನಡ ಕಲಿಕಾ ಕೇಂದ್ರ</span>
        </p>
        <div className="mt-2 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#1F1916]">
              Learn Spoken &amp; Written Kannada
            </h1>
            <p className="text-[15px] text-[#5C5147] mt-2 max-w-2xl leading-relaxed">
              Practice everyday conversational phrases with syllable guides, flip through interactive flashcards, and explore the Kannada Varnamale vowels.
            </p>
          </div>

          <div className="bg-white border border-[#E5DCCB] rounded-lg px-4 py-3 shrink-0">
            <div className="flex items-center justify-between gap-6 text-xs text-[#5C5147]">
              <span>Phrases Mastered</span>
              <span className="font-mono font-semibold text-[#8B1E24] tabular-nums">
                {progress.masteredCount}/{progress.totalPhrases} ({progress.percent}%)
              </span>
            </div>
            <div className="w-48 h-1.5 bg-[#EFE8DA] rounded-full mt-2 overflow-hidden">
              <div
                className="h-full bg-[#B6862C] transition-all duration-200"
                style={{ width: `${progress.percent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Studio Mode Tabs */}
        <div
          className="mt-6 inline-flex items-center gap-1 p-1 bg-[#EFE8DA] rounded-lg"
          role="tablist"
          aria-label="Language learning tool mode"
        >
          {(
            [
              { id: 'phrasebook', label: 'Everyday Phrasebook' },
              { id: 'flashcards', label: 'Interactive Flashcards' },
              { id: 'varnamale', label: 'Varnamale Vowels' },
            ] as const
          ).map((tab) => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#8B1E24] ${
                  active
                    ? 'bg-[#8B1E24] text-[#FBF7EE]'
                    : 'text-[#4F443B] hover:text-[#1F1916]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </header>

      {/* TAB 1: PHRASEBOOK */}
      {activeTab === 'phrasebook' && (
        <section className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              {PHRASE_CATEGORIES.map((cat) => {
                const active = phraseCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setPhraseCategory(cat)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-colors whitespace-nowrap shrink-0 ${
                      active
                        ? 'bg-[#F9F2E1] border-[#B6862C] text-[#681318]'
                        : 'bg-white border-[#E5DCCB] text-[#5C5147] hover:text-[#1F1916]'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() =>
                onAskSuvarna(
                  'Give me a short beginner Kannada conversation dialogue for ordering Mysore filter coffee and masala dosa, with Kannada script and transliteration.'
                )
              }
              className="inline-flex items-center gap-1.5 text-xs font-medium text-[#8B1E24] hover:underline whitespace-nowrap"
            >
              <MessageSquare className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Practice live dialogue with Suvarna</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {visiblePhrases.map((phrase) => {
              const mastered = masteredIds.includes(phrase.id);
              return (
                <article
                  key={phrase.id}
                  className="bg-white border border-[#E5DCCB] rounded-xl p-5 flex flex-col justify-between gap-4"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xs text-[#6B5F54]">{phrase.category}</p>
                        <p className="font-kannada text-2xl font-semibold text-[#1F1916] mt-1">
                          {phrase.kannada}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => speakKannada(phrase.kannada, phrase.id)}
                        aria-label={`Listen to pronunciation of ${phrase.transliteration}`}
                        className={`p-2.5 rounded-lg border transition-colors shrink-0 focus-visible:outline-2 focus-visible:outline-[#8B1E24] ${
                          speakingId === phrase.id
                            ? 'bg-[#8B1E24] border-[#8B1E24] text-[#FBF7EE]'
                            : 'bg-[#FCF9F3] border-[#E5DCCB] text-[#681318] hover:border-[#B6862C]'
                        }`}
                      >
                        <Volume2 className="w-4 h-4" aria-hidden="true" />
                      </button>
                    </div>

                    <p className="text-base font-semibold text-[#8B1E24] mt-2">
                      {phrase.transliteration}
                    </p>
                    <p className="text-sm text-[#1F1916] mt-0.5">{phrase.english}</p>
                    <p className="font-mono text-xs text-[#7D7063] mt-1.5">
                      Pronounce: {phrase.pronunciation}
                    </p>
                    <p className="text-xs text-[#5C5147] mt-2 leading-relaxed">
                      {phrase.usageNote}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#EFE7D8] flex items-center justify-between gap-3">
                    <span className="text-xs text-[#6B5F54]">
                      {mastered ? 'Marked as learned' : 'In study deck'}
                    </span>
                    <button
                      type="button"
                      onClick={() => onToggleMastered(phrase.id)}
                      aria-label={
                        mastered
                          ? `Remove mastered mark for ${phrase.transliteration}`
                          : `Mark ${phrase.transliteration} as mastered`
                      }
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                        mastered
                          ? 'bg-[#1F5E3B] text-white hover:bg-[#17492D]'
                          : 'bg-[#F9F2E1] text-[#681318] hover:bg-[#F0E1BC]'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>{mastered ? 'Mastered' : 'Mark Mastered'}</span>
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      )}

      {/* TAB 2: INTERACTIVE FLASHCARDS */}
      {activeTab === 'flashcards' && (
        <section className="max-w-2xl mx-auto space-y-6">
          <div className="flex items-center justify-between text-xs text-[#5C5147]">
            <span className="font-mono tabular-nums">
              Card {cardIndex + 1} of {KANNADA_PHRASES.length} · {currentCard.category}
            </span>
            <span>Click the card to reveal translation</span>
          </div>

          <button
            type="button"
            onClick={() => setIsFlipped((prev) => !prev)}
            aria-label={isFlipped ? 'Flip flashcard to Kannada script' : 'Flip flashcard to reveal English meaning'}
            className="w-full min-h-[290px] bg-white border border-[#DCD0BA] rounded-2xl p-8 sm:p-10 text-center flex flex-col items-center justify-center gap-4 hover:border-[#B6862C] transition-colors focus-visible:outline-2 focus-visible:outline-[#8B1E24]"
          >
            {!isFlipped ? (
              <>
                <span className="text-xs font-medium text-[#8B1E24]">Kannada Script</span>
                <p className="font-kannada text-4xl sm:text-5xl font-semibold text-[#1F1916] leading-snug">
                  {currentCard.kannada}
                </p>
                <p className="text-lg font-medium text-[#9A6E20]">
                  {currentCard.transliteration}
                </p>
                <span className="inline-flex items-center gap-1.5 text-xs text-[#7D7063] mt-3">
                  <RotateCw className="w-3.5 h-3.5" aria-hidden="true" />
                  Tap to reveal meaning
                </span>
              </>
            ) : (
              <>
                <span className="text-xs font-medium text-[#9A6E20]">English Meaning &amp; Guide</span>
                <p className="font-serif text-2xl sm:text-3xl font-semibold text-[#1F1916]">
                  {currentCard.english}
                </p>
                <p className="font-mono text-sm text-[#8B1E24]">
                  {currentCard.pronunciation}
                </p>
                <p className="text-sm text-[#5C5147] max-w-md leading-relaxed">
                  {currentCard.usageNote}
                </p>
              </>
            )}
          </button>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrevCard}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium bg-white border border-[#DCD0BA] rounded-lg text-[#1F1916] hover:bg-[#EFE8DA]"
              >
                <ChevronLeft className="w-4 h-4" aria-hidden="true" />
                Previous
              </button>
              <button
                type="button"
                onClick={handleNextCard}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium bg-white border border-[#DCD0BA] rounded-lg text-[#1F1916] hover:bg-[#EFE8DA]"
              >
                Next
                <ChevronRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => speakKannada(currentCard.kannada, currentCard.id)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium bg-white border border-[#DCD0BA] rounded-lg text-[#681318] hover:border-[#B6862C]"
              >
                <Volume2 className="w-4 h-4" aria-hidden="true" />
                Speak
              </button>
              <button
                type="button"
                onClick={() => onToggleMastered(currentCard.id)}
                className={`inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium rounded-lg transition-colors ${
                  isCurrentMastered
                    ? 'bg-[#1F5E3B] text-white hover:bg-[#17492D]'
                    : 'bg-[#8B1E24] text-[#FBF7EE] hover:bg-[#681318]'
                }`}
              >
                <Check className="w-4 h-4" aria-hidden="true" />
                <span>{isCurrentMastered ? 'Mastered' : 'Mark Mastered'}</span>
              </button>
            </div>
          </div>
        </section>
      )}

      {/* TAB 3: VARNAMALE VOWELS */}
      {activeTab === 'varnamale' && (
        <section className="space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="font-serif text-xl font-semibold text-[#1F1916]">
                Swaragalu (ಸ್ವರಗಳು) — The 13 Kannada Vowels
              </h2>
              <p className="text-sm text-[#5C5147] mt-0.5">
                Click any letter tile to hear its pronunciation and see an everyday Kannada word.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {KANNADA_VOWELS.map((vowel) => (
              <button
                key={vowel.letter}
                type="button"
                onClick={() => speakKannada(`${vowel.letter}, ${vowel.exampleKannada}`, vowel.letter)}
                aria-label={`Pronounce Kannada vowel ${vowel.transliteration} as in ${vowel.exampleTranslit}`}
                className="text-left bg-white border border-[#E5DCCB] rounded-xl p-4 hover:border-[#B6862C] hover:bg-[#FCF9F2] transition-colors flex flex-col justify-between gap-3 focus-visible:outline-2 focus-visible:outline-[#8B1E24]"
              >
                <div className="flex items-start justify-between">
                  <span className="font-kannada text-4xl font-semibold text-[#8B1E24] leading-none">
                    {vowel.letter}
                  </span>
                  <span className="font-mono text-sm font-medium text-[#9A6E20]">
                    {vowel.transliteration}
                  </span>
                </div>

                <div className="pt-2 border-t border-[#EFE7D8]">
                  <p className="text-[11px] text-[#7D7063]">Sound: {vowel.soundHint}</p>
                  <p className="font-kannada text-sm font-medium text-[#1F1916] mt-1">
                    {vowel.exampleKannada}{' '}
                    <span className="font-sans text-xs text-[#5C5147]">
                      ({vowel.exampleTranslit})
                    </span>
                  </p>
                  <p className="text-xs text-[#6B5F54]">{vowel.exampleMeaning}</p>
                </div>
              </button>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
