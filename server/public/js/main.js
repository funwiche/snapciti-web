function GET_COOKIE(name) {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  if (!match) return null;
  const value = decodeURIComponent(match[2].trim());
  if (/^(\{.*\}|\[.*\])$/.test(value)) return JSON.parse(value);
  return value;
}
function SET_COOKIE(name, value) {
  if (typeof value === "object") value = JSON.stringify(value);
  value = encodeURIComponent(value);
  document.cookie = `${name}=${value}; max-age=31536000; path=/;`;
}
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", setTheme);
function setTheme() {
  const mode = GET_COOKIE("color_mode");
  const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  if ((!mode && isDark) || (mode == "system" && isDark) || mode == "dark") {
    setThemeColor("#000000");
    document.documentElement.classList.add("dark");
    document.documentElement.style.setProperty("color-scheme", "dark");
    if (!mode) SET_COOKIE("color_mode", "system");
  } else {
    setThemeColor("#ffffff");
    document.documentElement.classList.remove("dark");
    document.documentElement.style.setProperty("color-scheme", "light");
  }
}
function setThemeColor(color) {
  let themeColorMeta = document.querySelector("meta[name='theme-color']");
  if (!themeColorMeta) {
    themeColorMeta = document.createElement("meta");
    themeColorMeta.setAttribute("name", "theme-color");
    document.head.appendChild(themeColorMeta);
  }
  themeColorMeta.setAttribute("content", color);
}
if (!GET_COOKIE("radius")) SET_COOKIE("radius", 50000);
setTheme();
