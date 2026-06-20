// adapter-static requires every page to be prerenderable.
// Setting prerender = true here applies it to every route in the app.
// Setting ssr = false disables server-side rendering — required because
// GitHub Pages is a plain file server; there's no Node process to run SSR.
export const prerender = true;
export const ssr = false;
