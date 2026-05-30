import type { Config } from "tailwindcss";
import tailwindcolors from "tailwindcss/colors";
let colors: any = tailwindcolors;
delete colors["lightBlue"];
delete colors["warmGray"];
delete colors["trueGray"];
delete colors["coolGray"];
delete colors["blueGray"];

export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        ...colors,
        tint: "rgb(var(--color-tint) / <alpha-value>)",
        info: "rgb(var(--color-info) / <alpha-value>)",
        error: "rgb(var(--color-error) / <alpha-value>)",
        accent: "rgb(var(--color-accent) / <alpha-value>)",
        primary: "rgb(var(--color-primary) / <alpha-value>)",
        success: "rgb(var(--color-success) / <alpha-value>)",
        warning: "rgb(var(--color-warning) / <alpha-value>)",
        secondary: "rgb(var(--color-secondary) / <alpha-value>)",
        main: "rgb(var(--color-main) / <alpha-value>)",
        separator: "rgb(var(--color-separator) / <alpha-value>)",
        link: { default: "#007AFF", visited: "#800080", hover: "#005FCC" },
      },
      boxShadow: {
        alt: "0px 0px 10px rgb(var(--color-primary) / 20%)",
        inset: "inset 0 0px 10px rgb(var(--color-primary) / 20%)",
      },
      textColor: {
        default: "rgb(var(--color-primary) / 83%)",
        medium: "rgb(var(--color-primary) / 60%)",
        disabled: "rgb(var(--color-primary) / 30%)",
      },
    },
  },
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  screens: {
    xs: "380px",
    sm: "600px",
    md: "968px",
    lg: "1280px",
    xl: "1920px",
  },
};
