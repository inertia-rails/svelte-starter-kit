import { type ResolvedComponent, createInertiaApp } from "@inertiajs/svelte"
import { mount } from "svelte"

import PersistentLayout from "@/layouts/persistent-layout.svelte"
import { initializeTheme } from "@/runes/use-appearance.svelte"

createInertiaApp({
  // Disable progress bar
  //
  // see https://inertia-rails.dev/guide/progress-indicators
  // progress: false,

  resolve: (name) => {
    const pages = import.meta.glob<ResolvedComponent>("../pages/**/*.svelte", {
      eager: true,
    })
    const page = pages[`../pages/${name}.svelte`]
    if (!page) {
      console.error(`Missing Inertia page component: '${name}.svelte'`)
    }

    // To use a default layout, import the Layout component
    // and use the following line.
    // see https://inertia-rails.dev/guide/pages#default-layouts
    return {
      default: page.default,
      layout: page.layout ?? PersistentLayout,
    } as ResolvedComponent
  },

  setup({ el, App, props }) {
    if (el) {
      // Uncomment the following to enable SSR hydration:
      // if (el.dataset.serverRendered === 'true') {
      //   hydrate(App, {target: el, props})
      //   return
      // }
      mount(App, { target: el, props })
    } else {
      console.error(
        "Missing root element.\n\n" +
          "If you see this error, it probably means you load Inertia.js on non-Inertia pages.\n" +
          'Consider moving <%= vite_typescript_tag "inertia" %> to the Inertia-specific layout instead.',
      )
    }
  },
  progress: {
    color: "#4B5563",
  },
})

// This will set light / dark mode on page load...
initializeTheme()
