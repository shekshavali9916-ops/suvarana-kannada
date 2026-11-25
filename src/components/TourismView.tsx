import { useMemo, useState } from 'react';
import { MessageSquare, MapPin } from 'lucide-react';
import { TOURISM_SPOTS } from '../data/karnatakaData';
import { filterItemsByQueryAndCategory } from '../utils/karnatakaLogic';
import { EditorialImage } from './EditorialImage';

interface TourismViewProps {
  onAskSuvarna: (prompt: string) => void;
}

const REGIONS = [
  'All',
  'Heritage & UNESCO',
  'Hill Stations & Nature',
  'Coastal & Temples',
] as const;

export function TourismView({ onAskSuvarna }: TourismViewProps) {
  const [regionFilter, setRegionFilter] = useState<(typeof REGIONS)[number]>('All');

  const filteredSpots = useMemo(
    () =>
      filterItemsByQueryAndCategory(TOURISM_SPOTS, '', regionFilter, (spot) => [
        spot.name,
        spot.district,
        spot.summary,
      ]),
    [regionFilter]
  );

  return (
    <div className="max-w-[1160px] mx-auto px-6 sm:px-8 py-8 space-y-8">
      <header className="border-b border-[#E5DCCB] pb-6">
        <p className="text-xs font-medium text-[#8B1E24] tracking-wide">
          One State, Many Worlds · <span className="font-kannada">ಕರ್ನಾಟಕ ಪ್ರವಾಸೋದ್ಯಮ</span>
        </p>
        <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#1F1916] mt-2">
          Karnataka Tourism Spots
        </h1>
        <p className="text-[15px] text-[#5C5147] mt-2 max-w-2xl leading-relaxed">
          From granite-carved UNESCO capitals and royal palaces to misty Western Ghats coffee highlands and Arabian Sea temple towns.
        </p>

        <div
          className="mt-6 inline-flex flex-wrap items-center gap-1 p-1 bg-[#EFE8DA] rounded-lg"
          role="tablist"
          aria-label="Filter tourism destinations by theme"
        >
          {REGIONS.map((tab) => {
            const active = regionFilter === tab;
            return (
              <button
                key={tab}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setRegionFilter(tab)}
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
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredSpots.map((spot) => (
          <article
            key={spot.id}
            className="bg-white border border-[#E5DCCB] rounded-xl overflow-hidden flex flex-col justify-between"
          >
            <div>
              <EditorialImage
                src={spot.image}
                alt={`${spot.name}, ${spot.district} district, Karnataka`}
                kannadaLabel={spot.kannadaName}
                caption={spot.unescoOrTag}
                aspectClass="aspect-[4/3]"
              />

              <div className="p-6">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#6B5F54]">
                  <span className="font-medium text-[#8B1E24]">{spot.unescoOrTag}</span>
                  <span aria-hidden="true">·</span>
                  <span>Best: {spot.bestSeason}</span>
                </div>

                <div className="mt-2 flex items-baseline justify-between gap-3">
                  <h2 className="font-serif text-xl font-semibold text-[#1F1916]">
                    {spot.name}
                  </h2>
                  <span className="font-kannada text-sm text-[#9A6E20] shrink-0">
                    {spot.kannadaName}
                  </span>
                </div>

                <p className="inline-flex items-center gap-1.5 text-xs text-[#6B5F54] mt-1">
                  <MapPin className="w-3.5 h-3.5 text-[#B6862C]" aria-hidden="true" />
                  <span>{spot.district} District</span>
                </p>

                <p className="text-sm text-[#4A3F38] mt-3 leading-relaxed">
                  {spot.summary}
                </p>

                <div className="mt-4 pt-3.5 border-t border-[#EFE7D8]">
                  <p className="text-[11px] font-semibold text-[#6B5F54] mb-2">
                    Key Highlights
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-xs text-[#3A302A] list-disc pl-4 marker:text-[#B6862C]">
                    {spot.highlights.map((hl) => (
                      <li key={hl}>{hl}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 bg-[#FCF9F3] border-t border-[#EFE7D8] flex items-center justify-between gap-3">
              <span className="text-xs text-[#6B5F54]">{spot.category}</span>
              <button
                type="button"
                onClick={() => onAskSuvarna(spot.chatPrompt)}
                aria-label={`Ask Suvarna for a travel itinerary to ${spot.name}`}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-[#FBF7EE] bg-[#8B1E24] hover:bg-[#681318] rounded-lg transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#B6862C]"
              >
                <MessageSquare className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Plan with Suvarna</span>
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
