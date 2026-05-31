/* global React, ReactDOM, CONTENT, Navbar, Hero, Divider, Story, Action, Projects, Skills, Education, Experience, Contact, Footer */
function App() {
  const [lang, setLang] = React.useState(() => {
    try { return localStorage.getItem("fj_lang") || "es"; } catch (e) { return "es"; }
  });
  React.useEffect(() => {
    try { localStorage.setItem("fj_lang", lang); } catch (e) {}
    document.documentElement.lang = lang;
  }, [lang]);

  const t = CONTENT;
  return (
    <React.Fragment>
      <Navbar lang={lang} setLang={setLang} t={t} />
      <main>
        <Hero lang={lang} t={t} />
        <Divider />
        <Story lang={lang} t={t} />
        <Divider />
        <Action lang={lang} t={t} />
        <Projects lang={lang} t={t} />
        <Skills lang={lang} t={t} />
        <Education lang={lang} t={t} />
        <Experience lang={lang} t={t} />
        <Contact lang={lang} t={t} />
      </main>
      <Footer lang={lang} t={t} />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
