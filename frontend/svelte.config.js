// Change from adapter-auto to adapter-static
import adapter from '@sveltejs/adapter-static';
// Other imports may be present depending on your template.
import preprocess from "svelte-preprocess";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // SvelteKit's section:
  kit: {
    adapter: adapter({
      // Static needs a fallback page.
      fallback: 'index.html'
    })
  },
  // (Vite's section):
  // Others:
  preprocess: [
    preprocess({
      postcss: true,
    }),
  ],
}

export default config;