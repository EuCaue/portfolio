// Real content copied from src/locales/en.ts and src/data/projects.ts
window.PROJECTS = [
  { name: "Quick Lofi", featured: true, desc: "A GNOME Shell extension enabling one-click Lo-fi playback. Lightweight, seamlessly integrated, reached over 10,000 downloads on the official GNOME extensions store.", video: "https://github.com/EuCaue/gnome-shell-extension-quick-lofi/assets/69485603/351f34da-023c-4b28-94d6-b49ca83aa34d", tags: ["JavaScript", "TypeScript", "OOP", "GNOME Shell", "CSS3", "ESBuild", "Git"], github: "https://github.com/EuCaue/quick-lofi", preview: "https://extensions.gnome.org/extension/6904/quick-lofi/" },
  { name: "Flexa", featured: true, desc: "A native GNOME app for converting Windows cursor themes to Linux format. Built with Python, GTK4, and LibAdwaita, with automated CI/CD pipelines via GitHub Actions for Flatpak and RPM packaging.", video: "public/flexa.mp4", tags: ["Python", "GTK4", "LibAdwaita", "Meson", "Flatpak", "RPM", "GNOME", "Open Source"], github: "https://github.com/EuCaue/flexa" },
  { name: "Auto Volume", featured: true, desc: "A React Native mobile utility that prevents hearing damage by automatically lowering the volume when headphones connect. Runs invisibly in the background with persistent OS notifications. Built with React Native (Expo).", tags: ["React Native", "Expo", "TypeScript", "Mobile", "Background Processing"], github: "https://github.com/EuCaue/auto-volume" },
  { name: "Scrolled", featured: true, desc: "Scrolled is a lightweight Firefox extension that adds a subtle scroll indicator to show how much of a page you've read. Perfect for readers, researchers, or anyone who wants better visual feedback while browsing long content.", video: "public/scrolled.mp4", tags: ["HTML5", "CSS3", "TailwindCSS", "TypeScript", "Rollup", "Browser Extension", "Web Extension", "Firefox Add-on"], github: "https://github.com/EuCaue/scrolled", preview: "https://addons.mozilla.org/en-US/firefox/addon/scrolled/" },
  { name: "PIX Donation System", featured: true, desc: "A simple and fast web page that generates PIX QR Codes for donations. Includes state and city selection, dynamic values, and a complete BR Code generator built in pure JavaScript.", video: "public/pix-donation.mp4", tags: ["HTML5", "CSS3", "JavaScript", "Kanban", "Git", "Github"] },
  { name: "Harbor", featured: true, desc: "A file organizer daemon that watches folders and moves files based on rules for extension, MIME type, size, and date. Built in Rust with native threads and no async runtime, it waits for downloads to finish, handles collisions and cross-device moves, and reloads config live.", image: "public/harbor.gif", tags: ["Rust", "CLI", "Daemon", "File Watcher", "Automation"], github: "https://github.com/EuCaue/harbor" },
  { name: "Feed Pet", desc: "A simple web app built with Next.js and shadcn/ui to help users track their pets' feeding times. Created to avoid confusion at home and ensure that every pet is fed on time, with a clean and intuitive interface.", image: "public/feed-pet.png", tags: ["TypeScript", "ReactJS", "Next.js", "TailwindCSS", "SupaBase", "PostgreSQL", "shadcn/ui"], github: "https://github.com/EuCaue/feed-pet" },
  { name: "CSS Cursor Gallery", desc: "An experimental project that interactively showcases all available CSS cursors. Built with HTML5, modern CSS (including :is, light-dark(), backdrop-filter, CSS Nesting and glassmorphism) and Vanilla JavaScript. Users can explore, search for specific cursors, and copy the CSS value with a single click.", video: "https://github.com/user-attachments/assets/9407b33c-5f1b-4e89-92ca-332cd34565d6", tags: ["HTML5", "CSS3", "JavaScript", "GitHub", "GitHub Pages", "Glassmorphism"] },
  { name: "My Movies", desc: "A web app to help you organize your movie list in a practical and modern way. The goal is to make managing your movies simple and intuitive, with a robust structure that ensures top-notch security and performance.", image: "https://raw.githubusercontent.com/EuCaue/my-movies/master/app.png", tags: ["Python", "Django", "TypeScript", "React", "React Hook Form", "Next.js", "Auth.js", "Zod", "Vercel", "Git"], github: "https://github.com/EuCaue/my-movies", preview: "https://my-movies-frontend-five.vercel.app/" },
  { name: "Reddit Auto Theme", desc: "A simple extension that syncs Reddit's theme with your system theme.", video: "public/reddit-auto-theme.mp4", tags: ["JavaScript", "Browser Extension", "Web Extension", "Firefox Add-on", "Dark Mode", "Light Mode", "Theme Sync", "DOM", "Web API", "Open Source"], github: "https://github.com/EuCaue/reddit-auto-theme/", preview: "https://addons.mozilla.org/en-US/firefox/addon/reddit-auto-theme/" },
  { name: "URL Short", desc: "A web application that allows users to shorten URLs quickly and securely. Focused on delivering a hassle-free experience, the app ensures efficiency and simplicity in URL management.", image: "https://raw.githubusercontent.com/EuCaue/url-short/master/app.png", tags: ["TypeScript", "React", "Next.js", "TailwindCSS", "Git"], github: "https://github.com/EuCaue/url-short", preview: "https://url-short-omega.vercel.app/" },
  { name: "Snap The Web", desc: "A web app that lets users capture screenshots of websites effortlessly. With a focus on usability, the application offers a straightforward, customizable solution for taking browser-based screenshots.", image: "https://raw.githubusercontent.com/EuCaue/snap-the-web/master/preview.png", tags: ["Angular", "PrimeNG", "TypeScript", "HTML5", "CSS3", "REST API"], github: "https://github.com/EuCaue/snap-the-web", preview: "https://snap-the-web.vercel.app/" },
  { name: "Get Cat", desc: "A fun app that displays random photos and facts about cats. Focused on simplicity and user experience, the app provides a pleasant and uncomplicated interaction.", image: "public/get-cat.png", tags: ["HTML5", "CSS3", "JavaScript", "TypeScript", "React", "Next.js"], github: "https://github.com/EuCaue/get-cat", preview: "https://get-cat.vercel.app/" },
  { name: "Nautilus Copy File Contents", desc: "A simple extension for Nautilus that lets you quickly copy the contents of a text file with one click.", image: "public/nautilus-extension-copy-file-contents.png", tags: ["Python", "Nautilus API", "Make"], github: "https://github.com/EuCaue/nautilus-extension-copy-file-contents" },
  { name: "decomp", desc: "A simple way to decompress files.", tags: ["Node.js", "TypeScript", "Jest", "CLI"], github: "https://github.com/EuCaue/decomp" },
];

