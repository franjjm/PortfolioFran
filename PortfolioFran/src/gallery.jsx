/* global React, Reveal, SectionHeader */
const { useState: useStateG, useEffect: useEffectG, useCallback: useCallbackG } = React;

// Line icons for placeholders (sober, editorial — not emoji)
function CameraIcon({ size = 30 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 8.5A1.5 1.5 0 014.5 7h2L8 5h8l1.5 2h2A1.5 1.5 0 0121 8.5v9A1.5 1.5 0 0119.5 19h-15A1.5 1.5 0 013 17.5v-9z" />
      <circle cx="12" cy="13" r="3.2" />
    </svg>
  );
}
function MicIcon({ size = 30 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="3" width="6" height="11" rx="3" />
      <path d="M5.5 11.5a6.5 6.5 0 0013 0" />
      <path d="M12 18v3M9 21h6" />
    </svg>
  );
}

// Crossfading slideshow: alternates between images every `interval` ms.
// The previous image sits underneath (always opaque) so something is always
// visible even if CSS transitions are frozen (offscreen preview iframes).
function Slideshow({ srcs, alt, interval = 5000 }) {
  const [idx, setIdx] = useStateG(0);
  const [lit, setLit] = useStateG(true);
  useEffectG(() => {
    const id = setInterval(() => {
      setLit(false);
      setIdx((i) => (i + 1) % srcs.length);
      const t = setTimeout(() => setLit(true), 40);
      return () => clearTimeout(t);
    }, interval);
    return () => clearInterval(id);
  }, [srcs.length, interval]);
  const prevIdx = (idx - 1 + srcs.length) % srcs.length;
  return (
    <div className="absolute inset-0">
      <img src={srcs[prevIdx]} alt="" className="absolute inset-0 w-full h-full object-cover" style={{ zIndex: 1 }} />
      <img src={srcs[idx]} alt={alt} className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: 2, opacity: lit ? 1 : 0, transition: "opacity .9s ease" }} />
      {/* dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex gap-1.5">
        {srcs.map((_, i) => (
          <span key={i} className="w-1.5 h-1.5 rounded-full transition-colors" style={{ background: i === idx ? "#fff" : "rgba(255,255,255,0.4)" }}></span>
        ))}
      </div>
    </div>
  );
}

// The visual content of a tile / lightbox frame: real image if present, else placeholder.
function MediaInner({ item, lang, big }) {
  const isTalk = item.type === "talk";
  if (item.srcs && item.srcs.length > 1) {
    return <Slideshow srcs={item.srcs} alt={item.event[lang]} />;
  }
  if (item.src) {
    return <img src={item.src} alt={item.event[lang]} className="w-full h-full object-cover" style={{ filter: "grayscale(0.12) contrast(1.02)" }} />;
  }
  return (
    <div className="w-full h-full grid place-items-center" style={{ background: "#1e1e2e" }}>
      <div className="absolute inset-0" style={{ background: "radial-gradient(120% 100% at 50% 0%, rgba(255,255,255,0.04), transparent 60%)" }}></div>
      <div className="flex flex-col items-center gap-2 text-[var(--ink-dim)]">
        <span className="text-[var(--ink-dim)]" style={{ opacity: 0.7 }}>{isTalk ? <MicIcon size={big ? 44 : 30} /> : <CameraIcon size={big ? 44 : 30} />}</span>
        <span className="font-mono text-[11px] tracking-wide" style={{ opacity: 0.65 }}>
          {isTalk ? (lang === "es" ? "Presentación" : "Talk") : (lang === "es" ? "Foto evento" : "Event photo")}
        </span>
      </div>
    </div>
  );
}

// ---------------- GALLERY TILE ----------------
function Tile({ item, lang, onOpen, index }) {
  return (
    <button
      onClick={() => onOpen(index)}
      className="group block w-full text-left mb-4 md:mb-5 break-inside-avoid focus:outline-none"
      style={{ WebkitTapHighlightColor: "transparent" }}
    >
      <div className="relative w-full overflow-hidden rounded-xl border border-[var(--line)]" style={{ aspectRatio: item.ratio, background: "#1e1e2e" }}>
        <MediaInner item={item} lang={lang} />

        {/* hover overlay with 1-line description */}
        <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: "linear-gradient(to top, rgba(8,8,13,0.92), rgba(8,8,13,0.35) 55%, transparent)" }}>
          <p className="text-sm text-[var(--ink)] leading-snug" style={{ textWrap: "pretty" }}>{item.desc[lang]}</p>
        </div>

        {/* expand affordance */}
        <span className="absolute top-3 right-3 grid place-items-center w-8 h-8 rounded-lg bg-black/40 backdrop-blur-sm text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M9 3H4v5M15 3h5v5M9 21H4v-5M15 21h5v-5" /></svg>
        </span>
      </div>

      {/* caption below */}
      <div className="mt-3">
        <h3 className="text-[15px] font-medium text-[var(--ink)] leading-tight">{item.event[lang]}</h3>
        <p className="mt-0.5 font-mono text-[11px] text-[var(--ink-dim)]">{item.meta[lang]}</p>
      </div>
    </button>
  );
}

