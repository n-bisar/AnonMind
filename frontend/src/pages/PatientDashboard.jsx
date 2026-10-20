
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Activity,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Check,
  ChevronRight,
  Clock3,
  Compass,
  Heart,
  HeartHandshake,
  Leaf,
  LogOut,
  Menu,
  MessageCircle,
  Moon,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Sun,
  Wind,
  X,
} from "lucide-react";

import ThemeContext from "../context/ThemeContext";
import api from "../api/axios";

const navigation = [
  { label: "Dashboard", icon: Activity, route: "/patient/dashboard", available: true },
  { label: "AI Chat", icon: MessageCircle, route: "/ai-chat", available: true },
  { label: "Find a Doctor", icon: Stethoscope, route: null, available: false },
  { label: "Mindfulness", icon: Wind, route: null, available: false },
  { label: "Resources", icon: BookOpen, route: null, available: false },
];

function PatientDashboard() {
  const { theme, setTheme } = useContext(ThemeContext);
  const darkMode = theme === "dark";
  const navigate = useNavigate();

  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const fetchPatientProfile = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");

        if (!accessToken) {
          navigate("/login", { replace: true });
          return;
        }

        const response = await api.get("/api/patient/profile/", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!cancelled) {
          setPatient(response.data);
        }
      } catch {
        if (!cancelled) {
          setError("We couldn't load your profile. Please try again.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchPatientProfile();

    return () => {
      cancelled = true;
    };
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/login", { replace: true });
  };

  const goTo = (route) => {
    if (!route) return;
    setMobileMenuOpen(false);
    navigate(route);
  };

  const fullName = patient?.full_name?.trim() || "";
  const firstName = fullName ? fullName.split(/\s+/)[0] : "there";
  const currentHour = new Date().getHours();

const greeting =
  currentHour < 12
    ? "Good Morning,"
    : currentHour < 17
      ? "Good Afternoon,"
      : "Good Evening,";

const greetingIcon =
  currentHour < 12
    ? "☀️"
    : currentHour < 17
      ? "🌤️"
      : "🌙";
  const initials = fullName
    ? fullName
        .split(/\s+/)
        .slice(0, 2)
        .map((part) => part[0])
        .join("")
        .toUpperCase()
    : "P";

  const page = darkMode
    ? "bg-[#101a15] text-[#edf1e9]"
    : "bg-[#f7f6ef] text-[#293e30]";

  const muted = darkMode ? "text-[#a8b6a9]" : "text-[#7b8878]";
  const border = darkMode ? "border-[#34463a]" : "border-[#e5e4d8]";
  const surface = darkMode ? "bg-[#19271e]" : "bg-[#fffef8]";
  const activeNav = darkMode
    ? "bg-[#293d2d] text-[#e3edcf]"
    : "bg-[#e7edda] text-[#38553c]";

  const sidebar = (
    <div className="flex h-full flex-col">
      <button
        type="button"
        onClick={() => goTo("/patient/dashboard")}
        className="flex items-center gap-3 px-6 pb-9 pt-8 text-left"
        aria-label="Go to AnonMind dashboard"
      >
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#526e4b] text-white shadow-sm">
          <Leaf size={23} strokeWidth={1.8} />
        </div>
        <div>
          <p className="text-[23px] font-semibold tracking-[-0.06em]">
            Anon<span className="text-[#759367]">Mind</span>
          </p>
          <p className={`-mt-0.5 text-[10px] tracking-[0.13em] ${muted}`}>
            YOUR SPACE TO FEEL HEARD
          </p>
        </div>
      </button>

      <div className="px-6">
        <p className={`mb-3 text-[10px] font-semibold uppercase tracking-[0.19em] ${muted}`}>
          Workspace
        </p>

        <nav className="space-y-1" aria-label="Main navigation">
          {navigation.map(({ label, icon: Icon, route, available }) => {
            const selected = route === "/patient/dashboard";

            return (
              <button
                key={label}
                type="button"
                onClick={() => goTo(route)}
                disabled={!available}
                title={!available ? `${label} is not available yet` : label}
                aria-current={selected ? "page" : undefined}
                className={`flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-left text-[13px] transition ${
                  selected
                    ? `${activeNav} font-semibold`
                    : `${muted} hover:bg-black/[0.035] hover:text-[#526e4b] dark:hover:bg-white/[0.04]`
                } ${!available ? "cursor-not-allowed opacity-60" : ""}`}
              >
                <Icon size={18} strokeWidth={1.8} />
                <span className="flex-1">{label}</span>
                {!available && (
                  <span className="text-[9px] uppercase tracking-wide">
                    Soon
                  </span>
                )}
                {selected && <ChevronRight size={15} />}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="mt-8 px-6">
        <p className={`mb-3 text-[10px] font-semibold uppercase tracking-[0.19em] ${muted}`}>
          Preferences
        </p>

        <button
          type="button"
          disabled
          title="Settings are not available yet"
          className={`flex w-full cursor-not-allowed items-center gap-3 rounded-xl px-3.5 py-3 text-left text-[13px] opacity-60 ${muted}`}
        >
          <Settings size={18} strokeWidth={1.8} />
          <span className="flex-1">Settings</span>
          <span className="text-[9px] uppercase tracking-wide">Soon</span>
        </button>
      </div>

      <div className="mt-auto px-5 pb-5 pt-8">
        <div
          className={`relative overflow-hidden rounded-2xl border p-4 ${
            darkMode
              ? "border-[#435442] bg-[#223326]"
              : "border-[#e1e6d4] bg-[#eef0e3]"
          }`}
        >
          <div className="relative z-10">
            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-[#d9e3c9] text-[#4e704d]">
              <Heart size={19} />
            </div>
            <p className="text-sm font-semibold">A little reminder</p>
            <p className={`mt-1.5 text-xs leading-5 ${muted}`}>
              You deserve the same kindness you give others.
            </p>
          </div>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-8 -right-6 h-24 w-24 rounded-full border-[15px] border-[#a6ba8d]/20"
          />
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className={`mt-5 flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-sm transition hover:bg-red-500/10 hover:text-red-500 ${muted}`}
        >
          <LogOut size={18} />
          Log out
        </button>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className={`flex min-h-screen items-center justify-center ${page}`}>
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 animate-pulse items-center justify-center rounded-2xl bg-[#dfe8d3] text-[#526e4b]">
            <Leaf size={28} />
          </div>
          <p className="text-sm font-medium">Preparing your space...</p>
          <p className={`mt-2 text-xs ${muted}`}>
            Just a moment, we're getting things ready.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${page}`}>
      {/* Desktop sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 hidden w-[258px] border-r lg:block ${border} ${
          darkMode ? "bg-[#151f18]" : "bg-[#fbfaf4]"
        }`}
      >
        {sidebar}
      </aside>

      {/* Mobile sidebar */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close navigation"
            onClick={() => setMobileMenuOpen(false)}
            className="absolute inset-0 bg-black/40"
          />
          <aside
            className={`absolute inset-y-0 left-0 w-[285px] overflow-y-auto border-r ${border} ${
              darkMode ? "bg-[#151f18]" : "bg-[#fbfaf4]"
            }`}
          >
            <div className="flex justify-end px-4 pt-4">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
                className="rounded-xl p-2"
              >
                <X size={20} />
              </button>
            </div>
            {sidebar}
          </aside>
        </div>
      )}

      {/* Main workspace */}
      <div className="min-h-screen lg:ml-[258px]">
        {/* Top bar */}
        <header
          className={`sticky top-0 z-20 border-b backdrop-blur-xl ${border} ${
            darkMode ? "bg-[#101a15]/90" : "bg-[#f7f6ef]/90"
          }`}
        >
          <div className="flex min-h-[76px] items-center justify-between gap-3 px-4 sm:px-7 xl:px-10">
            <div className="flex min-w-0 items-center gap-3">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open navigation"
                className={`rounded-xl border p-2.5 lg:hidden ${border}`}
              >
                <Menu size={19} />
              </button>

              <div className="min-w-0">
                <p className={`text-[10px] font-medium uppercase tracking-[0.17em] ${muted}`}>
                  Your personal space
                </p>
                <h1 className="mt-1 truncate text-lg font-semibold tracking-tight sm:text-xl">
                  My Dashboard
                </h1>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-2 sm:gap-3">
              <div className="hidden items-center gap-2 rounded-full border border-[#dfe5d6] bg-[#fffef8] px-3 py-2 text-xs text-[#71816c] sm:flex dark:border-[#34463a] dark:bg-[#19271e]">
                <ShieldCheck size={15} />
                Your space is private
              </div>

              <button
                type="button"
                onClick={() => setTheme(darkMode ? "light" : "dark")}
                aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
                title={darkMode ? "Light mode" : "Dark mode"}
                className={`flex h-10 w-10 items-center justify-center rounded-xl border transition hover:-translate-y-0.5 ${border} ${surface}`}
              >
                {darkMode ? (
                  <Sun size={18} strokeWidth={1.8} />
                ) : (
                  <Moon size={18} strokeWidth={1.8} />
                )}
              </button>

              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d9e2cd] bg-[#e6ecd9] text-xs font-semibold text-[#4c6748]">
                {initials}
              </div>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-[1440px] px-4 pb-10 pt-7 sm:px-7 sm:pt-9 xl:px-10">
          {error ? (
            <section
              role="alert"
              className={`rounded-2xl border p-7 ${border} ${surface}`}
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-500/10 text-red-500">
                <Activity size={21} />
              </div>
              <h2 className="mt-4 text-lg font-semibold">
                Your dashboard couldn't load
              </h2>
              <p className={`mt-2 text-sm ${muted}`}>{error}</p>
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="mt-5 rounded-xl bg-[#526e4b] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#40593a]"
              >
                Try again
              </button>
            </section>
          ) : (
            <>
              {/* Welcome hero */}
              <section
                className={`relative isolate overflow-hidden rounded-[28px] border ${
                  darkMode
                    ? "border-[#3c4d3c] bg-gradient-to-br from-[#263b2b] via-[#203426] to-[#17261d]"
                    : "border-[#e2e5d6] bg-gradient-to-br from-[#eef0e2] via-[#f2f1e7] to-[#f8f4e9]"
                }`}
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-12 -top-24 h-72 w-72 rounded-full bg-[#b7c99b]/20 blur-3xl sm:h-96 sm:w-96"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -bottom-24 right-1/4 h-56 w-56 rounded-full bg-[#d9cba7]/20 blur-3xl"
                />

                <div className="relative grid min-h-[320px] items-center gap-4 px-6 py-9 sm:px-10 sm:py-11 lg:grid-cols-[1.2fr_0.8fr] lg:px-12">
                  <div className="relative z-10 max-w-2xl">
                    {/* <div
                      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] ${
                        darkMode
                          ? "border-[#627a58]/60 bg-[#17261d]/60 text-[#c6d8af]"
                          : "border-[#d6dec5] bg-white/60 text-[#5b754f]"
                      }`}
                    >
                      <Sparkles size={13} />
                      Your space, your pace
                    </div> */}

                    <p
  className={`text-base font-semibold tracking-wide sm:text-lg ${
    darkMode ? "text-[#c2cdbf]" : "text-[#667b5d]"
  }`}
>
  {greeting}
</p>

<h2 className="mt-1 text-[35px] font-medium leading-tight tracking-[-0.045em] sm:text-5xl lg:text-[54px]">
  <span className="inline-flex flex-wrap items-center gap-2">
    <span>{firstName}</span>
    <span className="text-[0.65em]" role="img" aria-label={greetingIcon}>
      {greetingIcon}
    </span>
  </span>
</h2>

                    <p
                      className={`mt-4 max-w-[450px] text-sm leading-7 sm:text-[15px] ${
                        darkMode ? "text-[#c2cdbf]" : "text-[#747f6d]"
                      }`}
                    >
                      You don't have to figure everything out today. Take a
                      breath, check in with yourself, and take your next step
                      when you're ready.
                    </p>

                    <div className="mt-7 flex flex-wrap items-center gap-4">
                      <button
                        type="button"
                        onClick={() => goTo("/ai-chat")}
                        className="inline-flex items-center gap-2.5 rounded-xl bg-[#526e4b] px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#344d32]/10 transition hover:-translate-y-0.5 hover:bg-[#40593a] focus:outline-none focus:ring-2 focus:ring-[#79936b] focus:ring-offset-2"
                      >
                        <MessageCircle size={18} />
                        Talk to Anya
                        <ArrowUpRight size={16} />
                      </button>

                      <span className={`text-xs ${muted}`}>
                        A little progress is still progress.
                      </span>
                    </div>
                  </div>

                  {/* CSS-built botanical illustration */}
                  <div
                    aria-hidden="true"
                    className="relative mx-auto hidden h-[260px] w-full max-w-[340px] lg:block"
                  >
                    <div className="absolute bottom-5 left-1/2 h-[180px] w-[180px] -translate-x-1/2 rounded-full border border-[#8ba47a]/30" />
                    <div className="absolute bottom-10 left-1/2 h-[140px] w-[140px] -translate-x-1/2 rounded-full bg-[#b9cba2]/25" />
                    <div className="absolute bottom-0 left-1/2 h-[75px] w-[230px] -translate-x-1/2 rounded-[50%] bg-[#8ba47a]/20 blur-sm" />

                    <div className="absolute bottom-[42px] left-[calc(50%-4px)] h-[150px] w-[3px] rotate-[10deg] rounded-full bg-[#718c61]" />

                    <div className="absolute bottom-[132px] left-[calc(50%-3px)] h-[55px] w-[28px] -rotate-[38deg] rounded-[100%_0_100%_0] border border-[#80976d]/50 bg-[#91a982]" />
                    <div className="absolute bottom-[101px] left-[calc(50%-29px)] h-[64px] w-[31px] -rotate-[72deg] rounded-[100%_0_100%_0] border border-[#80976d]/50 bg-[#b4c49b]" />
                    <div className="absolute bottom-[78px] left-[calc(50%+1px)] h-[70px] w-[33px] rotate-[35deg] rounded-[100%_0_100%_0] border border-[#80976d]/50 bg-[#819d70]" />
                    <div className="absolute bottom-[46px] left-[calc(50%-39px)] h-[65px] w-[34px] -rotate-[85deg] rounded-[100%_0_100%_0] border border-[#80976d]/50 bg-[#c4d0ae]" />

                    <div className="absolute bottom-[29px] left-[calc(50%-72px)] h-[65px] w-[150px] rounded-t-[75px] rounded-b-2xl border border-[#b9c7a8] bg-[#e0e5d1] shadow-sm" />
                    <div className="absolute bottom-[85px] left-[calc(50%-72px)] h-3 w-[150px] rounded-full border border-[#a8b99a] bg-[#b8c6a6]" />

                    <div className="absolute right-5 top-9 flex h-12 w-12 items-center justify-center rounded-2xl border border-[#e3e5d5] bg-white/60 text-[#718c61] shadow-sm">
                      <Heart size={21} strokeWidth={1.5} />
                    </div>
                    <div className="absolute left-4 top-16 flex h-10 w-10 items-center justify-center rounded-full border border-[#d8dec9] bg-[#f8f4e9]/80 text-[#718c61]">
                      <Sparkles size={17} strokeWidth={1.5} />
                    </div>
                    <div className="absolute bottom-16 right-2 h-3 w-3 rounded-full bg-[#9bad83]" />
                    <div className="absolute bottom-32 left-6 h-2 w-2 rounded-full bg-[#c5b990]" />
                  </div>
                </div>
              </section>

              {/* Quick actions */}
              <section className="mt-9">
                <div className="mb-5 flex items-end justify-between gap-4">
                  <div>
                    <p className={`text-[10px] font-semibold uppercase tracking-[0.17em] ${muted}`}>
                      Here for you
                    </p>
                    <h2 className="mt-1.5 text-xl font-semibold tracking-tight sm:text-2xl">
                      Your next step
                    </h2>
                  </div>
                  <span className={`hidden text-xs sm:block ${muted}`}>
                    Take things at your own pace
                  </span>
                </div>

                <div className="grid gap-5 xl:grid-cols-2">
                  {/* Anya card */}
                  <article
                    className={`group relative isolate flex min-h-[255px] flex-col overflow-hidden rounded-[24px] border p-6 transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-7 ${
                      darkMode
                        ? "border-[#3d503b] bg-gradient-to-br from-[#263b2b] to-[#1b2b20]"
                        : "border-[#e2e5d7] bg-gradient-to-br from-[#fffef9] via-[#f8f7ed] to-[#edf0e3] hover:shadow-[#7c8d68]/10"
                    }`}
                  >
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute -right-8 -top-10 -z-10 h-40 w-40 rounded-full border-[22px] border-[#9bb18a]/10 transition duration-500 group-hover:scale-110"
                    />

                    <div className="flex items-start justify-between gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e3ead8] text-[#526e4b]">
                        <MessageCircle size={23} strokeWidth={1.7} />
                      </div>
                      <span className={`rounded-full border px-3 py-1 text-[10px] font-medium ${border} ${muted}`}>
                        Your private space
                      </span>
                    </div>

                    <h3 className="mt-5 text-[21px] font-semibold tracking-tight">
                      Talk it out with Anya.
                    </h3>
                    <p className={`mt-2 max-w-md text-sm leading-6 ${muted}`}>
                      Express yourself, reflect on your thoughts, and put your
                      feelings into words at your own pace.
                    </p>

                    <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-6">
                      <button
                        type="button"
                        onClick={() => goTo("/ai-chat")}
                        className="inline-flex items-center gap-2 rounded-xl bg-[#526e4b] px-4 py-3 text-xs font-semibold text-white transition hover:bg-[#40593a]"
                      >
                        Open AI Chat
                        <ArrowRight size={15} />
                      </button>
                      <span className={`inline-flex items-center gap-1.5 text-[10px] ${muted}`}>
                        <ShieldCheck size={13} />
                        Personal space
                      </span>
                    </div>
                  </article>

                  {/* Doctor discovery card */}
                  <article
                    className={`group relative isolate flex min-h-[255px] flex-col overflow-hidden rounded-[24px] border p-6 transition duration-300 sm:p-7 ${
                      darkMode
                        ? "border-[#40514a] bg-gradient-to-br from-[#243b36] to-[#192b27]"
                        : "border-[#dce6db] bg-gradient-to-br from-[#f2f5ec] via-[#f7f7ef] to-[#e7efe6]"
                    }`}
                  >
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute -right-7 -top-8 -z-10 h-36 w-36 rounded-full bg-[#9dbbaa]/15 blur-2xl transition duration-500 group-hover:scale-125"
                    />

                    <div className="flex items-start justify-between gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#dce9df] text-[#4c7560]">
                        <Stethoscope size={23} strokeWidth={1.7} />
                      </div>
                      <span className={`rounded-full border px-3 py-1 text-[10px] font-medium ${border} ${muted}`}>
                        Professional support
                      </span>
                    </div>

                    <h3 className="mt-5 text-[21px] font-semibold tracking-tight">
                      Find the right support.
                    </h3>
                    <p className={`mt-2 max-w-md text-sm leading-6 ${muted}`}>
                      Finding professional support can be an important next
                      step. Your doctor discovery experience is coming soon.
                    </p>

                    <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-6">
                      <button
                        type="button"
                        disabled
                        title="Doctor discovery is not available yet"
                        className="inline-flex cursor-not-allowed items-center gap-2 rounded-xl border border-[#8ca58a]/50 px-4 py-3 text-xs font-semibold text-[#668067] opacity-70"
                      >
                        Find a Doctor
                        <ArrowRight size={15} />
                      </button>
                      <span className={`text-[10px] ${muted}`}>
                        Coming soon
                      </span>
                    </div>
                  </article>
                </div>
              </section>

              {/* Well-being reminder */}
              <section
                className={`relative isolate mt-6 overflow-hidden rounded-[24px] border p-6 sm:p-8 ${
                  darkMode
                    ? "border-[#3d503b] bg-gradient-to-br from-[#24382a] via-[#202f24] to-[#1a2920]"
                    : "border-[#e1e4d5] bg-gradient-to-br from-[#e9eedf] via-[#f1f0e4] to-[#f8f5ea]"
                }`}
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-12 -top-16 h-48 w-48 rounded-full bg-[#b6c99c]/20 blur-3xl"
                />

                <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                  <div className="max-w-2xl">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#dce7ce] text-[#526e4b]">
                        <HeartHandshake size={23} strokeWidth={1.7} />
                      </div>
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#6b865d]">
                          A gentle reminder
                        </p>
                        <h3 className="mt-1 text-xl font-semibold tracking-tight">
                          Make room for yourself.
                        </h3>
                      </div>
                    </div>

                    <p className={`mt-4 text-sm leading-7 sm:pl-14 ${muted}`}>
                      You don't need to have everything figured out. Take a
                      moment to breathe, acknowledge how you're feeling, and
                      give yourself the same kindness you'd offer someone else.
                    </p>
                  </div>

                  <div
                    aria-hidden="true"
                    className="hidden h-32 w-40 shrink-0 items-end justify-center sm:flex"
                  >
                    <div className="relative h-[105px] w-[125px]">
                      <div className="absolute bottom-0 left-1/2 h-12 w-[100px] -translate-x-1/2 rounded-t-[48px] rounded-b-xl border border-[#bdc9ad] bg-[#dfe5d2]" />
                      <div className="absolute bottom-10 left-1/2 h-[65px] w-[2px] -translate-x-1/2 bg-[#829b70]" />
                      <div className="absolute bottom-[62px] left-[42px] h-8 w-5 -rotate-[40deg] rounded-[100%_0_100%_0] bg-[#8ea77a]" />
                      <div className="absolute bottom-[50px] left-[61px] h-9 w-5 rotate-[35deg] rounded-[100%_0_100%_0] bg-[#aabd93]" />
                      <div className="absolute bottom-[42px] left-[35px] h-7 w-5 -rotate-[65deg] rounded-[100%_0_100%_0] bg-[#b8c9a4]" />
                      <div className="absolute bottom-[10px] left-0 h-px w-full bg-[#b4c2a3]" />
                    </div>
                  </div>
                </div>
              </section>

              {/* Small closing note */}
              <footer className={`mt-7 flex flex-col gap-2 border-t pt-5 text-xs sm:flex-row sm:items-center sm:justify-between ${border} ${muted}`}>
                <span className="inline-flex items-center gap-2">
                  <Heart size={13} />
                  Small steps count, too.
                </span>
                <span className="inline-flex items-center gap-2">
                  <Check size={13} />
                  Your journey, at your own pace.
                </span>
              </footer>
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default PatientDashboard;
