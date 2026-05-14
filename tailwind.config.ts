import type { Config } from "tailwindcss";
export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        primary: "#1C1C1E",
        tint: "#007AFF",
        info: "#007AFF",
        error: "#D9000C",
        success: "#35C759",
        warning: "#FFCC00",
        separator: "#C6C6C8",
        secondary: "#F3F3F6",
        tertiary: "#EFEFF4",
        hover: "#0000001A",
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
