export type Video = {
  sources: { url: string; type: string }[];
};

export type Project = {
  titleKey: string;
  descriptionKey: string;
  image?: string;
  video?: Video;
  tags: string[];
  github?: string;
  preview?: string;
  featured: boolean; // Flag to highlight key projects for job recruiters
};

export const projects: Project[] = [
  {
    titleKey: "projects.quickLofi.title",
    descriptionKey: "projects.quickLofi.description",
    video: {
      sources: [
        {
          url: "https://github.com/EuCaue/gnome-shell-extension-quick-lofi/assets/69485603/351f34da-023c-4b28-94d6-b49ca83aa34d",
          type: "webm",
        },
      ],
    },
    tags: ["JavaScript", "TypeScript", "OOP", "GNOME Shell", "CSS3", "ESBuild", "Git"],
    github: "https://github.com/EuCaue/quick-lofi",
    featured: true,
  },
  {
    titleKey: "projects.flexa.title",
    descriptionKey: "projects.flexa.description",
    video: {
      sources: [
        {
          url: "/flexa.mp4",
          type: "mp4",
        },
      ],
    },
    tags: ["Python", "GTK4", "LibAdwaita", "Meson", "Flatpak", "RPM", "GNOME", "Open Source"],
    github: "https://github.com/EuCaue/flexa",
    featured: true,
  },
  {
    titleKey: "projects.pixDonation.title",
    descriptionKey: "projects.pixDonation.description",
    video: {
      sources: [
        {
          url: "/pix-donation.mp4",
          type: "mp4",
        },
      ],
    },
    tags: ["HTML5", "CSS3", "JavaScript", "Kanban", "Git", "Github"],
    featured: true,
  },
  {
    titleKey: "projects.scrolled.title",
    descriptionKey: "projects.scrolled.description",
    video: {
      sources: [
        {
          url: "/scrolled.mp4",
          type: "mp4",
        },
      ],
    },
    tags: [
      "HTML5",
      "CSS3",
      "TailwindCSS",
      "TypeScript",
      "Rollup",
      "Browser Extension",
      "Web Extension",
      "Firefox Add-on",
    ],
    featured: true,
  },
  {
    titleKey: "projects.feedPet.title",
    descriptionKey: "projects.feedPet.description",
    image: "/feed-pet.png",
    tags: [
      "TypeScript",
      "ReactJS",
      "Next.js",
      "TailwindCSS",
      "SupaBase",
      "PostgreSQL",
      "shadcn/ui",
    ],
    featured: true,
  },
  {
    titleKey: "projects.cssCursorGallery.title",
    descriptionKey: "projects.cssCursorGallery.description",
    video: {
      sources: [
        {
          url: "https://github.com/user-attachments/assets/9407b33c-5f1b-4e89-92ca-332cd34565d6",
          type: "mp4",
        },
      ],
    },
    tags: ["HTML5", "CSS3", "JavaScript", "GitHub", "GitHub Pages", "Glassmorphism"],
    featured: false,
  },
  {
    titleKey: "projects.myMovies.title",
    descriptionKey: "projects.myMovies.description",
    image: "https://github.com/EuCaue/my-movies/blob/master/app.png?raw=true",
    tags: [
      "Python",
      "Django",
      "TypeScript",
      "React",
      "React Hook Form",
      "Next.js",
      "Auth.js",
      "Zod",
      "Vercel",
      "Git",
    ],
    github: "https://github.com/EuCaue/my-movies",
    preview: "https://my-movies-frontend-five.vercel.app/",
    featured: false,
  },
  {
    titleKey: "projects.redditAutoTheme.title",
    descriptionKey: "projects.redditAutoTheme.description",
    video: {
      sources: [{ type: "mp4", url: "/reddit-auto-theme.mp4" }],
    },
    tags: [
      "JavaScript",
      "Browser Extension",
      "Web Extension",
      "Firefox Add-on",
      "Dark Mode",
      "Light Mode",
      "Theme Sync",
      "DOM",
      "Web API",
      "Open Source",
    ],
    github: "https://github.com/EuCaue/reddit-auto-theme/",
    preview:
      "https://addons.mozilla.org/en-US/firefox/addon/reddit-auto-theme/?utm_content=addons-manager-reviews-link&utm_medium=firefox-browser&utm_source=firefox-browser",
    featured: false,
  },
  {
    titleKey: "projects.urlShort.title",
    descriptionKey: "projects.urlShort.description",
    image: "https://github.com/EuCaue/url-short/blob/master/app.png?raw=true",
    tags: ["TypeScript", "React", "Next.js", "TailwindCSS", "Git"],
    github: "https://github.com/EuCaue/url-short",
    preview: "https://url-short-omega.vercel.app/",
    featured: false,
  },
  {
    titleKey: "projects.snapTheWeb.title",
    descriptionKey: "projects.snapTheWeb.description",
    image: "https://github.com/EuCaue/snap-the-web/blob/master/preview.png?raw=true",
    tags: ["Angular", "PrimeNG", "TypeScript", "HTML5", "CSS3", "REST API"],
    github: "https://github.com/EuCaue/snap-the-web",
    preview: "https://snap-the-web.vercel.app/",
    featured: false,
  },
  {
    titleKey: "projects.getCat.title",
    descriptionKey: "projects.getCat.description",
    image: "/get-cat.png",
    tags: ["HTML5", "CSS3", "JavaScript", "TypeScript", "React", "Next.js"],
    github: "https://github.com/EuCaue/get-cat",
    preview: "https://get-cat.vercel.app/",
    featured: false,
  },
  {
    titleKey: "projects.nautilusCopy.title",
    descriptionKey: "projects.nautilusCopy.description",
    image: "/nautilus-extension-copy-file-contents.png",
    tags: ["Python", "Nautilus API", "Make"],
    github: "https://github.com/EuCaue/nautilus-extension-copy-file-contents",
    featured: false,
  },
  {
    titleKey: "projects.decomp.title",
    descriptionKey: "projects.decomp.description",
    tags: ["Node.js", "TypeScript", "Jest", "CLI"],
    github: "https://github.com/EuCaue/decomp",
    featured: false,
  },
];
