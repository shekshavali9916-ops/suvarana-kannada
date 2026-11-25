/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { Menu } from 'lucide-react';
import { KANNADA_PHRASES, type SectionId } from './data/karnatakaData';
import { buildChatHistoryPayload, type ChatMessage } from './utils/karnatakaLogic';
import { Sidebar } from './components/Sidebar';
import { ChatWorkspace } from './components/ChatWorkspace';
import { HeritageEventsView } from './components/HeritageEventsView';
import { TourismView } from './components/TourismView';
import { JnanpithView } from './components/JnanpithView';
import { FiguresView } from './components/FiguresView';
import { LanguageStudioView } from './components/LanguageStudioView';
import { QuizView } from './components/QuizView';

const STORAGE_KEYS = {
  chat: 'suvarna_kannada_chat_v1',
  mastered: 'suvarna_kannada_mastered_v1',
  bestScore: 'suvarna_kannada_quiz_best_v1',
};

function formatTime(): string {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function loadJson<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export default function App() {
  const [activeSection, setActiveSection] = useState<SectionId>('chat');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [messages, setMessages] = useState<ChatMessage[]>(() =>
    loadJson<ChatMessage[]>(STORAGE_KEYS.chat, [])
  );
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [chatError, setChatError] = useState<string | null>(null);

  const [masteredPhraseIds, setMasteredPhraseIds] = useState<string[]>(() =>
    loadJson<string[]>(STORAGE_KEYS.mastered, [])
  );
  const [bestQuizScore, setBestQuizScore] = useState<number | null>(() =>
    loadJson<number | null>(STORAGE_KEYS.bestScore, null)
  );

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEYS.chat, JSON.stringify(messages.slice(-40)));
    } catch {
      // Ignore storage quota issues
    }
  }, [messages]);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEYS.mastered, JSON.stringify(masteredPhraseIds));
    } catch {
      // Ignore storage quota issues
    }
  }, [masteredPhraseIds]);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEYS.bestScore, JSON.stringify(bestQuizScore));
    } catch {
      // Ignore storage quota issues
    }
  }, [bestQuizScore]);

  const sendMessage = async (text: string) => {
    const cleaned = text.trim();
    if (!cleaned || isChatLoading) return;

    const historySnapshot = buildChatHistoryPayload(messages);
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: cleaned,
      timestamp: formatTime(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsChatLoading(true);
    setChatError(null);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: cleaned,
          history: historySnapshot,
        }),
      });

      const data = (await response.json().catch(() => ({}))) as {
        reply?: string;
        error?: string;
      };

      if (!response.ok || !data.reply) {
        setChatError(
          data.error ?? 'Suvarna could not respond right now. Please try again.'
        );
        return;
      }

      const modelMsg: ChatMessage = {
        id: `model-${Date.now()}`,
        role: 'model',
        text: data.reply,
        timestamp: formatTime(),
      };
      setMessages((prev) => [...prev, modelMsg]);
    } catch {
      setChatError(
        'Network connection error while reaching Suvarna. Please verify the server is running and try again.'
      );
    } finally {
      setIsChatLoading(false);
    }
  };

  const handleRetryLastMessage = async () => {
    if (isChatLoading || messages.length === 0) return;
    const lastMsg = messages[messages.length - 1];
    if (lastMsg.role !== 'user') return;

    const historySnapshot = buildChatHistoryPayload(messages.slice(0, -1));
    setIsChatLoading(true);
    setChatError(null);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: lastMsg.text,
          history: historySnapshot,
        }),
      });

      const data = (await response.json().catch(() => ({}))) as {
        reply?: string;
        error?: string;
      };

      if (!response.ok || !data.reply) {
        setChatError(
          data.error ?? 'Suvarna could not respond right now. Please try again.'
        );
        return;
      }

      const modelMsg: ChatMessage = {
        id: `model-${Date.now()}`,
        role: 'model',
        text: data.reply,
        timestamp: formatTime(),
      };
      setMessages((prev) => [...prev, modelMsg]);
    } catch {
      setChatError(
        'Network connection error while reaching Suvarna. Please verify the server is running and try again.'
      );
    } finally {
      setIsChatLoading(false);
    }
  };

  const handleAskSuvarnaFromArchive = (prompt: string) => {
    setActiveSection('chat');
    void sendMessage(prompt);
  };

  const handleClearChat = () => {
    setMessages([]);
    setChatError(null);
  };

  const handleToggleMastered = (phraseId: string) => {
    setMasteredPhraseIds((prev) =>
      prev.includes(phraseId)
        ? prev.filter((id) => id !== phraseId)
        : [...prev, phraseId]
    );
  };

  const handleCompleteQuiz = (accuracyPercent: number) => {
    setBestQuizScore((prev) =>
      prev === null ? accuracyPercent : Math.max(prev, accuracyPercent)
    );
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1F1916] flex flex-col lg:flex-row">
      {/* Compact Mobile Header (<= 64px, well within 15% mobile sticky cap) */}
      <header className="lg:hidden sticky top-0 z-30 h-16 px-4 bg-[#231113] text-[#FBF7EE] border-b border-[#3D2024] flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5 min-w-0">
          <span
            className="w-7 h-7 rounded bg-gradient-to-br from-[#D4A43C] to-[#9E6F1D] text-[#231113] font-kannada font-bold text-sm flex items-center justify-center shrink-0"
            aria-hidden="true"
          >
            ಕ
          </span>
          <span className="font-serif text-base font-semibold whitespace-nowrap truncate">
            Suvarna Kannada
          </span>
        </div>

        <button
          type="button"
          onClick={() => setMobileMenuOpen(true)}
          aria-label="Open navigation menu"
          className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-[#F4D992] border border-[#4C2A2E] rounded-lg hover:bg-[#33191C] whitespace-nowrap shrink-0"
        >
          <Menu className="w-4 h-4" aria-hidden="true" />
          <span>Menu</span>
        </button>
      </header>

      <Sidebar
        activeSection={activeSection}
        onSelectSection={setActiveSection}
        mobileOpen={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
        masteredPhraseCount={masteredPhraseIds.length}
        totalPhrases={KANNADA_PHRASES.length}
        bestQuizScore={bestQuizScore}
      />

      <main className="flex-1 min-w-0">
        {activeSection === 'chat' && (
          <ChatWorkspace
            messages={messages}
            isLoading={isChatLoading}
            errorMessage={chatError}
            onSendMessage={(text) => void sendMessage(text)}
            onRetryLast={() => void handleRetryLastMessage()}
            onClearChat={handleClearChat}
            onDismissError={() => setChatError(null)}
          />
        )}

        {activeSection === 'heritage' && (
          <HeritageEventsView onAskSuvarna={handleAskSuvarnaFromArchive} />
        )}

        {activeSection === 'tourism' && (
          <TourismView onAskSuvarna={handleAskSuvarnaFromArchive} />
        )}

        {activeSection === 'jnanpith' && (
          <JnanpithView onAskSuvarna={handleAskSuvarnaFromArchive} />
        )}

        {activeSection === 'figures' && (
          <FiguresView onAskSuvarna={handleAskSuvarnaFromArchive} />
        )}

        {activeSection === 'language' && (
          <LanguageStudioView
            masteredIds={masteredPhraseIds}
            onToggleMastered={handleToggleMastered}
            onAskSuvarna={handleAskSuvarnaFromArchive}
          />
        )}

        {activeSection === 'quiz' && (
          <QuizView
            bestScore={bestQuizScore}
            onCompleteQuiz={handleCompleteQuiz}
          />
        )}
      </main>
    </div>
  );
}
