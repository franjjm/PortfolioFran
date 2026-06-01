/* global React */
const { useState, useEffect, useRef } = React;

// Shared: is element within viewport (with bottom margin so it triggers a bit early)?
function inViewport(el, marginRatio = 0.9) {
  const r = el.getBoundingClientRect();
  const h = window.innerHeight || document.documentElement.clientHeight;
  return r.top < h * marginRatio && r.bottom > 0;
}

// Registry-based scroll watcher: rect-based (reliable in preview iframes where IO is flaky).
const watchers = new Set();
let watcherBound = false;
function ensureWatcher() {
  if (watcherBound) return;
  watcherBound = true;
  const run = () => {
    watchers.forEach((w) => {
      if (w.done) { watchers.delete(w); return; }
      if (w.el && inViewport(w.el, w.margin)) { w.done = true; w.cb(); watchers.delete(w); }
    });
  };
  window.addEventListener("scroll", run, { passive: true });
  window.addEventListener("resize", run, { passive: true });
  // periodic safety sweep (covers programmatic layout shifts)
  setInterval(run, 400);
}
function watchInView(el, cb, margin = 0.9) {
  ensureWatcher();
  const w = { el, cb, margin, done: false };
  // immediate check (timer, not rAF — rAF can be paused in offscreen/preview frames)
  setTimeout(() => {
    if (w.done) return;
    if (inViewport(el, margin)) { w.done = true; cb(); }
    else watchers.add(w);
  }, 0);
  return () => { w.done = true; watchers.delete(w); };
}

// ---- Reveal on scroll (fade-up) ----
// Robust against paused-compositor environments: once shown, we drop the
// transition after the fade window so opacity snaps to its final value even
// if CSS transitions are frozen (e.g. offscreen preview iframes).
function useReveal(margin = 0.92) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) { setShown(true); return; }
    const stop = watchInView(el, () => setShown(true), margin);
    const fallback = setTimeout(() => setShown(true), 1600); // never stay hidden
    return () => { stop(); clearTimeout(fallback); };
  }, []);
  return [ref, shown];
}

function Reveal({ as = "div", delay = 0, className = "", children, style, ...rest }) {
  const [ref, shown] = useReveal();
  const [settled, setSettled] = useState(false);
  useEffect(() => {
    if (!shown) return;
    const id = setTimeout(() => setSettled(true), delay + 760);
    return () => clearTimeout(id);
  }, [shown, delay]);
  const Tag = as;
  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : "translateY(22px)",
        transition: settled
          ? "none"
          : "opacity .7s cubic-bezier(.16,.84,.44,1) " + (shown ? delay : 0) + "ms, transform .7s cubic-bezier(.16,.84,.44,1) " + (shown ? delay : 0) + "ms",
        ...(style || {}),
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

// ---- Count-up when in view ----
function useCountUp(target, duration = 1500) {
  const ref = useRef(null);
  const [val, setVal] = useState(0);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const begin = () => {
      if (started.current) return;
      started.current = true;
      const start = Date.now();
      const id = setInterval(() => {
        const t = Math.min(1, (Date.now() - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        setVal(Math.round(eased * target));
        if (t >= 1) clearInterval(id);
      }, 1000 / 60);
    };
    const stop = watchInView(el, begin, 0.85);
    const fallback = setTimeout(begin, 2200);
    return () => { stop(); clearTimeout(fallback); };
  }, [target, duration]);
  return [ref, val];
}

// ---- Reveal a non-React trigger (returns [ref, shown]) for the map ----
function useInView(margin = 0.85) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) { setShown(true); return; }
    const stop = watchInView(el, () => setShown(true), margin);
    const fallback = setTimeout(() => setShown(true), 2200);
    return () => { stop(); clearTimeout(fallback); };
  }, []);
  return [ref, shown];
}

// ---- Scroll spy ----
function useScrollSpy(ids, offset = 120) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY + offset;
      let cur = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= y) cur = id;
      }
      setActive(cur);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [ids.join(","), offset]);
  return active;
}

function SectionHeader({ kicker, title }) {
  return (
    <Reveal className="mb-12 md:mb-16">
      <div className="flex items-center gap-3 mb-4">
        <span className="font-mono text-xs tracking-[0.2em] uppercase text-[var(--accent)]">{kicker}</span>
        <span className="h-px flex-1 max-w-[120px] bg-[var(--line)]"></span>
      </div>
      <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-[var(--ink)]">{title}</h2>
    </Reveal>
  );
}

function Tag({ children }) {
  return (
    <span className="font-mono text-[11px] md:text-xs px-2.5 py-1 rounded-md border border-[var(--line)] bg-[var(--surface-2)] text-[var(--ink-dim)]">
      {children}
    </span>
  );
}

Object.assign(window, { useReveal, Reveal, useCountUp, useInView, useScrollSpy, SectionHeader, Tag });
