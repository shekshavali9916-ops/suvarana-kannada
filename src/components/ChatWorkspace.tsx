import { useEffect, useRef, useState } from 'react';
import { Send, RotateCcw, AlertCircle, ArrowUpRight, Loader2 } from 'lucide-react';
import { CHAT_STARTER_PROMPTS, HERO_IMAGES } from '../data/karnatakaData';
import {
  type ChatMessage,
  parseFormattedResponse,
  validateChatInput,
} from '../utils/karnatakaLogic';
import { EditorialImage } from './EditorialImage';

interface ChatWorkspaceProps {
  messages: ChatMessage[];
  isLoading: boolean;
  errorMessage: string | null;
  onSendMessage: (text: string) => void;
  onRetryLast?: () => void;
  onClearChat: () => void;
  onDismissError: () => void;
}

function renderInlineEmphasis(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
      return (
        <strong key={index} className="font-semibold text-[#1F1916]">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <span key={index}>{part}</span>;
  });
}

function FormattedMessageBody({ text, isUser }: { text: string; isUser: boolean }) {
  if (isUser) {
    return <p className="text-[15px] leading-relaxed whitespace-pre-wrap">{text}</p>;
  }

  const blocks = parseFormattedResponse(text);
  return (
    <div className="space-y-3 text-[15px] leading-relaxed text-[#2A221E]">
      {blocks.map((block, idx) => {
        if (block.type === 'heading') {
          return (
            <h4 key={idx} className="font-serif text-base font-semibold text-[#681318] pt-1">
              {renderInlineEmphasis(block.content)}
            </h4>
          );
        }
        if (block.type === 'list' && block.items) {
          return (
            <ul key={idx} className="space-y-1.5 pl-4 list-disc marker:text-[#B6862C]">
              {block.items.map((item, itemIdx) => (
                <li key={itemIdx} className="pl-1">
                  {renderInlineEmphasis(item)}
                </li>
              ))}
            </ul>
          );
        }
        return <p key={idx}>{renderInlineEmphasis(block.content)}</p>;
      })}
    </div>
  );
}

