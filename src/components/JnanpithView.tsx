import { MessageSquare } from 'lucide-react';
import { JNANPITH_LAUREATES } from '../data/karnatakaData';

interface JnanpithViewProps {
  onAskSuvarna: (prompt: string) => void;
}

export function JnanpithView({ onAskSuvarna }: JnanpithViewProps) {
  return (
    <div className="max-w-[1160px] mx-auto px-6 sm:px-8 py-8 space-y-8">
      <header className="border-b border-[#E5DCCB] pb-6">
        <p className="text-xs font-medium text-[#8B1E24] tracking-wide">
          Literary Crown of India · <span className="font-kannada">ಜ್ಞಾನಪೀಠ ಪ್ರಶಸ್ತಿ ಪುರಸ್ಕೃತರು</span>
        </p>
        <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#1F1916] mt-2">
          Kannada Jnanpith Prashasti Laureates
        </h1>
        <p className="text-[15px] text-[#5C5147] mt-2 max-w-3xl leading-relaxed">
          Kannada stands among India’s richest literary traditions, honored with eight Jnanpith Awards between 1967 and 2010 across epic poetry, lyric verse, social realism, modernist fiction, and theatre.
        </p>

        {/* Quiet Archival Summary Strip */}
        <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-[#5C5147] font-mono tabular-nums">
          <span>
            Total Laureates: <strong className="text-[#8B1E24]">08</strong>
          </span>
          <span aria-hidden="true">·</span>
          <span>
            Span: <strong className="text-[#1F1916]">1967 – 2010</strong>
          </span>
          <span aria-hidden="true">·</span>
          <span>
            First Honoree: <strong className="text-[#1F1916]">Kuvempu (1967)</strong>
          </span>
        </div>
      </header>

      {/* Chronological Catalogue */}
      <div className="space-y-5">
        {JNANPITH_LAUREATES.map((laureate) => (
          <article
            key={laureate.id}
            className="bg-white border border-[#E5DCCB] rounded-xl p-6 sm:p-7"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Index & Year Column */}
              <div className="lg:col-span-3 flex lg:flex-col items-baseline lg:items-start justify-between gap-2 pb-4 lg:pb-0 border-b lg:border-b-0 lg:border-r border-[#EFE7D8] lg:pr-6">
                <div>
                  <span className="font-mono text-xs text-[#9A6E20] tabular-nums">
                    Laureate {laureate.order}
                  </span>
                  <p className="font-serif text-3xl font-semibold text-[#8B1E24] tabular-nums mt-0.5">
                    {laureate.year}
                  </p>
                </div>
                <div className="text-right lg:text-left lg:mt-4">
                  <p className="text-xs text-[#6B5F54] font-mono tabular-nums">
                    {laureate.lifespan}
                  </p>
                  <p className="text-xs text-[#5C5147] mt-1">
                    {laureate.movement}
                  </p>
                </div>
              </div>

              {/* Main Biographical & Works Column */}
              <div className="lg:col-span-9 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div>
                    <h2 className="font-serif text-2xl font-semibold text-[#1F1916]">
                      {laureate.name}
                    </h2>
                    <p className="font-kannada text-base text-[#9A6E20] mt-0.5">
                      {laureate.kannadaName}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => onAskSuvarna(laureate.chatPrompt)}
                    aria-label={`Ask Suvarna about ${laureate.name}`}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-[#681318] bg-[#F9F2E1] hover:bg-[#F1E2BE] rounded-lg transition-colors whitespace-nowrap shrink-0 self-start focus-visible:outline-2 focus-visible:outline-[#8B1E24]"
                  >
                    <MessageSquare className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Discuss with Suvarna</span>
                  </button>
                </div>

                {/* Notable Work Definition Row */}
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-3 border-y border-[#EFE7D8] text-sm">
                  <div>
                    <dt className="text-[11px] font-medium text-[#6B5F54]">
                      Celebrated Work
                    </dt>
                    <dd className="font-medium text-[#1F1916] mt-0.5">
                      {laureate.notableWork}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[11px] font-medium text-[#6B5F54]">
                      Kannada Title
                    </dt>
                    <dd className="font-kannada text-[#681318] mt-0.5">
                      {laureate.kannadaWork}
                    </dd>
                  </div>
                </dl>

                <p className="text-[15px] text-[#352C27] leading-relaxed max-w-prose">
                  {laureate.bio}
                </p>

                <blockquote className="pt-2 text-sm font-serif italic text-[#5C5147]">
                  “{laureate.quote}”
                </blockquote>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
