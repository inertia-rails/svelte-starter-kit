<script lang="ts">
  import { inertia } from "@inertiajs/svelte"
  import type { Snippet } from "svelte"

  import AppLogoIcon from "@/components/app-logo-icon.svelte"
  import { rootPath } from "@/routes"

  interface Props {
    title?: string
    description?: string
    children: Snippet
  }

  let { title, description, children }: Props = $props()
</script>

<div
  class="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10"
>
  <div class="w-full max-w-sm">
    <div class="flex flex-col gap-8">
      <div class="flex flex-col items-center gap-4">
        <a
          href={rootPath()}
          use:inertia
          class="flex flex-col items-center gap-2 font-medium"
        >
          <div class="mb-1 flex size-14 items-center justify-center rounded-md">
            <AppLogoIcon
              class="size-14 fill-current text-[var(--foreground)] dark:text-white"
            />
          </div>
          <span class="sr-only">{title}</span>
        </a>
        <div class="space-y-2 text-center">
          <h1 class="text-xl font-medium">{title}</h1>
          <p class="text-muted-foreground text-center text-sm">
            {description}
          </p>
        </div>
      </div>
      {@render children()}
    </div>
  </div>
</div>
