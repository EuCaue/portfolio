export const en = {
  "nav.home": "Home",
  "nav.about": "About",
  "nav.projects": "Projects",
  "nav.contact": "Contact",
  "nav.resume": "Resume",
  "nav.resumeUrl": "/api/resume/en",

  "intro.hello": "Hello, I'm",
  "intro.role": "Software Engineer",
  "intro.location": "Salvador, Brazil",
  "intro.description":
    "Software Engineer passionate about building complete digital solutions from web and mobile applications to native desktop integrations and system-level tooling.",
  "intro.viewWork": "View My Work",
  "intro.getInTouch": "Get In Touch",
  "intro.scrollDown": "Scroll Down",
  "intro.downloadCv": "Download CV",

  "about.title": "About Me",
  "about.paragraph1":
    "I'm a software engineer who enjoys working across different layers of technology. My experience spans modern, responsive interfaces for web and mobile (React, Next.js, React Native) all the way to native desktop applications and system extensions for Linux/GNOME built with Python and JavaScript.",
  "about.paragraph2":
    "I believe in using technology to solve real-world problems simply and efficiently. I combine technical rigor, sound design principles, and smart automation in my daily workflow to build experiences that are robust under the hood and seamless for the user.",
  "about.skills": "My Skills",
  "about.visual.development": "Development",
  "about.visual.cli": "CLI Tools",
  "about.visual.design": "Design",
  "about.visual.architecture": "Architecture",
  "skills.languages": "Languages",
  "skills.frontend": "Frontend",
  "skills.desktopBackend": "Desktop & Backend",
  "skills.tools": "Tools & Workflow",

  "projects.title": "Projects",
  "projects.subtitle":
    "Here are some of my recent projects. Each one was built with a focus on solving real problems with clean, efficient code.",
  "projects.github": "GitHub",
  "projects.liveDemo": "Live Demo",
  "projects.featured": "Featured Projects",
  "projects.other": "Other Projects",
  "projects.openPreview": "Open preview",

  "projects.flexa.title": "Flexa",
  "projects.flexa.description":
    "A native GNOME app for converting Windows cursor themes to Linux format. Built with Python, GTK4, and LibAdwaita, with automated CI/CD pipelines via GitHub Actions for Flatpak and RPM packaging.",

  "projects.quickLofi.title": "Quick Lofi",
  "projects.quickLofi.description":
    "A GNOME Shell extension enabling one-click Lo-fi playback. Lightweight, seamlessly integrated — reached over 10,000 downloads on the official GNOME extensions store.",

  "projects.autoVolume.title": "Auto Volume",
  "projects.autoVolume.description":
    "A React Native mobile utility that prevents hearing damage by automatically lowering the volume when headphones connect. Runs invisibly in the background with persistent OS notifications. Built with React Native (Expo).",

  "projects.pixDonation.title": "PIX Donation System",
  "projects.pixDonation.description":
    "A simple and fast web page that generates PIX QR Codes for donations. Includes state and city selection, dynamic values, and a complete BR Code generator built in pure JavaScript.",

  "projects.scrolled.title": "Scrolled",
  "projects.scrolled.description":
    "Scrolled is a lightweight Firefox extension that adds a subtle scroll indicator to show how much of a page you've read. Perfect for readers, researchers, or anyone who wants better visual feedback while browsing long content.",

  "projects.feedPet.title": "Feed Pet",
  "projects.feedPet.description":
    "A simple web app built with Next.js and shadcn/ui to help users track their pets' feeding times. Created to avoid confusion at home and ensure that every pet is fed on time, with a clean and intuitive interface.",

  "projects.cssCursorGallery.title": "CSS Cursor Gallery",
  "projects.cssCursorGallery.description":
    "An experimental project that interactively showcases all available CSS cursors. Built with HTML5, modern CSS (including :is, light-dark(), backdrop-filter, CSS Nesting and glassmorphism) and Vanilla JavaScript. Users can explore, search for specific cursors, and copy the CSS value with a single click.",

  "projects.myMovies.title": "My Movies",
  "projects.myMovies.description":
    "A web app to help you organize your movie list in a practical and modern way. The goal is to make managing your movies simple and intuitive, with a robust structure that ensures top-notch security and performance.",

  "projects.urlShort.title": "URL Short",
  "projects.urlShort.description":
    "A web application that allows users to shorten URLs quickly and securely. Focused on delivering a hassle-free experience, the app ensures efficiency and simplicity in URL management.",

  "projects.snapTheWeb.title": "Snap The Web",
  "projects.snapTheWeb.description":
    "A web app that lets users capture screenshots of websites effortlessly. With a focus on usability, the application offers a straightforward, customizable solution for taking browser-based screenshots.",

  "projects.getCat.title": "Get Cat",
  "projects.getCat.description":
    "A fun app that displays random photos and facts about cats. Focused on simplicity and user experience, the app provides a pleasant and uncomplicated interaction.",

  "projects.nautilusCopy.title": "Nautilus Copy File Contents",
  "projects.nautilusCopy.description":
    "A simple extension for Nautilus that lets you quickly copy the contents of a text file with one click.",

  "projects.decomp.title": "decomp",
  "projects.decomp.description": "A simple way to decompress files.",

  "projects.redditAutoTheme.title": "Reddit Auto Theme",
  "projects.redditAutoTheme.description":
    "A simple extension that syncs Reddit's theme with your system theme.",

  "contact.title": "Get In Touch",
  "contact.subtitle": "Have a project in mind or just want to say hello? Feel free to reach out!",
  "contact.info.title": "Contact Information",
  "contact.info.subtitle": "Connect with me through these platforms",
  "contact.info.email": "Email",
  "contact.form.title": "Send a Message",
  "contact.form.subtitle": "Fill out the form below and I'll get back to you as soon as possible",
  "contact.form.name": "Name",
  "contact.form.email": "Email",
  "contact.form.message": "Message",
  "contact.form.submit": "Send Message",
  "contact.form.sending": "Sending...",
  "contact.form.namePlaceholder": "Your name",
  "contact.form.emailPlaceholder": "Your email",
  "contact.form.messagePlaceholder": "Your message",
  "contact.form.success": "Your message has been sent! I'll get back to you soon.",
  "contact.form.error": "Failed to send your message. Please try again later.",
  "contact.form.error.name": "Name must be at least 2 characters",
  "contact.form.error.email": "Please enter a valid email address",
  "contact.form.error.message": "Message must be at least 10 characters",
  "contact.form.toast.success": "Success",
  "contact.form.toast.error": "Error",

  "footer.rights": "All rights reserved.",
  "footer.resume": "Resume",

  "language.en": "English",
  "language.pt-BR": "Portuguese",
};

export type TranslationKeys = keyof typeof en;
