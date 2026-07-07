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
  class="relative grid h-dvh flex-col items-center justify-center px-8 sm:px-0 lg:max-w-none lg:grid-cols-2 lg:px-0"
>
  <div
    class="bg-muted relative hidden h-full flex-col p-10 text-white lg:flex dark:border-r"
  >
    <div class="absolute inset-0 bg-zinc-900"></div>
    <a
      href={rootPath()}
      use:inertia
      class="relative z-20 flex items-center text-lg font-medium"
    >
      <AppLogoIcon class="mr-2 size-8 fill-current text-white" />
      {import.meta.env.VITE_APP_NAME ?? "Svelte Starter Kit"}
    </a>
    <div class="relative z-20 mt-auto">
      <blockquote class="space-y-2">
        <p class="text-lg">
          &ldquo;The One Person Framework. A toolkit so powerful that it allows
          a single individual to create modern applications upon which they
          might build a competitive business.&rdquo;
        </p>
        <footer class="text-sm text-neutral-300">DHH</footer>
      </blockquote>
    </div>
  </div>
  <div class="lg:p-8">
    <div
      class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]"
    >
      <div class="flex flex-col space-y-2 text-center">
        {#if title}
          <h1 class="text-xl font-medium tracking-tight">
            {title}
          </h1>
        {/if}
        {#if description}
          <p class="text-muted-foreground text-sm">
            {description}
          </p>
        {/if}
      </div>
      {@render children()}
    </div>
  </div>
</div>
