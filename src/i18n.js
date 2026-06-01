// Bilingual content for the portfolio. Exposed as window.CONTENT.
// NOTE: Hero bio + My Story copy + the 3 stats are from the brief (final).
// Projects / Skills / Experience marked PLACEHOLDER — swap with real content.
window.CONTENT = {
  nav: {
    es: { story: "Historia", action: "En acción", projects: "Proyectos", skills: "Habilidades", education: "Educación", experience: "Experiencia", contact: "Contacto" },
    en: { story: "Story", action: "In action", projects: "Projects", skills: "Skills", education: "Education", experience: "Experience", contact: "Contact" },
  },

  hero: {
    role: {
      es: "Analista Informático · Estudiante avanzado de Ingeniería Informática — UCEMA",
      en: "Computer Analyst · Advanced Computer Engineering Student — UCEMA",
    },
    body: {
      es: "Construyo software que funciona en el mundo real: proyectos en producción, código mantenible e impacto concreto. Actualmente cursando Ingeniería Informática en Buenos Aires.",
      en: "I build software that works in the real world: projects in production, maintainable code, and concrete impact. Currently studying Computer Engineering in Buenos Aires.",
    },
    cta1: { es: "Ver proyectos", en: "View projects" },
    cta2: { es: "Contacto", en: "Contact" },
    cvLabel: { es: "Descargar CV", en: "Download CV" },
    cvPrompt: { es: "Elegí el idioma", en: "Choose language" },
    available: { es: "Disponible para internships y roles junior", en: "Available for internships & junior roles" },
  },

  story: {
    kicker: { es: "Mi historia", en: "My story" },
    title: { es: "Del interior a Buenos Aires", en: "From the interior to Buenos Aires" },
    p1: {
      es: "Me crié en Santiago del Estero. Hace 4 años tomé la decisión de mudarme solo a Buenos Aires para estudiar Ingeniería Informática en UCEMA — una de las universidades más exigentes del país en ciencias exactas.",
      en: "I grew up in Santiago del Estero. Four years ago I made the decision to move alone to Buenos Aires to study Computer Engineering at UCEMA — one of the most demanding universities in the country for exact sciences.",
    },
    p2: {
      es: "Ese camino me enseñó a resolver problemas con recursos limitados, a adaptarme rápido y a construir desde cero. Hoy aplico esa misma mentalidad al software: proyectos reales, código que funciona, impacto concreto.",
      en: "That path taught me to solve problems with limited resources, adapt quickly, and build from scratch. Today I apply that same mindset to software: real projects, working code, concrete impact.",
    },
    mapOrigin: { es: "Santiago del Estero", en: "Santiago del Estero" },
    mapDest: { es: "CABA · Buenos Aires", en: "CABA · Buenos Aires" },
    stats: [
      { value: 4, suffix: "", label: { es: "años en Buenos Aires", en: "years in Buenos Aires" } },
      { value: 3, suffix: "", label: { es: "proyectos en producción", en: "projects in production" } },
      { value: 70, suffix: "+", label: { es: "asistentes coordinados", en: "attendees coordinated" } },
    ],
  },

  gallery: {
    kicker: { es: "En acción", en: "In action" },
    title: { es: "Eventos & presentaciones", en: "Events & talks" },
    note: { es: "Imágenes de ejemplo — reemplazá el `src` de cada item con tus fotos.", en: "Placeholder images — replace each item's `src` with your photos." },
    items: [
      {
        type: "talk", src: "assets/aicollective.jpg", ratio: "3 / 4",
        event: { es: "AI Collective", en: "AI Collective" },
        meta: { es: "14 may 2025 · Presentación", en: "May 14, 2025 · Speaker" },
        desc: { es: "Presenté en AI Collective, un evento sobre inteligencia artificial que ayudé a organizar para la comunidad universitaria.", en: "Presented at AI Collective, an artificial-intelligence event I helped organize for the university community." },
        link: "https://franjjm.github.io/Presentacion_AICollective/#1",
        linkLabel: { es: "Ver presentación", en: "View slides" },
      },
      {
        type: "photo", srcs: ["assets/globant-flyer.jpg", "assets/globant-photo.jpg"], ratio: "1 / 1",
        event: { es: "Inside Globant", en: "Inside Globant" },
        meta: { es: "18 oct · INNOBYTE UCEMA", en: "Oct 18 · INNOBYTE UCEMA" },
        desc: { es: "Organicé la primera actividad del Club de Ingeniería: un recorrido por las oficinas de Globant al que asistieron más de 30 personas.", en: "Organized the Engineering Club's first activity: a tour of Globant's offices attended by 30+ people." },
      },
      {
        type: "talk", srcs: ["assets/devseries-flyer.jpg", "assets/devseries-photo.jpg"], ratio: "9 / 16",
        event: { es: "Dev Series · Brubank", en: "Dev Series · Brubank" },
        meta: { es: "23 abr 2025 · Organizador", en: "Apr 23, 2025 · Organizer" },
        desc: { es: "Invité personalmente a Matías Gualino, CTO de Brubank, para una charla sobre liderazgo en tecnología y fintech. Organizado con INNOBYTE en UCEMA.", en: "Personally invited Matías Gualino, Brubank's CTO, for a talk on leadership in tech and fintech. Organized with INNOBYTE at UCEMA." },
      },
      {
        type: "photo", src: "assets/iot.jpg", ratio: "3 / 4",
        event: { es: "The Things Conference · IoT", en: "The Things Conference · IoT" },
        meta: { es: "UCEMA · Staff", en: "UCEMA · Staff" },
        desc: { es: "Participé como staff en The Things Conference, el evento global de IoT, en su edición en UCEMA.", en: "Took part as staff at The Things Conference, the global IoT event, in its UCEMA edition." },
      },
    ],
  },

  projects: {
    kicker: { es: "Proyectos", en: "Projects" },
    title: { es: "Trabajo seleccionado", en: "Selected work" },
    note: { es: "Contenido de ejemplo — reemplazar con tus proyectos reales.", en: "Placeholder content — replace with your real projects." },
    items: [
      {
        name: { es: "QuantWealth", en: "QuantWealth" },
        badge: { es: "Demo en vivo", en: "Live demo" },
        desc: {
          es: "Plataforma fintech end-to-end para gestión de patrimonio con un motor de microestructura de mercado: análisis de Order Book Imbalance, Z-Score estadístico y generación de señales de ejecución. Incluye un módulo de RWA inmobiliario para tokenización de activos reales en Web3.",
          en: "End-to-end fintech platform for wealth management with a market-microstructure engine: Order Book Imbalance analysis, statistical Z-Score, and execution-signal generation. Includes a real-estate RWA module for tokenizing real-world assets in Web3.",
        },
        stack: ["Python", "Next.js", "Supabase", "React"],
        link: "quant-wealth.vercel.app",
      },
      {
        name: { es: "Alfred Bot", en: "Alfred Bot" },
        badge: { es: "En vivo", en: "Live" },
        desc: {
          es: "Aplicación end-to-end para la gestión de turnos médicos: reserva de turnos con validación de usuarios y persistencia en SQL Server, sobre una arquitectura relacional con integridad referencial y manejo de concurrencia.",
          en: "End-to-end application for medical appointment management: appointment booking with user validation and SQL Server persistence, built on a relational architecture with referential integrity and concurrency handling.",
        },
        stack: ["C#", ".NET", "SQL Server"],
        link: "alfredbot.com.ar",
      },
      {
        name: { es: "SubiteYa", en: "SubiteYa" },
        badge: { es: "En vivo", en: "Live" },
        desc: {
          es: "Plataforma para centralizar la publicación de video: juntás varios videos y los subís desde un solo lugar a distintas cuentas, evitando el trabajo manual de publicar uno por uno.",
          en: "A platform to centralize video publishing: gather multiple videos and upload them from one place to different accounts, removing the manual work of posting one by one.",
        },
        stack: ["Next.js", "JavaScript", "TikTok API", "Automatización"],
        link: "subiteya.com.ar",
      },
    ],
  },

  skills: {
    kicker: { es: "Habilidades", en: "Skills" },
    title: { es: "Stack técnico", en: "Technical stack" },
    groups: [
      { title: { es: "Lenguajes", en: "Languages" }, tags: ["Python", "C#", "C", "JavaScript", "HTML/CSS"] },
      { title: { es: "Frameworks & Librerías", en: "Frameworks & Libraries" }, tags: [".NET", "React", "Next.js", "Django"] },
      { title: { es: "Datos & Bases de datos", en: "Data & Databases" }, tags: ["SQL", "Supabase (PostgreSQL)", "MySQL", "Advanced Excel"] },
      { title: { es: "Técnicas", en: "Technical" }, tags: ["Automatización", "Análisis de datos", "Full-stack", "Arquitectura de DB"] },
      { title: { es: "Idiomas", en: "Languages spoken" }, tags: ["Español — nativo", "Inglés — B2"] },
    ],
  },

  education: {
    kicker: { es: "Educación", en: "Education" },
    title: { es: "Formación académica", en: "Academic background" },
    items: [
      {
        degree: { es: "Ingeniería en Informática", en: "B.S. Computer Engineering" },
        school: "Universidad del CEMA (UCEMA)",
        period: { es: "2024 – 2028 · 3er año (en curso)", en: "2024 – 2028 · 3rd year (in progress)" },
        current: true,
        detail: {
          es: "Materias clave: Algoritmos y Estructuras de Datos, Bases de Datos, Programación Orientada a Objetos, Sistemas Operativos, Redes, Programación 3.",
          en: "Relevant coursework: Algorithms & Data Structures, Databases, Object-Oriented Programming, Operating Systems, Computer Networks, Programming 3.",
        },
      },
      {
        degree: { es: "Analista Informático", en: "Associate Degree in Computer Science (Computer Analyst)" },
        school: "Universidad del CEMA (UCEMA)",
        period: { es: "2024 – 2026 · Completado", en: "2024 – 2026 · Completed" },
        current: false,
        detail: null,
      },
    ],
  },

  experience: {
    kicker: { es: "Experiencia", en: "Experience" },
    title: { es: "Liderazgo & comunidad", en: "Leadership & community" },
    note: { es: "Contenido de ejemplo — ajustá con tus datos.", en: "Placeholder content — adjust with your details." },
    items: [
      {
        role: { es: "Coordinador y Líder Estudiantil", en: "Coordinator & Student Leader" },
        org: { es: "Club de Informática — UCEMA", en: "Computer Science Club — UCEMA" },
        period: { es: "2025 – Presente", en: "2025 – Present" },
        bullets: {
          es: [
            "Lideré la reactivación del club estudiantil, gestionando relaciones institucionales con Globant y Brubank para organizar eventos de networking y charlas técnicas.",
            "Coordiné la logística de eventos masivos (IoT, tecnología), incluyendo acreditaciones de más de 70 asistentes y gestión de equipos bajo presión.",
            "Actué como nexo entre la universidad y el sector privado, desarrollando habilidades de comunicación ejecutiva y gestión de proyectos.",
          ],
          en: [
            "Led the reactivation of the student club, managing institutional relationships with Globant and Brubank to organize networking events and technical talks.",
            "Coordinated logistics for large-scale events (IoT, tech), including accreditation of 70+ attendees and team management under pressure.",
            "Served as liaison between the university and the private sector, developing executive communication and project-management skills.",
          ],
        },
      },
    ],
  },

  contact: {
    kicker: { es: "Contacto", en: "Contact" },
    title: { es: "Construyamos algo", en: "Let's build something" },
    blurb: {
      es: "Abierto a internships y roles junior en desarrollo de software, datos y automatización de procesos.",
      en: "Open to internships and junior roles in software development, data, and process automation.",
    },
    location: { es: "CABA, Argentina", en: "CABA, Argentina" },
    emailLabel: { es: "Escribime", en: "Email me" },
    email: "franjuarez2013@gmail.com",
    linkedin: "https://www.linkedin.com/in/francisco-juarezj/",
  },

  footer: {
    es: "Diseñado y desarrollado por Francisco Juarez.",
    en: "Designed and developed by Francisco Juarez.",
  },
};
