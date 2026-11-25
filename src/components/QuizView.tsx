import { useState } from 'react';
import { CheckCircle2, XCircle, RotateCcw, ArrowRight, Award } from 'lucide-react';
import {
  QUIZ_QUESTIONS,
  type QuizCategory,
  type QuizQuestion,
} from '../data/karnatakaData';
import {
  calculateQuizSummary,
  evaluateQuizAnswer,
  selectQuizQuestions,
  type QuizAnswerRecord,
} from '../utils/karnatakaLogic';

interface QuizViewProps {
  bestScore: number | null;
  onCompleteQuiz: (accuracyPercent: number) => void;
}

const QUIZ_CATEGORIES: QuizCategory[] = [
  'All',
  'History',
  'Jnanpith',
  'Tourism',
  'Language',
  'Luminaries',
];

export function QuizView({ bestScore, onCompleteQuiz }: QuizViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<QuizCategory>('All');
  const [phase, setPhase] = useState<'setup' | 'active' | 'summary'>('setup');
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [records, setRecords] = useState<QuizAnswerRecord[]>([]);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);

  const startQuiz = (category: QuizCategory) => {
    const picked = selectQuizQuestions(QUIZ_QUESTIONS, category, 10);
    setSelectedCategory(category);
    setQuestions(picked);
    setCurrentIndex(0);
    setSelectedOption(null);
    setRecords([]);
    setStreak(0);
    setBestStreak(0);
    setPhase('active');
  };

  const handleChooseOption = (optionIndex: number) => {
    if (selectedOption !== null) return;
    const currentQuestion = questions[currentIndex];
    const result = evaluateQuizAnswer(currentQuestion, optionIndex, streak);
    setSelectedOption(optionIndex);
    setStreak(result.nextStreak);
    setBestStreak((prev) => Math.max(prev, result.nextStreak));
    setRecords((prev) => [...prev, result.record]);
  };

  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
    } else {
      const summary = calculateQuizSummary(records, bestStreak);
      onCompleteQuiz(summary.accuracyPercent);
      setPhase('summary');
    }
  };

  const currentQuestion = questions[currentIndex];
  const summary = phase === 'summary' ? calculateQuizSummary(records, bestStreak) : null;

  return (
    <div className="max-w-[920px] mx-auto px-6 sm:px-8 py-8 space-y-8">
      <header className="border-b border-[#E5DCCB] pb-6">
        <p className="text-xs font-medium text-[#8B1E24] tracking-wide">
          Interactive Knowledge Challenge · <span className="font-kannada">ಕನ್ನಡ ಸಾಂಸ್ಕೃತಿಕ ರಸಪ್ರಶ್ನೆ</span>
        </p>
        <div className="mt-2 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#1F1916]">
              Kannada Culture Quiz
            </h1>
            <p className="text-[15px] text-[#5C5147] mt-1.5">
              Test your familiarity with Karnataka dynasties, Jnanpith authors, tourism landmarks, and everyday Kannada.
            </p>
          </div>
          {bestScore !== null && (
            <div className="text-xs text-[#5C5147] font-mono tabular-nums shrink-0">
              Personal Best: <strong className="text-[#8B1E24]">{bestScore}%</strong>
            </div>
          )}
        </div>
      </header>

      {/* SETUP PHASE */}
      {phase === 'setup' && (
        <section className="bg-white border border-[#E5DCCB] rounded-xl p-6 sm:p-8 space-y-6">
          <div>
            <h2 className="font-serif text-xl font-semibold text-[#1F1916]">
              Choose a Quiz Topic
            </h2>
            <p className="text-sm text-[#5C5147] mt-1">
              Select a full mixed round or focus on a specific pillar of Karnataka heritage.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {QUIZ_CATEGORIES.map((cat) => {
              const count = selectQuizQuestions(QUIZ_QUESTIONS, cat, 10).length;
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`p-4 rounded-xl border text-left transition-colors focus-visible:outline-2 focus-visible:outline-[#8B1E24] ${
                    active
                      ? 'bg-[#FCF6E8] border-[#8B1E24] text-[#1F1916]'
                      : 'bg-[#FAF7F2] border-[#E5DCCB] text-[#4A3F38] hover:border-[#B6862C]'
                  }`}
                >
                  <p className="text-sm font-semibold">{cat === 'All' ? 'All Topics' : cat}</p>
                  <p className="font-mono text-xs text-[#6B5F54] tabular-nums mt-1">
                    {count} {count === 1 ? 'question' : 'questions'}
                  </p>
                </button>
              );
            })}
          </div>

          <div className="pt-4 border-t border-[#EFE7D8] flex items-center justify-between gap-4">
            <p className="text-xs text-[#6B5F54]">
              Immediate historical explanations included after every question.
            </p>
            <button
              type="button"
              onClick={() => startQuiz(selectedCategory)}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium bg-[#8B1E24] text-[#FBF7EE] rounded-lg hover:bg-[#681318] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#B6862C]"
            >
              <span>Start Quiz</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </section>
      )}

      {/* ACTIVE QUESTION PHASE */}
      {phase === 'active' && currentQuestion && (
        <section className="bg-white border border-[#E5DCCB] rounded-xl p-6 sm:p-8 space-y-6">
          {/* Progress & Live Score */}
          <div className="space-y-2.5">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#5C5147] font-mono tabular-nums">
              <span>
                Question {currentIndex + 1} / {questions.length} · {currentQuestion.category}
              </span>
              <span>
                Score: <strong className="text-[#8B1E24]">{records.filter((r) => r.isCorrect).length}</strong> · Streak:{' '}
                <strong className="text-[#9A6E20]">{streak}</strong>
              </span>
            </div>
            <div className="w-full h-1.5 bg-[#EFE8DA] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#8B1E24] transition-all duration-200"
                style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question */}
          <div>
            {currentQuestion.kannadaHint && (
              <p className="font-kannada text-sm text-[#9A6E20] mb-1.5">
                {currentQuestion.kannadaHint}
              </p>
            )}
            <h2 className="font-serif text-xl sm:text-2xl font-semibold text-[#1F1916] leading-snug">
              {currentQuestion.question}
            </h2>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {currentQuestion.options.map((option, idx) => {
              const isAnswered = selectedOption !== null;
              const isSelected = selectedOption === idx;
              const isCorrectOption = idx === currentQuestion.correctIndex;

              let buttonStyle =
                'bg-[#FAF7F2] border-[#E5DCCB] text-[#1F1916] hover:border-[#B6862C] hover:bg-[#FCF8EE]';

              if (isAnswered) {
                if (isCorrectOption) {
                  buttonStyle = 'bg-[#ECF7F0] border-[#1F5E3B] text-[#133A24]';
                } else if (isSelected && !isCorrectOption) {
                  buttonStyle = 'bg-[#FDF2F2] border-[#8B1E24] text-[#681318]';
                } else {
                  buttonStyle = 'bg-[#FAF7F2] border-[#ECE4D6] text-[#7D7063] opacity-75';
                }
              }

              return (
                <button
                  key={option}
                  type="button"
                  disabled={isAnswered}
                  onClick={() => handleChooseOption(idx)}
                  className={`w-full text-left px-4 py-3.5 rounded-xl border text-sm font-medium transition-colors flex items-center justify-between gap-3 focus-visible:outline-2 focus-visible:outline-[#8B1E24] ${buttonStyle}`}
                >
                  <span>
                    <span className="font-mono text-xs text-[#7D7063] mr-3">
                      {String.fromCharCode(65 + idx)}.
                    </span>
                    {option}
                  </span>

                  {isAnswered && isCorrectOption && (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#1F5E3B] shrink-0">
                      <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                      Correct
                    </span>
                  )}
                  {isAnswered && isSelected && !isCorrectOption && (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#8B1E24] shrink-0">
                      <XCircle className="w-4 h-4" aria-hidden="true" />
                      Incorrect
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation & Next Action */}
          {selectedOption !== null && (
            <div className="pt-5 border-t border-[#EFE7D8] space-y-4">
              <div className="bg-[#FCF9F3] border border-[#E5DCCB] rounded-lg p-4 text-sm text-[#352C27] leading-relaxed">
                <strong className="text-[#681318] font-semibold">Cultural Note: </strong>
                {currentQuestion.explanation}
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleNext}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium bg-[#8B1E24] text-[#FBF7EE] rounded-lg hover:bg-[#681318] transition-colors"
                >
                  <span>
                    {currentIndex + 1 < questions.length ? 'Next Question' : 'View Results'}
                  </span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          )}
        </section>
      )}

      {/* SUMMARY PHASE */}
      {phase === 'summary' && summary && (
        <section className="bg-white border border-[#E5DCCB] rounded-xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#EFE7D8]">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-medium text-[#9A6E20]">
                <Award className="w-4 h-4" aria-hidden="true" />
                <span>Quiz Complete · {selectedCategory === 'All' ? 'All Topics' : selectedCategory}</span>
              </div>
              <h2 className="font-serif text-3xl font-semibold text-[#1F1916] mt-1">
                {summary.masteryTitle}
              </h2>
              <p className="font-kannada text-base text-[#8B1E24] mt-0.5">
                {summary.masteryKannada}
              </p>
              <p className="text-sm text-[#5C5147] mt-2 max-w-lg">{summary.feedback}</p>
            </div>

            <div className="bg-[#FCF8EE] border border-[#E5DCCB] rounded-xl px-6 py-4 text-center shrink-0">
              <p className="font-mono text-3xl font-semibold text-[#8B1E24] tabular-nums">
                {summary.accuracyPercent}%
              </p>
              <p className="font-mono text-xs text-[#5C5147] tabular-nums mt-1">
                {summary.correct} / {summary.total} Correct · Streak {summary.bestStreak}
              </p>
            </div>
          </div>

          {/* Review List */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-[#1F1916]">Question Review</h3>
            {questions.map((q, index) => {
              const rec = records[index];
              const isRight = rec?.isCorrect ?? false;
              return (
                <div
                  key={q.id}
                  className="p-4 rounded-lg border border-[#EFE7D8] bg-[#FAF7F2] text-sm"
                >
                  <div className="flex items-start justify-between gap-3">
                    <p className="font-medium text-[#1F1916]">
                      <span className="font-mono text-xs text-[#7D7063] mr-2">
                        {String(index + 1).padStart(2, '0')}.
                      </span>
                      {q.question}
                    </p>
                    <span
                      className={`text-xs font-semibold shrink-0 ${
                        isRight ? 'text-[#1F5E3B]' : 'text-[#8B1E24]'
                      }`}
                    >
                      {isRight ? 'Correct' : 'Missed'}
                    </span>
                  </div>
                  <p className="text-xs text-[#5C5147] mt-1.5">
                    Answer: <strong className="text-[#1F1916]">{q.options[q.correctIndex]}</strong> — {q.explanation}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="pt-4 border-t border-[#EFE7D8] flex flex-wrap items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setPhase('setup')}
              className="px-4 py-2 text-xs font-medium bg-white border border-[#DCD0BA] text-[#1F1916] rounded-lg hover:bg-[#EFE8DA]"
            >
              Change Topic
            </button>
            <button
              type="button"
              onClick={() => startQuiz(selectedCategory)}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium bg-[#8B1E24] text-[#FBF7EE] rounded-lg hover:bg-[#681318]"
            >
              <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Play Again</span>
            </button>
          </div>
        </section>
      )}
    </div>
  );
}
