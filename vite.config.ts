import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	// Required for GitHub "project pages" (repos not named <username>.github.io).
	// Your site lives at https://shannonteohclub.github.io/sixin/ — this tells
	// Vite to prefix all asset URLs with /sixin/ so they load correctly.
	base: '/sixin/',
	plugins: [
		sveltekit({
			compilerOptions: {
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},

			adapter: adapter({
				// GitHub Pages serves your site from a subdirectory when using a project page
				// (e.g. https://username.github.io/repo-name). Set `pages` and `assets` to
				// "build" — that's the folder GitHub Actions will upload.
				pages: 'build',
				assets: 'build',
				fallback: '404.html',
				precompress: false,
				strict: false
			})
		})
	]
});
