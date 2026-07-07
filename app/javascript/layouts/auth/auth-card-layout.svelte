<script lang="ts">
  import { Link } from "@inertiajs/svelte"
  import type { Snippet } from "svelte"

  import AppLogoIcon from "@/components/app-logo-icon.svelte"
  import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import { home } from "@/routes"

  interface Props {
    title?: string
    description?: string
    children: Snippet
  }

  let { title, description, children }: Props = $props()
</script>

<div
  class="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10"
>
  <div class="flex w-full max-w-md flex-col gap-6">
    <Link
      href={home.index()}
      class="flex items-center gap-2 self-center font-medium"
    >
      <div class="flex h-9 w-9 items-center justify-center">
        <AppLogoIcon class="size-9 fill-current text-black dark:text-white" />
      </div>
    </Link>

    <div class="flex flex-col gap-6">
      <Card class="rounded-xl">
        <CardHeader class="px-10 pt-8 pb-0 text-center">
          <CardTitle class="text-xl">{title}</CardTitle>
          <CardDescription>
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent class="px-10 py-8">
          {@render children()}
        </CardContent>
      </Card>
    </div>
  </div>
</div>
