
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ThemeContext from "../context/ThemeContext";

const STORAGE_KEY = "anonmind_conversations";
const ACTIVE_KEY = "anonmind_active_conversation";
const WIDTH_KEY = "anonmind_sidebar_width";

const createConversation = () => ({
  id: crypto.randomUUID(),
  title: "New conversation",
  createdAt: new Date().toISOString(),
  messages: [
    {
      role: "assistant",
      text: "Hi, welcome to AnonMind. 🌿\n\nThis is a space where you can talk about what's on your mind at your own pace. What's been going on for you today?",
    },
  ],
});

const formatDate = (date) =>
  new Date(date).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

function AIChat() {
  const { theme, setTheme } = useContext(ThemeContext);
  const darkMode = theme === "dark";
  const navigate = useNavigate();

  const [conversations, setConversations] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [createConversation()];
    } catch {
      return [createConversation()];
    }
  });

  const [activeId, setActiveId] = useState(() => {
    try {
      return localStorage.getItem(ACTIVE_KEY);
    } catch {
      return null;
    }
  });

  const [sidebarWidth, setSidebarWidth] = useState(() => {
    try {
      const saved = Number(localStorage.getItem(WIDTH_KEY));
      return saved >= 220 && saved <= 420 ? saved : 256;
    } catch {
      return 256;
    }
  });

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [message, setMessage] = useState("");
  const [isComposerActive, setIsComposerActive] = useState(false);
  const [renamingId, setRenamingId] = useState(null);
  const [renameValue, setRenameValue] = useState("");

  const activeConversation =
    conversations.find((conversation) => conversation.id === activeId) ||
    conversations[0];

  const messages = activeConversation?.messages || [];

  useEffect(() => {
    if (!activeConversation) {
      const conversation = createConversation();
      setConversations([conversation]);
      setActiveId(conversation.id);
      return;
    }

    if (activeConversation.id !== activeId) {
      setActiveId(activeConversation.id);
    }
  }, [activeConversation, activeId]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(conversations));
  }, [conversations]);

  useEffect(() => {
    if (activeId) {
      localStorage.setItem(ACTIVE_KEY, activeId);
    }
  }, [activeId]);

  useEffect(() => {
    localStorage.setItem(WIDTH_KEY, String(sidebarWidth));
  }, [sidebarWidth]);

  useEffect(() => {
    if (!isResizing) return;

    const handleMouseMove = (event) => {
      setSidebarWidth(Math.min(420, Math.max(220, event.clientX)));
    };

    const handleMouseUp = () => setIsResizing(false);

    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing]);

  const updateConversation = (id, updater) => {
    setConversations((previous) =>
      previous.map((conversation) =>
        conversation.id === id ? updater(conversation) : conversation
      )
    );
  };

  const handleNewConversation = () => {
    const conversation = createConversation();

    setConversations((previous) => [conversation, ...previous]);
    setActiveId(conversation.id);
    setMessage("");
    setIsComposerActive(false);
  };

  const handleSend = (event) => {
    event.preventDefault();

    const trimmedMessage = message.trim();
    if (!trimmedMessage || !activeConversation) return;

    updateConversation(activeConversation.id, (conversation) => {
      const isFirstUserMessage = !conversation.messages.some(
        (item) => item.role === "user"
      );

      return {
        ...conversation,
        title: isFirstUserMessage
          ? trimmedMessage.slice(0, 45) +
            (trimmedMessage.length > 45 ? "…" : "")
          : conversation.title,
        messages: [
          ...conversation.messages,
          { role: "user", text: trimmedMessage },
        ],
      };
    });

    setMessage("");
    setIsComposerActive(false);
  };

  const handleRename = (id) => {
    const title = renameValue.trim();

    if (title) {
      updateConversation(id, (conversation) => ({
        ...conversation,
        title,
      }));
    }

    setRenamingId(null);
    setRenameValue("");
  };

  const handleDeleteConversation = (id) => {
    const remaining = conversations.filter(
      (conversation) => conversation.id !== id
    );

    if (remaining.length === 0) {
      const fresh = createConversation();
      setConversations([fresh]);
      setActiveId(fresh.id);
    } else {
      setConversations(remaining);

      if (activeId === id) {
        setActiveId(remaining[0].id);
      }
    }
  };

  return (
    <div
      className={`relative isolate min-h-screen overflow-hidden ${
        darkMode
          ? "bg-[#101211] text-slate-100"
          : "bg-[#f5faf6] text-slate-900"
      }`}
    >
      {/* Green glow rises once and stays in place */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 z-0 overflow-hidden ${
          darkMode ? "opacity-100" : "opacity-60"
        }`}
      >
        <div
          className={`absolute -inset-x-[20%] bottom-[-35%] h-[90%] rounded-[50%] blur-[90px] ${
            darkMode ? "animate-green-flow" : ""
          }`}
          style={{
            background: darkMode
              ? "radial-gradient(ellipse at 50% 100%, rgba(34,197,94,0.42) 0%, rgba(16,185,129,0.22) 30%, rgba(5,150,105,0.08) 55%, transparent 75%)"
              : "radial-gradient(ellipse at 50% 100%, rgba(34,197,94,0.24) 0%, rgba(16,185,129,0.12) 35%, transparent 75%)",
          }}
        />
      </div>

      <div className="relative z-10 flex min-h-screen">
        {/* Sidebar */}
        {!sidebarCollapsed && (
          <aside
            style={{ width: sidebarWidth, minWidth: sidebarWidth }}
            className={`relative hidden h-screen min-h-0 shrink-0 flex-col overflow-hidden border-r backdrop-blur-sm md:flex ${
              darkMode
                ? "border-slate-700/40 bg-[#101211]/35"
                : "border-slate-200/50 bg-white/30"
            }`}
          >
            <div className="flex items-center justify-between gap-2 p-5">
              <h1 className="whitespace-nowrap text-2xl font-bold tracking-tight">
                <span className="text-teal-500">Anon</span>Mind
              </h1>

              <button
                onClick={() => setSidebarCollapsed(true)}
                aria-label="Collapse sidebar"
                className="rounded-lg px-2 py-1 opacity-70 hover:bg-teal-500/10 hover:opacity-100"
              >
                ‹
              </button>
            </div>

            <p className="px-5 text-sm opacity-60">
              Your space to feel heard.
            </p>

            <div className="px-4">
              <button
                onClick={handleNewConversation}
                className="mt-6 w-full rounded-xl bg-teal-600 px-4 py-3 text-left text-sm font-medium text-white transition hover:bg-teal-700"
              >
                + New conversation
              </button>
            </div>

            <div className="mt-7 min-h-0 flex-1 overflow-x-hidden overflow-y-auto px-3 pb-5">
              <p className="mb-3 px-2 text-xs font-semibold uppercase tracking-wider opacity-50">
                Conversation history
              </p>

              <div className="space-y-2">
                {conversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    className={`group rounded-xl p-3 transition ${
                      conversation.id === activeId
                        ? darkMode
                          ? "bg-slate-800/80"
                          : "bg-emerald-50/90"
                        : "hover:bg-teal-500/10"
                    }`}
                  >
                    {renamingId === conversation.id ? (
                      <form
                        onSubmit={(event) => {
                          event.preventDefault();
                          handleRename(conversation.id);
                        }}
                      >
                        <input
                          autoFocus
                          value={renameValue}
                          onChange={(event) =>
                            setRenameValue(event.target.value)
                          }
                          onBlur={() => handleRename(conversation.id)}
                          className="w-full rounded border border-emerald-500 bg-transparent px-2 py-1 text-sm outline-none"
                        />
                      </form>
                    ) : (
                      <button
                        onClick={() => {
                          setActiveId(conversation.id);
                          setMessage("");
                        }}
                        className="w-full text-left"
                      >
                        <p
                          className={`break-words text-sm font-medium ${
                            !conversation.messages.some(
                              (item) => item.role === "user"
                            )
                              ? "opacity-70"
                              : ""
                          }`}
                        >
                          {conversation.title}
                        </p>

                        <p className="mt-1 text-xs opacity-55">
                          {formatDate(conversation.createdAt)}
                        </p>
                      </button>
                    )}

                    <div className="mt-2 flex gap-3 text-xs opacity-0 transition group-hover:opacity-100 focus-within:opacity-100">
                      <button
                        onClick={() => {
                          setRenamingId(conversation.id);
                          setRenameValue(conversation.title);
                        }}
                        className="text-emerald-500 hover:underline"
                      >
                        Rename
                      </button>

                      <button
                        onClick={() =>
                          handleDeleteConversation(conversation.id)
                        }
                        className="text-red-400 hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-1 border-t border-slate-500/10 p-4">
              <button
                onClick={() => navigate("/find-doctor")}
                className="w-full rounded-lg px-3 py-2.5 text-left text-sm transition hover:bg-teal-500/10"
              >
                🩺 Find a doctor
              </button>

              <button
                onClick={() => navigate("/patient/dashboard")}
                className="w-full rounded-lg px-3 py-2.5 text-left text-sm transition hover:bg-teal-500/10"
              >
                ◫ My dashboard
              </button>

              <div className="mt-3 rounded-xl border border-teal-500/20 bg-teal-500/5 p-3">
                <p className="text-sm font-semibold">You are in control.</p>
                <p className="mt-1 text-xs leading-5 opacity-70">
                  Explore professional support whenever you feel ready.
                </p>
              </div>
            </div>

            {/* Drag handle */}
            <div
              role="separator"
              aria-label="Resize sidebar"
              aria-orientation="vertical"
              onMouseDown={(event) => {
                event.preventDefault();
                setIsResizing(true);
              }}
              className={`absolute right-0 top-0 z-30 hidden h-full w-1.5 cursor-col-resize transition-colors hover:bg-emerald-500/60 md:block ${
                isResizing ? "bg-emerald-500/80" : "bg-transparent"
              }`}
            />
          </aside>
        )}

        {/* Expand sidebar */}
        {sidebarCollapsed && (
          <button
            onClick={() => setSidebarCollapsed(false)}
            aria-label="Expand sidebar"
            className="absolute left-3 top-4 z-30 hidden rounded-lg border border-teal-500/30 bg-slate-900/80 px-3 py-2 text-lg text-teal-400 shadow-lg md:block"
          >
            ›
          </button>
        )}

        {/* Main chat */}
        <main className="flex min-w-0 flex-1 flex-col">
          <header
            className={`flex items-center justify-between border-b px-5 py-4 md:px-8 ${
              darkMode
                ? "border-slate-800/50 bg-[#101211]/35"
                : "border-slate-200/50 bg-white/30"
            }`}
          >
            <div className="min-w-0">
              <h2 className="truncate font-semibold">
                {activeConversation?.title || "AI Companion"}
              </h2>
              <p className="mt-1 text-xs opacity-60">
                {activeConversation
                  ? `Started ${formatDate(activeConversation.createdAt)}`
                  : "A space to reflect, at your own pace"}
              </p>
            </div>

            <div className="ml-3 flex shrink-0 items-center gap-3">
              <button
                onClick={() =>
                  setTheme(theme === "light" ? "dark" : "light")
                }
                aria-label={
                  theme === "light"
                    ? "Switch to dark mode"
                    : "Switch to light mode"
                }
                className={`rounded-lg border px-3 py-2 text-sm transition ${
                  darkMode
                    ? "border-slate-700 hover:bg-slate-800"
                    : "border-slate-200 hover:bg-slate-100"
                }`}
              >
                {theme === "light" ? "🌙" : "☀️"}
              </button>

              <button
                onClick={() => navigate("/find-doctor")}
                className="rounded-lg border border-emerald-500/40 px-3 py-2 text-sm font-medium text-emerald-500 transition hover:bg-emerald-500/10"
              >
                Find a doctor
              </button>
            </div>
          </header>

          {/* Messages */}
          <section className="flex flex-1 flex-col overflow-y-auto px-4 py-8 md:px-10">
            <div className="mx-auto w-full max-w-3xl">
              <div className="mb-8 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-500/10 text-2xl">
                  🌿
                </div>

                <h3 className="mt-4 text-xl font-semibold">
                  A moment for yourself
                </h3>

                <p className="mt-2 text-sm opacity-60">
                  Take your time. You don't have to figure everything out at
                  once.
                </p>
              </div>

              <div className="space-y-5">
                {messages.map((item, index) => (
                  <div
                    key={`${activeId}-${index}`}
                    className={`flex ${
                      item.role === "user"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    {item.role === "assistant" && (
                      <div className="mr-3 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-teal-500/10">
                        🌿
                      </div>
                    )}

                    <div
                      className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-7 md:max-w-[75%] ${
                        item.role === "user"
                          ? "rounded-br-sm bg-teal-600 text-white"
                          : darkMode
                            ? "rounded-bl-sm border border-slate-800/60 bg-slate-900/70 text-slate-200"
                            : "rounded-bl-sm border border-slate-200/80 bg-white/75 text-slate-700"
                      }`}
                    >
                      {item.text}
                    </div>
                  </div>
                ))}
              </div>

              {messages.some((item) => item.role === "user") && (
                <p className="mt-6 text-center text-xs opacity-50">
                  Your messages are saved in this browser. AI responses are
                  not connected yet.
                </p>
              )}
            </div>
          </section>

          {/* Animated message composer */}
          <div className="px-4 py-5 md:px-8">
            <form
              onSubmit={handleSend}
              className={`mx-auto w-full max-w-3xl transition-all duration-500 ease-out ${
                isComposerActive
                  ? "scale-[1.015] -translate-y-1"
                  : "scale-100 translate-y-0"
              }`}
            >
              <div
                className={`flex items-end gap-3 rounded-2xl border p-2 transition-all duration-500 ease-out ${
                  darkMode
                    ? "border-slate-700 bg-slate-900/90 focus-within:border-emerald-500/70 focus-within:shadow-[0_0_35px_rgba(34,197,94,0.14)]"
                    : "border-slate-200 bg-white/90 focus-within:border-emerald-500/70 focus-within:shadow-[0_0_30px_rgba(34,197,94,0.12)]"
                } ${
                  isComposerActive
                    ? "min-h-[100px] shadow-xl"
                    : "min-h-[58px] shadow-sm"
                }`}
              >
                <textarea
                  value={message}
                  onFocus={() => setIsComposerActive(true)}
                  onBlur={() => {
                    if (!message.trim()) setIsComposerActive(false);
                  }}
                  onChange={(event) => setMessage(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" && !event.shiftKey) {
                      event.preventDefault();
                      handleSend(event);
                    }
                  }}
                  rows={isComposerActive ? 3 : 1}
                  placeholder="Share what's on your mind..."
                  aria-label="Write your message"
                  className="min-h-10 max-h-36 flex-1 resize-none bg-transparent px-3 py-2 text-sm leading-6 outline-none placeholder:opacity-50"
                />

                <button
                  type="submit"
                  disabled={!message.trim()}
                  className="shrink-0 rounded-xl bg-teal-600 px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Send
                </button>
              </div>
            </form>

            <p className="mx-auto mt-3 max-w-3xl text-center text-xs opacity-50">
              This is a UI prototype, not a live AI conversation. Conversation
              history is stored locally in this browser.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AIChat;
