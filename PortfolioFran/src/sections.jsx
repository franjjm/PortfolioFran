/* global React, Reveal, SectionHeader, Tag, useCountUp, useInView, ArgentinaMap */

// Divider used before/after the Story section
function Divider() {
  return (
    <div className="max-w-6xl mx-auto px-5 md:px-8">
      <div className="h-px w-full" style={{ background: "linear-gradient(to right, transparent, var(--line) 18%, var(--line) 82%, transparent)" }}></div>
    </div>
  );
}

// ---------------- STAT CARD (count-up) ----------------
function StatCard({ stat, lang, delay }) {
  const [ref, val] = useCountUp(stat.value, 1500);
  return (
    <Reveal delay={delay}>
      <div ref={ref} className="rounded-xl border border-[var(--line)] bg-[var(--surface-2)] p-5 md:p-6 h-full transition-colors hover:border-[var(--accent)]/60"
        style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.03)" }}>
        <div className="flex items-baseline gap-0.5">
          <span className="font-semibold tracking-tight text-[var(--accent)]" style={{ fontSize: "clamp(40px, 6vw, 60px)", lineHeight: 1 }}>{val}</span>
          <span className="font-semibold text-[var(--accent)]" style={{ fontSize: "clamp(28px, 4vw, 40px)", lineHeight: 1 }}>{stat.suffix}</span>
        </div>
        <p className="mt-3 text-sm text-[var(--ink-dim)] leading-snug" style={{ textWrap: "balance" }}>{stat.label[lang]}</p>
      </div>
    </Reveal>
  );
}

// ---------------- MY STORY ----------------
function Story({ lang, t }) {
  const s = t.story;
  const [mapRef, mapShown] = useInView(0.8);

  return (
    <section id="story" className="py-24 md:py-32 px-5 md:px-8">
      <div className="max-w-6xl mx-auto">
        <SectionHeader kicker={s.kicker[lang]} title={s.title[lang]} />

        <div className="grid md:grid-cols-[1.2fr_1fr] gap-12 md:gap-16 items-center">
          {/* left: text */}
          <div>
            <Reveal>
              <p className="text-lg md:text-xl text-[var(--ink)] leading-relaxed" style={{ textWrap: "pretty" }}>{s.p1[lang]}</p>
            </Reveal>
            <Reveal delay={120}>
              <p className="mt-6 text-base md:text-lg text-[var(--ink-dim)] leading-relaxed" style={{ textWrap: "pretty" }}>{s.p2[lang]}</p>
            </Reveal>
          </div>

          {/* right: stylized map */}
          <Reveal delay={120} className="flex justify-center">
            <div ref={mapRef} className="w-full">
              <ArgentinaMap originLabel={s.mapOrigin[lang]} destLabel={s.mapDest[lang]} shown={mapShown} />
            </div>
          </Reveal>
        </div>

        {/* stat cards */}
        <div className="mt-14 md:mt-20 grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-5">
          {s.stats.map((st, i) => <StatCard key={i} stat={st} lang={lang} delay={i * 120} />)}
        </div>
      </div>
    </section>
  );
}

