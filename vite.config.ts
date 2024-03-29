import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import replace from '@rollup/plugin-replace';
import { configDotenv } from 'dotenv';
configDotenv();

export default defineConfig({
	plugins: [sveltekit(), 
		replace({
			'process.env.API_URL': JSON.stringify(process.env.API_URL),
			'process.env.API_KEY': JSON.stringify(process.env.API_KEY),
		  }),],
});
