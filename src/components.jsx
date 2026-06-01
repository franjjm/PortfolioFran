/* global React, Reveal, useScrollSpy */
const { useState: useStateC, useEffect: useEffectC } = React;

// ---------------- NAVBAR ----------------
function Navbar({ lang, setLang, t }) {
  const ids = ["story", "action", "projects", "skills", "education", "experience", "contact"];
  const active = useScrollSpy(["hero", ...ids], 140);
  const [scrolled, setScrolled] = useStateC(false);
  const [open, setOpen] = useStateC(false);
  useEffectC(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id) => (e) => {
    e.preventDefault();
    setOpen(false);
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: id === "hero" ? 0 : el.offsetTop - 72, behavior: "smooth" });
  };

  return (
    <header
      className="fixed top-0 inset-x-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(9,9,14,0.72)" : "transparent",
        backdropFilter: scrolled ? "blur(14px) saturate(140%)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(14px) saturate(140%)" : "none",
        borderBottom: "1px solid " + (scrolled ? "var(--line)" : "transparent"),
      }}
    >
      <nav className="max-w-6xl mx-auto px-5 md:px-8 h-[64px] flex items-center justify-between">
        <a href="#hero" onClick={go("hero")} className="group flex items-center gap-2.5">
          <span className="grid place-items-center w-8 h-8 rounded-md border border-[var(--line)] bg-[var(--surface-2)] font-mono text-sm font-semibold text-[var(--ink)] transition-colors group-hover:border-[var(--accent)]">FJ</span>
          <span className="font-mono text-xs tracking-wide text-[var(--ink-dim)] hidden sm:block">francisco.dev</span>
        </a>

        <div className="hidden md:flex items-center gap-1">
          {ids.map((id) => (
            <a key={id} href={"#" + id} onClick={go(id)}
              className="px-3.5 py-2 rounded-md text-sm transition-colors hover:text-[var(--ink)]"
              style={{ color: active === id ? "var(--ink)" : "var(--ink-dim)", background: active === id ? "var(--surface-2)" : "transparent" }}>
              {t.nav[lang][id]}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <LangToggle lang={lang} setLang={setLang} />
          <button onClick={() => setOpen((o) => !o)}
            className="md:hidden grid place-items-center w-9 h-9 rounded-md border border-[var(--line)] text-[var(--ink)]" aria-label="Menu">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <g><path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h16" /></g>}
            </svg>
          </button>
        </div>
      </nav>

      <div className="md:hidden overflow-hidden transition-all duration-300"
        style={{ maxHeight: open ? "340px" : "0px", background: "rgba(9,9,14,0.97)", backdropFilter: "blur(14px)", borderBottom: open ? "1px solid var(--line)" : "none" }}>
        <div className="px-5 py-2 flex flex-col">
          {ids.map((id) => (
            <a key={id} href={"#" + id} onClick={go(id)} className="py-3 text-sm border-b border-[var(--line)] last:border-0"
              style={{ color: active === id ? "var(--accent)" : "var(--ink-dim)" }}>
              {t.nav[lang][id]}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}

function LangToggle({ lang, setLang }) {
  return (
    <div className="relative flex items-center rounded-md border border-[var(--line)] bg-[var(--surface-2)] p-0.5 font-mono text-xs">
      <span className="absolute top-0.5 bottom-0.5 w-[38px] rounded-[5px] bg-[var(--accent)] transition-transform duration-300"
        style={{ transform: lang === "es" ? "translateX(0)" : "translateX(38px)" }}></span>
      {["es", "en"].map((l) => (
        <button key={l} onClick={() => setLang(l)}
          className="relative z-10 w-[38px] py-1.5 uppercase tracking-wider transition-colors"
          style={{ color: lang === l ? "#fff" : "var(--ink-dim)" }}>
          {l}
        </button>
      ))}
    </div>
  );
}

// ---------------- PROFILE PHOTO ----------------
// Editorial, sober. Square-ish? No — brief says circular. Subtle outer shadow + faint blue glow.
// If a real photo URL is set on window.PROFILE_PHOTO, it replaces the FJ placeholder.
function ProfilePhoto() {
  const src = window.PROFILE_PHOTO || null;
  return (
    <div className="relative shrink-0" style={{ width: "min(300px, 70vw)", height: "min(300px, 70vw)" }}>
      {/* faint blue glow */}
      <div className="absolute inset-0 rounded-full" style={{
        boxShadow: "0 0 70px 8px rgba(59,130,246,0.16)",
        transform: "scale(0.92)",
      }}></div>
      {/* thin orbital ring */}
      <div className="absolute inset-[-10px] rounded-full border border-[var(--line)]" style={{ opacity: 0.5 }}></div>

      <div className="relative w-full h-full rounded-full overflow-hidden"
        style={{
          background: "#1e1e2e",
          border: "1px solid rgba(120,130,160,0.22)",
          boxShadow: "0 24px 60px -24px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.04)",
        }}>
        {src ? (
          <img src={src} alt="Francisco Juarez" className="w-full h-full object-cover" style={{ filter: "grayscale(0.15) contrast(1.02)" }} />
        ) : (
          <div className="w-full h-full grid place-items-center relative">
            {/* subtle vignette so the editorial tone reads, not an app avatar */}
            <div className="absolute inset-0" style={{ background: "radial-gradient(120% 120% at 30% 20%, rgba(255,255,255,0.05), transparent 55%)" }}></div>
            <span className="font-semibold tracking-tight"
              style={{ fontSize: "clamp(56px, 14vw, 96px)", color: "#d7dbe8", letterSpacing: "-0.04em" }}>FJ</span>
          </div>
        )}
      </div>
    </div>
  );
}

// ---------------- HERO ----------------
function Hero({ lang, t }) {
  const h = t.hero;
  const go = (id) => (e) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 72, behavior: "smooth" });
  };
  return (
    <section id="hero" className="relative min-h-[92vh] flex items-center pt-28 pb-20 px-5 md:px-8">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 right-[6%] w-[520px] h-[520px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(59,130,246,0.10), transparent 62%)" }}></div>
        <div className="absolute inset-0" style={{
          backgroundImage: "radial-gradient(var(--line) 1px, transparent 1px)", backgroundSize: "44px 44px", opacity: 0.4,
          maskImage: "radial-gradient(circle at 50% 28%, black, transparent 75%)", WebkitMaskImage: "radial-gradient(circle at 50% 28%, black, transparent 75%)",
        }}></div>
      </div>

      <div className="relative max-w-6xl mx-auto w-full grid md:grid-cols-[1.45fr_1fr] gap-12 md:gap-14 items-center">
        {/* text — order 2 on mobile so photo sits on top */}
        <div className="order-2 md:order-1">
          <Reveal>
            <div className="inline-flex items-center gap-2 mb-7 px-3 py-1.5 rounded-full border border-[var(--line)] bg-[var(--surface-2)]">
              <span className="relative flex w-2 h-2">
                <span className="absolute inline-flex w-full h-full rounded-full bg-emerald-400 opacity-60 animate-ping"></span>
                <span className="relative inline-flex w-2 h-2 rounded-full bg-emerald-400"></span>
              </span>
              <span className="font-mono text-[11px] text-[var(--ink-dim)]">{h.available[lang]}</span>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-semibold tracking-[-0.03em] text-[var(--ink)] leading-[1.02]">
              Francisco<br />Juarez
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-5 font-mono text-sm md:text-[15px] text-[var(--accent)] leading-relaxed">{h.role[lang]}</p>
          </Reveal>
          <Reveal delay={240}>
            <p className="mt-5 max-w-xl text-base md:text-lg text-[var(--ink-dim)] leading-relaxed" style={{ textWrap: "pretty" }}>{h.body[lang]}</p>
          </Reveal>
          <Reveal delay={320}>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="#projects" onClick={go("projects")}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[var(--accent)] text-white text-sm font-medium transition-transform hover:-translate-y-0.5"
                style={{ boxShadow: "0 10px 30px -10px rgba(59,130,246,0.6)" }}>
                {h.cta1[lang]}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </a>
              <a href="#contact" onClick={go("contact")}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-[var(--line)] text-[var(--ink)] text-sm font-medium transition-colors hover:border-[var(--accent)]">
                {h.cta2[lang]}
              </a>
              <CVDownload lang={lang} t={t} />
            </div>
          </Reveal>
        </div>

        {/* photo — order 1 on mobile (centered, on top) */}
        <Reveal delay={140} className="order-1 md:order-2 flex justify-center md:justify-end">
          <ProfilePhoto />
        </Reveal>
      </div>
    </section>
  );
}

// ---------------- CV DOWNLOAD (asks ES/EN) ----------------
function CVDownload({ lang, t }) {
  const [open, setOpen] = useStateC(false);
  const files = { es: "assets/CV_Francisco_Juarez_ES.docx", en: "assets/CV_Francisco_Juarez_EN.docx" };
  useEffectC(() => {
    if (!open) return;
    const close = () => setOpen(false);
    const id = setTimeout(() => document.addEventListener("click", close), 0);
    return () => { clearTimeout(id); document.removeEventListener("click", close); };
  }, [open]);

  const opt = (code, label) => (
    <a href={files[code]} download onClick={() => setOpen(false)}
      className="flex items-center justify-between gap-4 px-3 py-2.5 rounded-lg hover:bg-[var(--surface-2)] transition-colors text-sm text-[var(--ink)]">
      <span className="flex items-center gap-2.5">
        <span className="font-mono text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded border border-[var(--line)] text-[var(--ink-dim)]">{code}</span>
        {label}
      </span>
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--ink-dim)]"><path d="M12 3v12M7 11l5 5 5-5M5 21h14" /></svg>
    </a>
  );

  return (
    <div className="relative" onClick={(e) => e.stopPropagation()}>
      <button onClick={() => setOpen((o) => !o)}
        className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-[var(--line)] text-[var(--ink)] text-sm font-medium transition-colors hover:border-[var(--accent)]"
        style={{ background: open ? "var(--surface-2)" : "transparent" }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v12M7 11l5 5 5-5M5 21h14" /></svg>
        {t.hero.cvLabel[lang]}
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform .2s" }}><path d="M6 9l6 6 6-6" /></svg>
      </button>
      {open && (
        <div className="absolute left-0 top-full mt-2 z-30 w-56 p-1.5 rounded-xl border border-[var(--line)] shadow-2xl"
          style={{ background: "var(--surface-1)", boxShadow: "0 20px 50px -20px rgba(0,0,0,0.8)" }}>
          <p className="px-3 pt-2 pb-1.5 font-mono text-[11px] uppercase tracking-wider text-[var(--ink-dim)]">{t.hero.cvPrompt[lang]}</p>
          {opt("es", "Español")}
          {opt("en", "English")}
        </div>
      )}
    </div>
  );
}

Object.assign(window, { Navbar, Hero, ProfilePhoto, CVDownload });
