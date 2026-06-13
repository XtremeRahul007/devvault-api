const STORAGE_KEY = "theme";

export function initTheme() {
    const savedTheme = localStorage.getItem(STORAGE_KEY);

    if (savedTheme) {
        return applyTheme(savedTheme);
    }
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
    applyTheme(systemTheme ? "dark" : "light");
}

export function toggleTheme() {
    const currentTheme = getCurrentTheme() || "light";
    const nextTheme = currentTheme === "dark" ? "light" : "dark";

    updateThemeIcon(nextTheme);
    applyTheme(nextTheme);
    saveTheme(nextTheme);
}

function updateThemeIcon(theme: string) {
    const themeIco = document.getElementById("theme-toggle-icon");

    themeIco?.classList.toggle("icon-dark-mode", theme === "dark");
    themeIco?.classList.toggle("icon-light-mode", theme === "light");
}

function getCurrentTheme() {
    return document.documentElement.dataset.theme;
}

function applyTheme(theme: string) {
    document.documentElement.dataset.theme = theme;
}

function saveTheme(theme: string) {
    localStorage.setItem(STORAGE_KEY, theme);
}