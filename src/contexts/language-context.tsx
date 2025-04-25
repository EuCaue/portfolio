"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

type Language = "en" | "pt-BR";

type Translations = {
  [key: string]: {
    [key in Language]: string;
  };
};

// Translation dictionary
const translations: Translations = {
  // Navbar
  "nav.home": {
    en: "Home",
    "pt-BR": "Início",
  },
  "nav.about": {
    en: "About",
    "pt-BR": "Sobre",
  },
  "nav.projects": {
    en: "Projects",
    "pt-BR": "Projetos",
  },
  "nav.contact": {
    en: "Contact",
    "pt-BR": "Contato",
  },

  // Intro
  "intro.hello": {
    en: "Hello, I'm",
    "pt-BR": "Olá, eu sou",
  },
  "intro.description": {
    en: "I'm a passionate developer focused on creating beautiful, functional, and accessible web experiences.",
    "pt-BR":
      "Sou um desenvolvedor apaixonado focado em criar experiências web bonitas, funcionais e acessíveis.",
  },
  "intro.viewWork": {
    en: "View My Work",
    "pt-BR": "Ver Meus Trabalhos",
  },
  "intro.getInTouch": {
    en: "Get In Touch",
    "pt-BR": "Entre em Contato",
  },
  "intro.scrollDown": {
    en: "Scroll Down",
    "pt-BR": "Rolar para Baixo",
  },

  // About
  "about.title": {
    en: "About Me",
    "pt-BR": "Sobre Mim",
  },
  "about.paragraph1": {
    en: "I'm a passionate developer with a keen eye for design and a commitment to creating accessible, user-friendly experiences. With expertise in modern technologies and a problem-solving mindset, I transform ideas into elegant digital solutions.",
    "pt-BR":
      "Sou um desenvolvedor apaixonado com um olhar atento para design e um compromisso em criar experiências acessíveis e amigáveis. Com expertise em tecnologias modernas e uma mentalidade de resolução de problemas, transformo ideias em soluções digitais elegantes.",
  },
  "about.paragraph2": {
    en: "When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, or sharing knowledge with the developer community. I believe in continuous learning and pushing the boundaries of what's possible in technology.",
    "pt-BR":
      "Quando não estou codificando, você me encontrará explorando novas tecnologias, contribuindo para projetos de código aberto ou compartilhando conhecimento com a comunidade de desenvolvedores. Acredito na aprendizagem contínua e em expandir os limites do que é possível na tecnologia.",
  },
  "about.skills": {
    en: "My Skills",
    "pt-BR": "Minhas Habilidades",
  },

  // Projects
  "projects.title": {
    en: "Projects",
    "pt-BR": "Projetos",
  },
  "projects.subtitle": {
    en: "Here are some of my recent projects. Each one was built with a focus on solving real problems with clean, efficient code.",
    "pt-BR":
      "Aqui estão alguns dos meus projetos recentes. Cada um foi construído com foco em resolver problemas reais com código limpo e eficiente.",
  },
  "projects.github": {
    en: "GitHub",
    "pt-BR": "GitHub",
  },
  "projects.liveDemo": {
    en: "Live Demo",
    "pt-BR": "Demonstração",
  },

  // Quick Lofi
  "projects.quickLofi.title": {
    en: "Quick Lofi",
    "pt-BR": "Quick Lofi",
  },
  "projects.quickLofi.description": {
    en: "A GNOME Shell extension that enables users to listen to Lo-fi music with a single click. Designed for simplicity and ease of access, this lightweight extension integrates seamlessly with the GNOME environment.",
    "pt-BR":
      "Uma extensão do GNOME Shell que permite aos usuários ouvir música Lo-fi com um único clique. Projetada para simplicidade e facilidade de acesso, esta extensão leve se integra perfeitamente ao ambiente GNOME.",
  },

  // My Movies
  "projects.myMovies.title": {
    en: "My Movies",
    "pt-BR": "My Movies",
  },
  "projects.myMovies.description": {
    en: "A web app to help you organize your movie list in a practical and modern way. The goal is to make managing your movies simple and intuitive, with a robust structure that ensures top-notch security and performance.",
    "pt-BR":
      "Um aplicativo web para ajudar você a organizar sua lista de filmes de forma prática e moderna. O objetivo é tornar o gerenciamento de seus filmes simples e intuitivo, com uma estrutura robusta que garante segurança e desempenho de primeira linha.",
  },

  // URL Short
  "projects.urlShort.title": {
    en: "URL Short",
    "pt-BR": "URL Short",
  },
  "projects.urlShort.description": {
    en: "A web application that allows users to shorten URLs quickly and securely. Focused on delivering a hassle-free experience, the app ensures efficiency and simplicity in URL management.",
    "pt-BR":
      "Uma aplicação web que permite aos usuários encurtar URLs de forma rápida e segura. Focado em oferecer uma experiência sem complicações, o aplicativo garante eficiência e simplicidade no gerenciamento de URLs.",
  },

  // Snap The Web
  "projects.snapTheWeb.title": {
    en: "Snap The Web",
    "pt-BR": "Snap The Web",
  },
  "projects.snapTheWeb.description": {
    en: "A web app that lets users capture screenshots of websites effortlessly. With a focus on usability, the application offers a straightforward, customizable solution for taking browser-based screenshots.",
    "pt-BR":
      "Um aplicativo web que permite aos usuários capturar capturas de tela de sites sem esforço. Com foco na usabilidade, o aplicativo oferece uma solução direta e personalizável para tirar capturas de tela baseadas em navegador.",
  },

  // Get Cat
  "projects.getCat.title": {
    en: "Get Cat",
    "pt-BR": "Get Cat",
  },
  "projects.getCat.description": {
    en: "A fun app that displays random photos and facts about cats. Focused on simplicity and user experience, the app provides a pleasant and uncomplicated interaction.",
    "pt-BR":
      "Desenvolvi o Get Cat, um aplicativo divertido que exibe fotos e curiosidades aleatórias sobre gatos. Com foco na simplicidade e na experiência do usuário, o app proporciona uma interação agradável e descomplicada.",
  },

  // Nautilus Copy File Contents
  "projects.nautilusCopy.title": {
    en: "Nautilus Copy File Contents",
    "pt-BR": "Nautilus Copy File Contents",
  },
  "projects.nautilusCopy.description": {
    en: "A simple extension for Nautilus that lets you quickly copy the contents of a text file with one click.",
    "pt-BR":
      "Uma extensão simples para o Nautilus que permite copiar rapidamente o conteúdo de um arquivo de texto com um clique.",
  },

  // Decomp
  "projects.decomp.title": {
    en: "decomp",
    "pt-BR": "decomp",
  },
  "projects.decomp.description": {
    en: "A simple way to decompress files.",
    "pt-BR": "Uma maneira simples de descomprimir arquivos.",
  },

  // Reddit Auto Theme
  "projects.redditAutoTheme.title": {
    en: "Reddit Auto Theme",
    "pt-BR": "Reddit Auto Theme",
  },
  "projects.redditAutoTheme.description": {
    en: "A simple extension that syncs Reddit's theme with your system theme.",
    "pt-BR":
      "Uma extensão simples que sincroniza o tema do Reddit com o tema do seu sistema.",
  },
  // Contact
  "contact.title": {
    en: "Get In Touch",
    "pt-BR": "Entre em Contato",
  },
  "contact.subtitle": {
    en: "Have a project in mind or just want to say hello? Feel free to reach out!",
    "pt-BR":
      "Tem um projeto em mente ou apenas quer dizer olá? Sinta-se à vontade para entrar em contato!",
  },
  "contact.info.title": {
    en: "Contact Information",
    "pt-BR": "Informações de Contato",
  },
  "contact.info.subtitle": {
    en: "Connect with me through these platforms",
    "pt-BR": "Conecte-se comigo através destas plataformas",
  },
  "contact.info.email": {
    en: "Email",
    "pt-BR": "E-mail",
  },
  "contact.form.title": {
    en: "Send a Message",
    "pt-BR": "Envie uma Mensagem",
  },
  "contact.form.subtitle": {
    en: "Fill out the form below and I'll get back to you as soon as possible",
    "pt-BR":
      "Preencha o formulário abaixo e eu retornarei o mais breve possível",
  },
  "contact.form.name": {
    en: "Name",
    "pt-BR": "Nome",
  },
  "contact.form.email": {
    en: "Email",
    "pt-BR": "E-mail",
  },
  "contact.form.message": {
    en: "Message",
    "pt-BR": "Mensagem",
  },
  "contact.form.submit": {
    en: "Send Message",
    "pt-BR": "Enviar Mensagem",
  },
  "contact.form.namePlaceholder": {
    en: "Your name",
    "pt-BR": "Seu nome",
  },
  "contact.form.emailPlaceholder": {
    en: "Your email",
    "pt-BR": "Seu e-mail",
  },
  "contact.form.messagePlaceholder": {
    en: "Your message",
    "pt-BR": "Sua mensagem",
  },

  // Footer
  "footer.rights": {
    en: "All rights reserved.",
    "pt-BR": "Todos os direitos reservados.",
  },

  // Language Selector
  "language.en": {
    en: "English",
    "pt-BR": "Inglês",
  },
  "language.pt-BR": {
    en: "Portuguese",
    "pt-BR": "Português",
  },
};

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  // Load saved language preference from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language;
    if (
      savedLanguage &&
      (savedLanguage === "en" || savedLanguage === "pt-BR")
    ) {
      setLanguage(savedLanguage);
    } else {
      // Try to detect browser language
      const browserLang = navigator.language;
      if (browserLang.startsWith("pt")) {
        setLanguage("pt-BR");
      }
    }
  }, []);

  // Save language preference to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  // Translation function
  const t = (key: string): string => {
    if (!translations[key]) {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }
    return translations[key][language];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
