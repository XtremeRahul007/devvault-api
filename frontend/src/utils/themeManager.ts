const STORAGE_KEY = "theme";

function initTheme() {
    const savedTheme = localStorage.getItem(STORAGE_KEY);

    if (savedTheme) {
        updateThemeIcon(savedTheme);
        return applyTheme(savedTheme);
    }
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
    applyTheme(systemTheme ? "dark" : "light");
}

function toggleTheme() {
    const currentTheme = getCurrentTheme() || "light";
    const nextTheme = currentTheme === "dark" ? "light" : "dark";

    updateThemeIcon(nextTheme);
    applyTheme(nextTheme);
    saveTheme(nextTheme);
}

function updateThemeIcon(theme: string) {
    const icon = document.getElementById("themeIcon");

    icon?.classList.toggle("svg-dark", theme === "dark");
    icon?.classList.toggle("svg-light", theme === "light");
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

export function initThemeController() {
    initTheme();
    const btn = document.getElementById("themeSwitch");
    btn?.addEventListener("click", () => toggleTheme());
}