// ---------------- PROJECTS ----------------
function Projects({ lang, t }) {
  const p = t.projects;
  return (
    <section id="projects" className="py-24 md:py-32 px-5 md:px-8 bg-[var(--surface-1)]">
      <div className="max-w-6xl mx-auto">
        <SectionHeader kicker={p.kicker[lang]} title={p.title[lang]} />
        <div className="grid sm:grid-cols-2 gap-4 md:gap-5">
          {p.items.map((proj, i) => (
            <Reveal key={i} delay={(i % 2) * 100}>
              <article className="group relative rounded-xl border border-[var(--line)] bg-[var(--surface-2)] p-6 md:p-7 h-full flex flex-col transition-all duration-300 hover:-translate-y-1"
                style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.03)" }}>
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-[var(--ink)]">{proj.name[lang]}</h3>
                  {proj.badge && (
                    <span className="shrink-0 font-mono text-[10px] uppercase tracking-wider px-2 py-1 rounded-md border border-[var(--accent)]/40 text-[var(--accent)] bg-[var(--accent)]/10">{proj.badge[lang]}</span>
                  )}
                </div>
                <p className="text-sm md:text-[15px] text-[var(--ink-dim)] leading-relaxed flex-1" style={{ textWrap: "pretty" }}>{proj.desc[lang]}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {proj.stack.map((s) => <Tag key={s}>{s}</Tag>)}
                </div>
                {proj.link && (
                  <a href={"https://" + proj.link} target="_blank" rel="noopener noreferrer"
                    className="relative z-10 mt-5 inline-flex items-center gap-1.5 font-mono text-xs text-[var(--accent)] hover:text-[var(--ink)] transition-colors">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a15 15 0 010 18M12 3a15 15 0 000 18" /></svg>
                    {proj.link}
                  </a>
                )}
                {proj.link && (
                <div className="absolute top-6 right-6 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[var(--accent)]">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M7 17L17 7M17 7H8M17 7v9" /></svg>
                </div>
                )}
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------------- SKILLS ----------------
function Skills({ lang, t }) {
  const sk = t.skills;
  return (
    <section id="skills" className="py-24 md:py-32 px-5 md:px-8">
      <div className="max-w-6xl mx-auto">
        <SectionHeader kicker={sk.kicker[lang]} title={sk.title[lang]} />
        <div className="grid sm:grid-cols-2 gap-4 md:gap-5">
          {sk.groups.map((g, i) => (
            <Reveal key={i} delay={(i % 2) * 100}>
              <div className="rounded-xl border border-[var(--line)] bg-[var(--surface-2)] p-6 h-full">
                <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--ink-dim)] mb-4">{g.title[lang]}</h3>
                <div className="flex flex-wrap gap-2">
                  {g.tags.map((tg) => <Tag key={tg}>{tg}</Tag>)}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------------- EDUCATION ----------------
function Education({ lang, t }) {
  const ed = t.education;
  return (
    <section id="education" className="py-24 md:py-32 px-5 md:px-8 bg-[var(--surface-1)]">
      <div className="max-w-6xl mx-auto">
        <SectionHeader kicker={ed.kicker[lang]} title={ed.title[lang]} />
        <div className="space-y-4">
          {ed.items.map((it, i) => (
            <Reveal key={i} delay={i * 100}>
              <div className="rounded-xl border border-[var(--line)] bg-[var(--surface-2)] p-6 md:p-7 flex flex-col md:flex-row md:items-start gap-3 md:gap-8">
                <div className="md:w-56 shrink-0">
                  <span className="font-mono text-xs text-[var(--accent)]">{it.period[lang]}</span>
                  {it.current && <span className="ml-2 inline-block w-2 h-2 rounded-full bg-emerald-400 align-middle"></span>}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg md:text-xl font-semibold text-[var(--ink)]">{it.degree[lang]}</h3>
                  <p className="text-sm text-[var(--ink-dim)] mt-1">{it.school}</p>
                  {it.detail && <p className="text-sm text-[var(--ink-dim)] mt-3 leading-relaxed" style={{ textWrap: "pretty" }}>{it.detail[lang]}</p>}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------------- EXPERIENCE ----------------
function Experience({ lang, t }) {
  const ex = t.experience;
  return (
    <section id="experience" className="py-24 md:py-32 px-5 md:px-8">
      <div className="max-w-6xl mx-auto">
        <SectionHeader kicker={ex.kicker[lang]} title={ex.title[lang]} />
        <div className="space-y-4">
          {ex.items.map((it, i) => (
            <Reveal key={i} delay={i * 100}>
              <div className="rounded-xl border border-[var(--line)] bg-[var(--surface-2)] p-6 md:p-7">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold text-[var(--ink)]">{it.role[lang]}</h3>
                    <p className="text-sm text-[var(--accent)] mt-1">{it.org[lang]}</p>
                  </div>
                  <span className="font-mono text-xs text-[var(--ink-dim)] shrink-0">{it.period[lang]}</span>
                </div>
                <ul className="space-y-2">
                  {it.bullets[lang].map((b, j) => (
                    <li key={j} className="flex gap-3 text-sm md:text-[15px] text-[var(--ink-dim)] leading-relaxed">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[var(--accent)] shrink-0"></span>
                      <span style={{ textWrap: "pretty" }}>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------------- CONTACT + FOOTER ----------------
function Contact({ lang, t }) {
  const c = t.contact;
  return (
    <section id="contact" className="py-24 md:py-32 px-5 md:px-8 bg-[var(--surface-1)]">
      <div className="max-w-4xl mx-auto text-center">
        <SectionHeader kicker={c.kicker[lang]} title={c.title[lang]} />
        <Reveal delay={80}>
          <p className="text-lg md:text-xl text-[var(--ink-dim)] max-w-2xl mx-auto leading-relaxed" style={{ textWrap: "pretty" }}>{c.blurb[lang]}</p>
        </Reveal>
        <Reveal delay={160}>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <a href={"mailto:" + c.email}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-[var(--accent)] text-white text-sm font-medium transition-transform hover:-translate-y-0.5"
              style={{ boxShadow: "0 12px 34px -12px rgba(59,130,246,0.6)" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 6h16v12H4z" /><path d="M4 7l8 6 8-6" /></svg>
              {c.emailLabel[lang]}
            </a>
            {c.linkedin && (
              <a href={c.linkedin} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg border border-[var(--line)] text-[var(--ink)] text-sm font-medium transition-colors hover:border-[var(--accent)]">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14zM8.34 9.5H5.67V18h2.67V9.5zM7 6.06a1.55 1.55 0 100 3.1 1.55 1.55 0 000-3.1zM18.34 18v-4.67c0-2.48-1.32-3.63-3.09-3.63a2.67 2.67 0 00-2.41 1.33h-.04V9.5h-2.56V18h2.67v-4.2c0-1.11.21-2.18 1.58-2.18s1.36 1.26 1.36 2.25V18h2.5z" /></svg>
                LinkedIn
              </a>
            )}
            <span className="inline-flex items-center gap-2 font-mono text-sm text-[var(--ink-dim)]">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 21s-7-5.5-7-11a7 7 0 0114 0c0 5.5-7 11-7 11z" /><circle cx="12" cy="10" r="2.5" /></svg>
              {c.location[lang]}
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Footer({ lang, t }) {
  return (
    <footer className="px-5 md:px-8 py-10 border-t border-[var(--line)]">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <span className="font-mono text-xs text-[var(--ink-dim)]">{t.footer[lang]}</span>
        <span className="font-mono text-xs text-[var(--ink-dim)]">© {new Date().getFullYear()}</span>
      </div>
    </footer>
  );
}

Object.assign(window, { Divider, Story, Projects, Skills, Education, Experience, Contact, Footer });