// ---------------- LIGHTBOX ----------------
function Lightbox({ items, index, lang, onClose, onNav }) {
  useEffectG(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") onNav(1);
      else if (e.key === "ArrowLeft") onNav(-1);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = prevOverflow; };
  }, [onClose, onNav]);

  if (index == null) return null;
  const item = items[index];

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10"
      style={{ background: "rgba(4,4,8,0.92)", backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)" }}
      onClick={onClose}
    >
      {/* close */}
      <button onClick={onClose} aria-label="Cerrar"
        className="absolute top-4 right-4 md:top-6 md:right-6 grid place-items-center w-11 h-11 rounded-full border border-white/15 text-white/80 hover:text-white hover:border-white/40 transition-colors">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
      </button>

      {/* prev */}
      <button onClick={(e) => { e.stopPropagation(); onNav(-1); }} aria-label="Anterior"
        className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 grid place-items-center w-11 h-11 md:w-12 md:h-12 rounded-full border border-white/15 text-white/80 hover:text-white hover:border-white/40 transition-colors">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M15 6l-6 6 6 6" /></svg>
      </button>

      {/* next */}
      <button onClick={(e) => { e.stopPropagation(); onNav(1); }} aria-label="Siguiente"
        className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 grid place-items-center w-11 h-11 md:w-12 md:h-12 rounded-full border border-white/15 text-white/80 hover:text-white hover:border-white/40 transition-colors">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M9 6l6 6-6 6" /></svg>
      </button>

      {/* frame */}
      <figure className="relative flex flex-col items-center max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
        <div className="relative w-full overflow-hidden rounded-xl border border-white/10"
          style={{ aspectRatio: item.ratio, maxHeight: "72vh", background: "#1e1e2e" }}>
          <MediaInner item={item} lang={lang} big />
        </div>
        <figcaption className="mt-5 text-center">
          <h3 className="text-lg md:text-xl font-medium text-white">{item.event[lang]}</h3>
          <p className="mt-1 font-mono text-xs text-white/55">{item.meta[lang]}</p>
          <p className="mt-3 max-w-xl mx-auto text-sm text-white/75 leading-relaxed" style={{ textWrap: "pretty" }}>{item.desc[lang]}</p>
          {item.link && (
            <a href={item.link} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}
              className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--accent)] text-white text-xs font-medium transition-transform hover:-translate-y-0.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M7 17L17 7M17 7H8M17 7v9" /></svg>
              {(item.linkLabel && item.linkLabel[lang]) || (lang === "es" ? "Abrir" : "Open")}
            </a>
          )}
          <p className="mt-4 font-mono text-[11px] text-white/35">{index + 1} / {items.length}</p>
        </figcaption>
      </figure>
    </div>
  );
}

// ---------------- SECTION ----------------
function Action({ lang, t }) {
  const g = t.gallery;
  const [open, setOpen] = useStateG(null);
  const nav = useCallbackG((dir) => {
    setOpen((cur) => {
      if (cur == null) return cur;
      const n = g.items.length;
      return (cur + dir + n) % n;
    });
  }, [g.items.length]);

  return (
    <section id="action" className="py-24 md:py-32 px-5 md:px-8">
      <div className="max-w-6xl mx-auto">
        <SectionHeader kicker={g.kicker[lang]} title={g.title[lang]} />
        <div className="[column-fill:_balance] columns-1 sm:columns-2 lg:columns-3 gap-4 md:gap-5">
          {g.items.map((item, i) => (
            <Tile key={i} item={item} lang={lang} index={i} onOpen={setOpen} />
          ))}
        </div>
      </div>
      {open != null && (
        <Lightbox items={g.items} index={open} lang={lang} onClose={() => setOpen(null)} onNav={nav} />
      )}
    </section>
  );
}

Object.assign(window, { Action });