window.SKILLS = [
  ["Languages", ["TypeScript", "JavaScript", "Python", "Shell Script"]],
  ["Frontend", ["React", "React Native", "Next.js", "Angular", "Tailwind CSS", "HTML5", "CSS3", "Accessibility"]],
  ["Desktop & Backend", ["GTK/LibAdwaita", "Node.js", "Django", "PostgreSQL", "SupaBase"]],
  ["Tools & Workflow", ["Git", "GitHub Actions", "Linux", "UI/UX Design", "Meson", "Flatpak"]],
];

window.media = (p, cls = "") => {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (p.video) return `<video class="${cls}" src="${p.video}" muted loop playsinline preload="metadata" ${reduce ? "" : "autoplay"} aria-label="${p.name} demo"></video>`;
  if (p.image) return `<img class="${cls}" src="${p.image}" alt="${p.name} screenshot" loading="lazy">`;
  return "";
};

window.toggleTheme = () => {
  const r = document.documentElement;
  const dark = r.dataset.theme ? r.dataset.theme === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
  r.dataset.theme = dark ? "light" : "dark";
};

// Platform derived from each project's own tags and description.
const PLATFORM = { "Quick Lofi": "GNOME", "Flexa": "GNOME", "Auto Volume": "Mobile", "Scrolled": "Firefox", "PIX Donation System": "Web", "Harbor": "CLI", "Feed Pet": "Web", "CSS Cursor Gallery": "Web", "My Movies": "Web", "Reddit Auto Theme": "Firefox", "URL Short": "Web", "Snap The Web": "Web", "Get Cat": "Web", "Nautilus Copy File Contents": "GNOME", "decomp": "CLI" };
PROJECTS.forEach(p => (p.platform = PLATFORM[p.name]));