export function ChatWorkspace({
  messages,
  isLoading,
  errorMessage,
  onSendMessage,
  onRetryLast,
  onClearChat,
  onDismissError,
}: ChatWorkspaceProps) {
  const [draft, setDraft] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);
  const threadEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    threadEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const check = validateChatInput(draft);
    if (!check.valid) {
      setValidationError(check.error ?? 'Please enter a valid question.');
      return;
    }
    setValidationError(null);
    setDraft('');
    onSendMessage(check.cleaned);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!isLoading) {
        handleSubmit(e);
      }
    }
  };

  const hasConversation = messages.length > 0;

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] lg:h-screen max-w-[1120px] mx-auto w-full">
      {/* Top Contextual Header */}
      <header className="px-6 sm:px-8 py-4 border-b border-[#E5DCCB] bg-[#FAF7F2] flex items-center justify-between gap-4 shrink-0">
        <div className="min-w-0">
          <h1 className="font-serif text-xl sm:text-2xl font-semibold text-[#1F1916] leading-tight">
            Ask Suvarna
          </h1>
          <p className="text-xs sm:text-sm text-[#5C5147] mt-0.5 truncate">
            Dedicated Karnataka heritage, literature, tourism &amp; Kannada language guide
          </p>
        </div>
        {hasConversation && (
          <button
            type="button"
            onClick={onClearChat}
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-[#681318] bg-white border border-[#E5DCCB] rounded-lg hover:bg-[#F9F2E1] hover:border-[#D4A43C] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#8B1E24]"
          >
            <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
            New Chat
          </button>
        )}
      </header>

      {/* Scrollable Thread or Welcome Masthead */}
      <div
        className="flex-1 overflow-y-auto px-6 sm:px-8 py-6"
        data-testid="chat-thread"
      >
        {!hasConversation ? (
          <div className="space-y-8 pb-4">
            {/* Editorial Welcome Focal Banner */}
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch bg-white border border-[#E5DCCB] rounded-xl overflow-hidden">
              <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <p className="text-xs font-medium text-[#8B1E24] tracking-wide">
                    Karnataka Cultural Companion · <span className="font-kannada">ನಮಸ್ಕಾರ</span>
                  </p>
                  <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#1F1916] mt-2 leading-snug">
                    Explore the living history, language, and art of Karnataka
                  </h2>
                  <p className="text-[15px] text-[#5C5147] mt-3 leading-relaxed max-w-prose">
                    Ask exclusively about Karnataka’s dynasties, Mysuru Dasara and Yakshagana, UNESCO heritage sites, all eight Jnanpith laureates, iconic historical figures, or everyday Kannada conversation.
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#EFE7D8] flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#6B5F54]">
                  <span>8 Jnanpith Laureates</span>
                  <span aria-hidden="true">·</span>
                  <span>2,000+ Years of Kannada</span>
                  <span aria-hidden="true">·</span>
                  <span>Bilingual Script Support</span>
                </div>
              </div>

              <div className="lg:col-span-5 relative min-h-[220px]">
                <EditorialImage
                  src={HERO_IMAGES.hampi}
                  alt="Stone Chariot at Vittala Temple in Hampi during golden hour"
                  kannadaLabel="ವಿಜಯನಗರ ಹಂಪಿ"
                  aspectClass="h-full min-h-[220px] lg:aspect-auto"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/35 to-transparent px-4 py-3">
                  <p className="text-xs text-[#FBF7EE] font-medium">
                    Vittala Temple Stone Chariot · Hampi
                  </p>
                </div>
              </div>
            </section>

            {/* Curated Starter Prompts */}
            <section aria-labelledby="starter-prompts-heading">
              <div className="flex items-baseline justify-between mb-3.5">
                <h3
                  id="starter-prompts-heading"
                  className="font-serif text-lg font-semibold text-[#1F1916]"
                >
                  Suggested Inquiries
                </h3>
                <span className="text-xs text-[#6B5F54]">Select a topic to begin</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {CHAT_STARTER_PROMPTS.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onSendMessage(item.prompt)}
                    disabled={isLoading}
                    className="group text-left p-4 bg-white border border-[#E5DCCB] rounded-xl hover:border-[#B6862C] hover:bg-[#FCF9F2] transition-colors duration-150 flex flex-col justify-between gap-3 focus-visible:outline-2 focus-visible:outline-[#8B1E24]"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-semibold text-[#8B1E24]">
                        {item.topic}
                      </span>
                      <ArrowUpRight
                        className="w-4 h-4 text-[#B6862C] opacity-75 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                        aria-hidden="true"
                      />
                    </div>
                    <p className="text-sm text-[#352C27] leading-snug">
                      {item.prompt}
                    </p>
                  </button>
                ))}
              </div>
            </section>
          </div>
        ) : (
          <div className="space-y-5 max-w-3xl mx-auto pb-4">
            {messages.map((msg) => {
              const isUser = msg.role === 'user';
              return (
                <article
                  key={msg.id}
                  data-testid={isUser ? 'chat-message-user' : 'chat-message-model'}
                  className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                >
                  <div className="flex items-center gap-2 text-xs text-[#6B5F54] mb-1.5 px-1">
                    <span className="font-medium text-[#4A3E36]">
                      {isUser ? 'You' : 'Suvarna · ಸುವರ್ಣ'}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono tabular-nums">{msg.timestamp}</span>
                  </div>

                  <div
                    className={`max-w-[92%] sm:max-w-[85%] rounded-xl px-5 py-4 ${
                      isUser
                        ? 'bg-[#8B1E24] text-[#FBF7EE]'
                        : 'bg-white border border-[#E5DCCB] text-[#1F1916]'
                    }`}
                  >
                    <FormattedMessageBody text={msg.text} isUser={isUser} />
                  </div>
                </article>
              );
            })}

            {isLoading && (
              <div
                className="flex flex-col items-start"
                role="status"
                aria-live="polite"
              >
                <span className="text-xs font-medium text-[#6B5F54] mb-1.5 px-1">
                  Suvarna · ಸುವರ್ಣ
                </span>
                <div className="bg-white border border-[#E5DCCB] rounded-xl px-5 py-4 flex items-center gap-3 text-sm text-[#5C5147]">
                  <Loader2 className="w-4 h-4 animate-spin text-[#B6862C]" aria-hidden="true" />
                  <span>Consulting Karnataka archives...</span>
                </div>
              </div>
            )}

            <div ref={threadEndRef} />
          </div>
        )}
      </div>

      {/* Inline Error Banner */}
      {(errorMessage || validationError) && (
        <div
          role="alert"
          className="mx-6 sm:mx-8 mb-3 px-4 py-3 rounded-lg bg-[#FDF2F2] border border-[#E5B8BB] text-[#681318] text-sm flex items-start justify-between gap-3"
        >
          <div className="flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 mt-0.5 shrink-0 text-[#8B1E24]" aria-hidden="true" />
            <span>{validationError ?? errorMessage}</span>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            {errorMessage && !validationError && onRetryLast && (
              <button
                type="button"
                onClick={onRetryLast}
                disabled={isLoading}
                className="text-xs font-semibold px-2.5 py-1 rounded bg-[#8B1E24] text-[#FBF7EE] hover:bg-[#681318] whitespace-nowrap"
              >
                Retry
              </button>
            )}
            <button
              type="button"
              onClick={() => {
                setValidationError(null);
                onDismissError();
              }}
              className="text-xs font-semibold underline hover:text-[#4A0D10] whitespace-nowrap shrink-0"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* Message Composer */}
      <div className="px-6 sm:px-8 py-4 border-t border-[#E5DCCB] bg-[#FAF7F2] shrink-0">
        <form
          onSubmit={handleSubmit}
          className="max-w-3xl mx-auto flex items-end gap-3 bg-white border border-[#DCD0BA] rounded-xl p-2 focus-within:border-[#8B1E24] focus-within:ring-2 focus-within:ring-[#8B1E24]/15 transition-shadow"
        >
          <label htmlFor="suvarna-chat-input" className="sr-only">
            Ask a question about Kannada or Karnataka
          </label>
          <textarea
            id="suvarna-chat-input"
            ref={inputRef}
            rows={1}
            value={draft}
            onChange={(e) => {
              setDraft(e.target.value);
              if (validationError) setValidationError(null);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Ask about Karnataka history, Dasara, Hampi, Jnanpith authors, or Kannada phrases..."
            className="flex-1 resize-none bg-transparent px-3 py-2 text-[15px] text-[#1F1916] placeholder:text-[#8A7D70] focus:outline-none max-h-32"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading}
            aria-label="Send message to Suvarna"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#8B1E24] text-[#FBF7EE] text-sm font-medium hover:bg-[#681318] disabled:opacity-50 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#B6862C]"
          >
            <Send className="w-4 h-4" aria-hidden="true" />
            <span>Send</span>
          </button>
        </form>
        <p className="max-w-3xl mx-auto mt-2 text-[11px] text-[#7A6D60] text-center">
          Suvarna responds exclusively to Kannada language and Karnataka heritage inquiries.
        </p>
      </div>
    </div>
  );
}
