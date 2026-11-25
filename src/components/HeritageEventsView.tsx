import { useMemo, useState } from 'react';
import { Search, MessageSquare, X } from 'lucide-react';
import { HERITAGE_AND_EVENTS, type HeritageItem } from '../data/karnatakaData';
import { filterItemsByQueryAndCategory } from '../utils/karnatakaLogic';
import { EditorialImage } from './EditorialImage';

interface HeritageEventsViewProps {
  onAskSuvarna: (prompt: string) => void;
}

const CATEGORIES = ['All', 'Dynasties & History', 'Cultural Events'] as const;

export function HeritageEventsView({ onAskSuvarna }: HeritageEventsViewProps) {
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>('All');
  const [query, setQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<HeritageItem | null>(null);

  const filteredItems = useMemo(
    () =>
      filterItemsByQueryAndCategory(HERITAGE_AND_EVENTS, query, category, (item) => [
        item.title,
        item.kannadaTitle,
        item.region,
        item.summary,
        item.details,
        item.eraOrSeason,
      ]),
    [category, query]
  );

  return (
    <div className="max-w-[1160px] mx-auto px-6 sm:px-8 py-8 space-y-8">
      {/* Header */}
      <header className="border-b border-[#E5DCCB] pb-6">
        <p className="text-xs font-medium text-[#8B1E24] tracking-wide">
          Chronicle &amp; Calendar · <span className="font-kannada">ಕರ್ನಾಟಕ ಇತಿಹಾಸ ಮತ್ತು ಸಾಂಸ್ಕೃತಿಕ ಹಬ್ಬಗಳು</span>
        </p>
        <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#1F1916] mt-2">
          History &amp; Famous Cultural Events
        </h1>
        <p className="text-[15px] text-[#5C5147] mt-2 max-w-2xl leading-relaxed">
          Trace sixteen centuries of Karnataka’s royal dynasties alongside the living festivals, folk theatre, and civic traditions celebrated across the state.
        </p>

        {/* Controls Bar */}
        <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div
            className="inline-flex items-center p-1 bg-[#EFE8DA] rounded-lg self-start"
            role="tablist"
            aria-label="Filter history and cultural events"
          >
            {CATEGORIES.map((tab) => {
              const active = category === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setCategory(tab)}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#8B1E24] ${
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

          <div className="relative w-full sm:w-72">
            <label htmlFor="heritage-search" className="sr-only">
              Search Karnataka history and cultural events
            </label>
            <Search
              className="w-4 h-4 text-[#7D7063] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
              aria-hidden="true"
            />
            <input
              id="heritage-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search dynasties, Dasara, Hampi..."
              className="w-full pl-10 pr-4 py-2 text-sm bg-white border border-[#DCD0BA] rounded-lg text-[#1F1916] placeholder:text-[#8A7D70] focus:outline-none focus:border-[#8B1E24]"
            />
          </div>
        </div>
      </header>

      {/* Results Count */}
      <div className="text-xs text-[#6B5F54] font-mono tabular-nums">
        Showing {filteredItems.length} of {HERITAGE_AND_EVENTS.length} archival entries
      </div>

      {/* Grid */}
      {filteredItems.length === 0 ? (
        <div className="bg-white border border-[#E5DCCB] rounded-xl p-10 text-center">
          <p className="font-serif text-lg text-[#1F1916]">No matching heritage entries found</p>
          <p className="text-sm text-[#5C5147] mt-1">
            Try clearing your search or switching back to all categories.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery('');
              setCategory('All');
            }}
            className="mt-4 px-4 py-2 text-xs font-medium bg-[#8B1E24] text-[#FBF7EE] rounded-lg hover:bg-[#681318] transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredItems.map((item) => (
            <article
              key={item.id}
              className="bg-white border border-[#E5DCCB] rounded-xl overflow-hidden flex flex-col justify-between"
            >
              {item.image && (
                <EditorialImage
                  src={item.image}
                  alt={item.title}
                  kannadaLabel={item.kannadaTitle}
                  aspectClass="aspect-[16/9]"
                />
              )}

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#6B5F54]">
                    <span className="font-medium text-[#8B1E24]">{item.category}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono tabular-nums">{item.eraOrSeason}</span>
                    <span aria-hidden="true">·</span>
                    <span>{item.region}</span>
                  </div>

                  <h2 className="font-serif text-xl font-semibold text-[#1F1916] mt-2">
                    {item.title}
                  </h2>
                  <p className="font-kannada text-sm text-[#9A6E20] mt-0.5">
                    {item.kannadaTitle}
                  </p>

                  <p className="text-sm text-[#4A3F38] mt-3 leading-relaxed">
                    {item.summary}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-[#EFE7D8] flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedItem(item)}
                    className="text-xs font-semibold text-[#1F1916] hover:text-[#8B1E24] underline underline-offset-4 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-[#8B1E24]"
                  >
                    Read Archive Note
                  </button>
                  <button
                    type="button"
                    onClick={() => onAskSuvarna(item.chatPrompt)}
                    aria-label={`Ask Suvarna about ${item.title}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#681318] bg-[#F9F2E1] hover:bg-[#F1E2BE] rounded-md transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#8B1E24]"
                  >
                    <MessageSquare className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Ask Suvarna</span>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Archive Detail Modal */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/55"
          role="dialog"
          aria-modal="true"
          aria-labelledby="heritage-detail-title"
        >
          <div className="bg-[#FAF7F2] border border-[#D9CCB4] rounded-xl max-w-2xl w-full max-h-[88vh] overflow-y-auto shadow-2xl">
            <div className="px-6 py-4 border-b border-[#E5DCCB] flex items-start justify-between gap-4 bg-white">
              <div>
                <p className="text-xs text-[#8B1E24] font-medium">
                  {selectedItem.category} · <span className="font-mono tabular-nums">{selectedItem.eraOrSeason}</span>
                </p>
                <h2
                  id="heritage-detail-title"
                  className="font-serif text-2xl font-semibold text-[#1F1916] mt-1"
                >
                  {selectedItem.title}
                </h2>
                <p className="font-kannada text-sm text-[#9A6E20] mt-0.5">
                  {selectedItem.kannadaTitle}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                aria-label="Close archive note"
                className="p-2 rounded-lg text-[#5C5147] hover:bg-[#EFE8DA] hover:text-[#1F1916]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              {selectedItem.image && (
                <EditorialImage
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  kannadaLabel={selectedItem.kannadaTitle}
                  aspectClass="aspect-[16/9] rounded-lg"
                />
              )}

              <p className="text-[15px] text-[#2A221E] leading-relaxed">
                {selectedItem.details}
              </p>

              <div className="pt-4 border-t border-[#E5DCCB]">
                <h3 className="text-xs font-semibold text-[#681318] uppercase tracking-wider mb-2.5">
                  Key Landmarks &amp; Highlights
                </h3>
                <ul className="space-y-1.5 text-sm text-[#3E342E] list-disc pl-5 marker:text-[#B6862C]">
                  {selectedItem.highlights.map((hl) => (
                    <li key={hl}>{hl}</li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-[#E5DCCB] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedItem(null)}
                  className="px-4 py-2 text-xs font-medium text-[#4A3F38] bg-white border border-[#DCD0BA] rounded-lg hover:bg-[#EFE8DA]"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const prompt = selectedItem.chatPrompt;
                    setSelectedItem(null);
                    onAskSuvarna(prompt);
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-[#FBF7EE] bg-[#8B1E24] rounded-lg hover:bg-[#681318]"
                >
                  <MessageSquare className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Explore Deeper with Suvarna</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
