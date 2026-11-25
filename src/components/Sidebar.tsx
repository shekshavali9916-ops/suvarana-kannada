import {
  MessageSquare,
  ScrollText,
  Compass,
  Award,
  Users,
  BookOpen,
  HelpCircle,
  X,
} from 'lucide-react';
import type { SectionId } from '../data/karnatakaData';

interface SidebarProps {
  activeSection: SectionId;
  onSelectSection: (section: SectionId) => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
  masteredPhraseCount: number;
  totalPhrases: number;
  bestQuizScore: number | null;
}

interface NavItem {
  id: SectionId;
  label: string;
  kannada: string;
  icon: typeof MessageSquare;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'chat', label: 'Ask Suvarna', kannada: 'ಸುವರ್ಣ ಸಂವಾದ', icon: MessageSquare },
  { id: 'heritage', label: 'History & Events', kannada: 'ಇತಿಹಾಸ ಮತ್ತು ಹಬ್ಬಗಳು', icon: ScrollText },
  { id: 'tourism', label: 'Tourism Spots', kannada: 'ಪ್ರವಾಸಿ ತಾಣಗಳು', icon: Compass },
  { id: 'jnanpith', label: 'Jnanpith Laureates', kannada: 'ಜ್ಞಾನಪೀಠ ಪ್ರಶಸ್ತಿ', icon: Award },
  { id: 'figures', label: 'Famous Figures', kannada: 'ಮಹನೀಯರು', icon: Users },
  { id: 'language', label: 'Learn Kannada', kannada: 'ಕನ್ನಡ ಕಲಿಕೆ', icon: BookOpen },
  { id: 'quiz', label: 'Cultural Quiz', kannada: 'ಸಾಂಸ್ಕೃತಿಕ ರಸಪ್ರಶ್ನೆ', icon: HelpCircle },
];

export function Sidebar({
  activeSection,
  onSelectSection,
  mobileOpen,
  onCloseMobile,
  masteredPhraseCount,
  totalPhrases,
  bestQuizScore,
}: SidebarProps) {
  const handleSelect = (id: SectionId) => {
    onSelectSection(id);
    onCloseMobile();
  };

  const navContent = (
    <div className="flex flex-col h-full bg-[#231113] text-[#F7F2E8]">
      {/* Brand Header */}
      <div className="px-6 pt-6 pb-5 border-b border-[#3D2024] flex items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2.5">
            <span
              className="w-8 h-8 rounded-md bg-gradient-to-br from-[#D4A43C] to-[#9E6F1D] text-[#231113] font-kannada font-bold text-base flex items-center justify-center shrink-0"
              aria-hidden="true"
            >
              ಕ
            </span>
            <span className="font-serif text-lg font-semibold tracking-tight text-[#FBF7EE] whitespace-nowrap">
              Suvarna Kannada
            </span>
          </div>
          <p className="font-kannada text-xs text-[#D4B888] mt-1.5 pl-[42px]">
            ಸುವರ್ಣ ಕನ್ನಡ ಪರಂಪರೆ
          </p>
        </div>

        <button
          type="button"
          onClick={onCloseMobile}
          aria-label="Close navigation menu"
          className="lg:hidden p-2 rounded-md text-[#DFC9A4] hover:text-white hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-[#D4A43C]"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Primary Navigation */}
      <nav aria-label="Cultural dashboard sections" className="flex-1 px-3 py-5 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleSelect(item.id)}
              aria-current={isActive ? 'page' : undefined}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-left transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-[#D4A43C] ${
                isActive
                  ? 'bg-[#8B1E24] text-[#FBF7EE] shadow-sm'
                  : 'text-[#DFD2C0] hover:bg-[#33191C] hover:text-[#FBF7EE]'
              }`}
            >
              <Icon
                className={`w-[18px] h-[18px] shrink-0 ${
                  isActive ? 'text-[#E8C468]' : 'text-[#B99E76]'
                }`}
                aria-hidden="true"
              />
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-medium leading-tight whitespace-nowrap truncate">
                  {item.label}
                </span>
                <span
                  className={`block font-kannada text-[11px] leading-tight mt-0.5 truncate ${
                    isActive ? 'text-[#F0D79A]' : 'text-[#9F8B78]'
                  }`}
                >
                  {item.kannada}
                </span>
              </span>
            </button>
          );
        })}
      </nav>

      {/* Quiet Progress Footer */}
      <div className="px-6 py-4 border-t border-[#3D2024] bg-[#1C0D0F]">
        <p className="text-[11px] font-medium text-[#C9A86A] tracking-wide">
          Learning Progress
        </p>
        <div className="mt-2.5 space-y-2 text-xs text-[#DFD2C0]">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[#B5A391]">Phrases Mastered</span>
            <span className="font-mono tabular-nums text-[#F4D992]">
              {masteredPhraseCount}/{totalPhrases}
            </span>
          </div>
          <div className="flex items-center justify-between gap-2">
            <span className="text-[#B5A391]">Best Quiz Score</span>
            <span className="font-mono tabular-nums text-[#F4D992]">
              {bestQuizScore !== null ? `${bestQuizScore}%` : 'Not taken'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Permanent Sidebar */}
      <aside className="hidden lg:block w-[264px] shrink-0 border-r border-[#3D2024] h-screen sticky top-0">
        {navContent}
      </aside>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <button
            type="button"
            aria-label="Dismiss navigation backdrop"
            onClick={onCloseMobile}
            className="fixed inset-0 bg-black/55"
          />
          <aside className="relative z-10 w-[280px] max-w-[85vw] h-full shadow-2xl">
            {navContent}
          </aside>
        </div>
      )}
    </>
  );
}
