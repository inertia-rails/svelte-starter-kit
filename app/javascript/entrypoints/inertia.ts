import { createInertiaApp } from "@inertiajs/svelte"

import PersistentLayout from "@/layouts/persistent-layout.svelte"
import { initializeTheme } from "@/runes/use-appearance.svelte"

createInertiaApp({
  pages: "../pages",
  layout: () => PersistentLayout,
  defaults: {
    form: {
      forceIndicesArrayFormatInFormData: false,
      withAllErrors: true,
    },
    visitOptions: () => ({
      queryStringArrayFormat: "brackets",
    }),
  },
  progress: {
    color: "#4B5563",
  },
})

// This will set light / dark mode on page load...
initializeTheme()
