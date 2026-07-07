import inertia from "@inertiajs/vite"
import { svelte } from "@sveltejs/vite-plugin-svelte"
import tailwindcss from "@tailwindcss/vite"
import rails from "rails-vite-plugin"
import { defineConfig } from "vite"

export default defineConfig(({ command }) => ({
  ssr: {
    // Prebuild ssr.js so we can drop node_modules from the container.
    noExternal: command === "build" ? true : undefined,
  },
  plugins: [
    svelte(),
    tailwindcss(),
    rails(),
    inertia({ ssr: "app/javascript/entrypoints/inertia.ts" }),
  ],
}))
