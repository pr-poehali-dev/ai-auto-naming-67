import { useState, useRef, useEffect } from "react";
import Icon from "@/components/ui/icon";

type Page = "home" | "chat";

interface Message {
  id: number;
  role: "user" | "ai";
  text: string;
}

const SUGGESTIONS = [
  "Что ты умеешь?",
  "Расскажи о себе",
  "Помоги с задачей",
  "Как начать?",
];

function getReply(_text: string): string {
  return "Я ИИ 67 — умный ассистент, готовый помочь с любым вопросом. Спрашивайте что угодно!";
}

export default function Index() {
  const [page, setPage] = useState<Page>("home");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (page === "chat") {
      setTimeout(() => inputRef.current?.focus(), 100);
      if (messages.length === 0) {
        setMessages([{ id: 1, role: "ai", text: "Привет! Я ИИ 67. Чем могу помочь?" }]);
      }
    }
  }, [page]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  function sendMessage(text?: string) {
    const msg = (text ?? input).trim();
    if (!msg) return;
    const userMsg: Message = { id: Date.now(), role: "user", text: msg };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const reply: Message = { id: Date.now() + 1, role: "ai", text: getReply(msg) };
      setMessages((prev) => [...prev, reply]);
    }, 1200 + Math.random() * 600);
  }

  return (
    <div className="min-h-screen mesh-bg flex flex-col relative overflow-hidden">
      {/* Decorative rings */}
      <div
        className="pointer-events-none absolute top-[-180px] right-[-180px] w-[520px] h-[520px] rounded-full rotate-slow opacity-20"
        style={{ border: "1px solid var(--gold)" }}
      />
      <div
        className="pointer-events-none absolute top-[-120px] right-[-120px] w-[380px] h-[380px] rounded-full opacity-10"
        style={{ border: "1px solid var(--gold)" }}
      />

      {/* NAV */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-5 border-b border-white/5">
        <button
          onClick={() => setPage("home")}
          className="flex items-center gap-2 group"
        >
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black"
            style={{ background: "var(--gold)", color: "#0a0a0a" }}
          >
            67
          </div>
          <span className="font-bold text-lg tracking-tight text-white/90 group-hover:text-white transition-colors">
            ИИ 67
          </span>
        </button>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setPage("home")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              page === "home"
                ? "bg-white/10 text-white"
                : "text-white/50 hover:text-white/80"
            }`}
          >
            Главная
          </button>
          <button
            onClick={() => setPage("chat")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              page === "chat"
                ? "bg-white/10 text-white"
                : "text-white/50 hover:text-white/80"
            }`}
          >
            Чат
          </button>
        </div>
      </nav>

      {page === "home" ? (
        <HomePage onStartChat={() => setPage("chat")} />
      ) : (
        <ChatPage
          messages={messages}
          input={input}
          isTyping={isTyping}
          bottomRef={bottomRef}
          inputRef={inputRef}
          onInput={setInput}
          onSend={sendMessage}
        />
      )}
    </div>
  );
}

