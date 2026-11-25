import { useMemo, useState } from 'react';
import { MessageSquare, Search } from 'lucide-react';
import { FAMOUS_FIGURES } from '../data/karnatakaData';
import { filterItemsByQueryAndCategory } from '../utils/karnatakaLogic';

interface FiguresViewProps {
  onAskSuvarna: (prompt: string) => void;
}

const DOMAINS = [
  'All',
  'Rulers & Warriors',
  'Poets & Reformers',
  'Science & Statesmanship',
  'Arts & Music',
] as const;

export function FiguresView({ onAskSuvarna }: FiguresViewProps) {
  const [domain, setDomain] = useState<(typeof DOMAINS)[number]>('All');
  const [query, setQuery] = useState('');

  const filtered = useMemo(
    () =>
      filterItemsByQueryAndCategory(FAMOUS_FIGURES, query, domain, (fig) => [
        fig.name,
        fig.kannadaName,
        fig.origin,
        fig.summary,
        fig.legacy,
      ]),
    [domain, query]
  );

  return (
    <div className="max-w-[1160px] mx-auto px-6 sm:px-8 py-8 space-y-8">
      <header className="border-b border-[#E5DCCB] pb-6">
        <p className="text-xs font-medium text-[#8B1E24] tracking-wide">
          Luminaries of Karnataka · <span className="font-kannada">ನಾಡಿನ ಮಹನೀಯರು</span>
        </p>
        <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#1F1916] mt-2">
          Famous People &amp; Historical Figures
        </h1>
        <p className="text-[15px] text-[#5C5147] mt-2 max-w-2xl leading-relaxed">
          Monarchs, freedom fighters, mystic poets, classical music pioneers, and visionary engineers who shaped Karnataka’s identity.
        </p>

        <div className="mt-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div
            className="inline-flex flex-wrap items-center gap-1 p-1 bg-[#EFE8DA] rounded-lg self-start"
            role="tablist"
            aria-label="Filter famous figures by domain"
          >
            {DOMAINS.map((tab) => {
              const active = domain === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setDomain(tab)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#8B1E24] ${
                    active
                      ? 'bg-[#8B1E24] text-[#FBF7EE]'
                      : 'text-[#4F443B] hover:text-[#1F1916]'
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          <div className="relative w-full lg:w-64">
            <label htmlFor="figures-search" className="sr-only">
              Search famous figures from Karnataka
            </label>
            <Search
              className="w-4 h-4 text-[#7D7063] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
              aria-hidden="true"
            />
            <input
              id="figures-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search Basavanna, Chennamma..."
              className="w-full pl-10 pr-4 py-2 text-sm bg-white border border-[#DCD0BA] rounded-lg text-[#1F1916] placeholder:text-[#8A7D70] focus:outline-none focus:border-[#8B1E24]"
            />
          </div>
        </div>
      </header>

      {filtered.length === 0 ? (
        <div className="bg-white border border-[#E5DCCB] rounded-xl p-10 text-center">
          <p className="font-serif text-lg text-[#1F1916]">No matching figures found</p>
          <button
            type="button"
            onClick={() => {
              setQuery('');
              setDomain('All');
            }}
            className="mt-4 px-4 py-2 text-xs font-medium bg-[#8B1E24] text-[#FBF7EE] rounded-lg hover:bg-[#681318]"
          >
            Show All Figures
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((fig) => (
            <article
              key={fig.id}
              className="bg-white border border-[#E5DCCB] rounded-xl p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#6B5F54]">
                  <span className="font-medium text-[#8B1E24]">{fig.domain}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono tabular-nums">{fig.era}</span>
                  <span aria-hidden="true">·</span>
                  <span>{fig.origin}</span>
                </div>

                <h2 className="font-serif text-xl font-semibold text-[#1F1916] mt-2">
                  {fig.name}
                </h2>
                <p className="font-kannada text-sm text-[#9A6E20] mt-0.5">
                  {fig.kannadaName}
                </p>

                <p className="text-sm text-[#352C27] mt-3 leading-relaxed">
                  {fig.summary}
                </p>
                <p className="text-xs text-[#5C5147] mt-3 pt-3 border-t border-[#EFE7D8] leading-relaxed">
                  <strong className="text-[#1F1916] font-medium">Enduring Legacy:</strong> {fig.legacy}
                </p>
              </div>

              <div className="mt-5 flex justify-end">
                <button
                  type="button"
                  onClick={() => onAskSuvarna(fig.chatPrompt)}
                  aria-label={`Ask Suvarna about ${fig.name}`}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-[#681318] bg-[#F9F2E1] hover:bg-[#F1E2BE] rounded-lg transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#8B1E24]"
                >
                  <MessageSquare className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Ask Suvarna</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
