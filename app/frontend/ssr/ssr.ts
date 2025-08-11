import { type ResolvedComponent, createInertiaApp } from "@inertiajs/svelte"
import createServer from "@inertiajs/svelte/server"
import { render } from "svelte/server"

import PersistentLayout from "@/layouts/persistent-layout.svelte"

const appName = import.meta.env.VITE_APP_NAME ?? "Svelte Starter Kit"

createServer(
  (page) =>
    createInertiaApp({
      page,
      // @ts-expect-error (waiting for @inertiajs/svelte to fix types)
      title: (title) => (title ? `${title} - ${appName}` : appName),

      resolve: (name) => {
        const pages = import.meta.glob<ResolvedComponent>(
          "../pages/**/*.svelte",
          {
            eager: true,
          },
        )
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

      setup: ({ App, props }) => render(App, { props }),
    }),
  { cluster: true },
)