function HomePage({ onStartChat }: { onStartChat: () => void }) {
  return (
    <main className="flex-1 flex flex-col items-center justify-center px-6 py-16 text-center">
      <div
        className="animate-fade-up animate-float mb-8"
        style={{ animationFillMode: "forwards" }}
      >
        <div
          className="w-24 h-24 rounded-3xl flex items-center justify-center mx-auto shadow-2xl animate-pulse-gold"
          style={{ background: "linear-gradient(135deg, #E8A83E, #C8882E)" }}
        >
          <span className="text-4xl font-black text-black select-none">67</span>
        </div>
      </div>

      <h1
        className="animate-fade-up delay-100 font-black text-5xl md:text-7xl leading-none tracking-tight mb-4"
        style={{ animationFillMode: "forwards" }}
      >
        <span className="text-white">ИИ </span>
        <span className="text-gold-gradient">67</span>
      </h1>

      <p
        className="animate-fade-up delay-200 max-w-md text-lg text-white/50 leading-relaxed mb-10"
        style={{
          animationFillMode: "forwards",
          fontFamily: "'Cormorant', serif",
          fontStyle: "italic",
        }}
      >
        Умный ассистент нового поколения. Задайте любой вопрос — получите ответ мгновенно.
      </p>

      <button
        onClick={onStartChat}
        className="animate-fade-up delay-300 group flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold text-base transition-all hover:scale-105 active:scale-95"
        style={{
          background: "var(--gold)",
          color: "#0a0a0a",
          animationFillMode: "forwards",
          boxShadow: "0 8px 32px var(--gold-glow)",
        }}
      >
        Начать чат
        <Icon name="ArrowRight" size={18} className="group-hover:translate-x-1 transition-transform" />
      </button>

      <div
        className="animate-fade-up delay-400 grid grid-cols-1 md:grid-cols-3 gap-4 mt-20 w-full max-w-3xl"
        style={{ animationFillMode: "forwards" }}
      >
        {[
          { icon: "Zap", title: "Мгновенные ответы", desc: "Без ожидания и задержек" },
          { icon: "Brain", title: "Умный анализ", desc: "Понимает контекст и нюансы" },
          { icon: "Shield", title: "Конфиденциально", desc: "Ваши данные под защитой" },
        ].map((f) => (
          <div
            key={f.title}
            className="noise relative rounded-2xl p-6 text-left border border-white/5 hover:border-white/10 transition-all hover:bg-white/5 group"
            style={{ background: "rgba(255,255,255,0.03)" }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-all group-hover:scale-110"
              style={{ background: "var(--gold-dim)" }}
            >
              <Icon name={f.icon} size={20} style={{ color: "var(--gold)" }} />
            </div>
            <div className="font-semibold text-white/90 mb-1 text-sm">{f.title}</div>
            <div className="text-white/40 text-xs leading-relaxed">{f.desc}</div>
          </div>
        ))}
      </div>
    </main>
  );
}

function ChatPage({
  messages,
  input,
  isTyping,
  bottomRef,
  inputRef,
  onInput,
  onSend,
}: {
  messages: Message[];
  input: string;
  isTyping: boolean;
  bottomRef: React.RefObject<HTMLDivElement>;
  inputRef: React.RefObject<HTMLInputElement>;
  onInput: (v: string) => void;
  onSend: (text?: string) => void;
}) {
  const hasUserMsg = messages.some((m) => m.role === "user");

  return (
    <div className="flex-1 flex flex-col max-w-2xl w-full mx-auto px-4 py-4 min-h-0">
      <div className="flex-1 overflow-y-auto chat-scroll space-y-4 pb-4">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex gap-3 animate-fade-up ${m.role === "user" ? "justify-end" : "justify-start"}`}
            style={{ animationFillMode: "forwards" }}
          >
            {m.role === "ai" && (
              <div
                className="w-8 h-8 rounded-xl flex-shrink-0 flex items-center justify-center text-xs font-black self-end"
                style={{ background: "linear-gradient(135deg, #E8A83E, #C8882E)", color: "#0a0a0a" }}
              >
                67
              </div>
            )}
            <div
              className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                m.role === "user"
                  ? "rounded-br-sm font-medium text-black"
                  : "rounded-bl-sm text-white/85 border border-white/8"
              }`}
              style={
                m.role === "user"
                  ? { background: "var(--gold)" }
                  : { background: "rgba(255,255,255,0.05)" }
              }
            >
              {m.text}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-3 justify-start animate-fade-in">
            <div
              className="w-8 h-8 rounded-xl flex-shrink-0 flex items-center justify-center text-xs font-black self-end"
              style={{ background: "linear-gradient(135deg, #E8A83E, #C8882E)", color: "#0a0a0a" }}
            >
              67
            </div>
            <div
              className="px-4 py-3 rounded-2xl rounded-bl-sm border border-white/8 flex items-center gap-1.5"
              style={{ background: "rgba(255,255,255,0.05)" }}
            >
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="w-1.5 h-1.5 rounded-full"
                  style={{
                    background: "var(--gold)",
                    animation: `blink 1.2s ease-in-out ${i * 0.2}s infinite`,
                  }}
                />
              ))}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {!hasUserMsg && (
        <div className="flex flex-wrap gap-2 mb-3">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => onSend(s)}
              className="px-3 py-1.5 rounded-xl text-xs font-medium border border-white/10 text-white/50 hover:text-white/80 hover:border-white/20 transition-all"
              style={{ background: "rgba(255,255,255,0.04)" }}
            >
              {s}
            </button>
          ))}
        </div>
      )}

      <div
        className="flex gap-2 items-center rounded-2xl border border-white/10 px-4 py-3 transition-all focus-within:border-white/20"
        style={{ background: "rgba(255,255,255,0.05)" }}
      >
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => onInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && onSend()}
          placeholder="Напишите сообщение..."
          className="flex-1 bg-transparent outline-none text-sm text-white placeholder-white/25"
        />
        <button
          onClick={() => onSend()}
          disabled={!input.trim()}
          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all hover:scale-105 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed"
          style={{ background: "var(--gold)" }}
        >
          <Icon name="ArrowUp" size={16} style={{ color: "#0a0a0a" }} />
        </button>
      </div>
    </div>
  );
}