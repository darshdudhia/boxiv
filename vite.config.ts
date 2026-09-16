import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, type Plugin } from 'vite';
import { generateCompetitionsData } from './src/lib/pregen/generate-competitions-data';

/**
 * Regenerates src/lib/pregen/competitions-data.json and site-config.json
 * from static/boxiv/**\/*.yaml at the start of every dev server run and
 * every build. This replaces the old manual `bun run pregen` step, so the
 * data is always in sync no matter which package manager / CI environment
 * invokes `vite dev` or `vite build`.
 */
function pregenPlugin(): Plugin {
	return {
		name: 'pregen-competitions-data',
		// Runs once when the dev server starts and once per production build,
		// before any module (including the competitions-data.json import) is
		// processed.
		buildStart() {
			generateCompetitionsData();
		}
	};
}

export default defineConfig({ plugins: [pregenPlugin(), tailwindcss(), sveltekit()] });