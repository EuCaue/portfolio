import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  daisyui: {
    themes: [
      "black",
      "dark",
      "light",
      {
        mythemelight: {
          primary: "#43b3f4",

          secondary: "#7755cc",

          accent: "#201377",

          neutral: "#28212b",

          "base-100": "#f9f9f9",

          info: "#d9fca9",

          success: "#14947f",

          warning: "#c89809",

          error: "#ea5353",
        },
      },
      {
        mytheme: {
          primary: "#43b3f4",

          secondary: "#7755cc",

          accent: "#201377",

          neutral: "#28212b",

          "base-100": "#343637",

          info: "#d9fca9",

          success: "#14947f",

          warning: "#c89809",

          error: "#ea5353",
        },
      },
    ],
  },
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
export default config;
