import { sveltekit } from '@sveltejs/kit/vite';
import path from 'path'

/** @type {import('vite').UserConfig} */
const config = {
  server: {
    fs: {
      allow: ['.'],
    },
  },
	plugins: [sveltekit()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'), 
    },
  },
};

export default config;