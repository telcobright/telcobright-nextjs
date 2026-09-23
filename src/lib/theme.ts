/**
 * The theme bootstrap.
 *
 * This runs as a blocking inline script before the page paints, so the saved
 * theme is on `<html>` by the time the first pixel is drawn — no flash of the
 * wrong background. It has to be a string rather than a module because it must
 * execute ahead of hydration, and it is written defensively: private mode can
 * make `localStorage` throw, in which case the system preference still wins and
 * the site still renders.
 *
 * Keep the key in sync with ThemeToggle.
 */
export const THEME_STORAGE_KEY = 'tb-theme';

export const themeScript = `(function(){try{var k=${JSON.stringify(THEME_STORAGE_KEY)};var s=localStorage.getItem(k);var d=window.matchMedia("(prefers-color-scheme: dark)").matches;document.documentElement.dataset.theme=(s==="light"||s==="dark")?s:(d?"dark":"light");}catch(e){document.documentElement.dataset.theme="light";}})();`;
