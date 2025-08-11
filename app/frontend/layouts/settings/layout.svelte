<script lang="ts">
  import { Link, page } from "@inertiajs/svelte"
  import type { Snippet } from "svelte"

  import Heading from "@/components/heading.svelte"
  import { Button } from "@/components/ui/button"
  import { Separator } from "@/components/ui/separator"
  import {
    settingsAppearancePath,
    settingsEmailPath,
    settingsPasswordPath,
    settingsProfilePath,
    settingsSessionsPath,
  } from "@/routes"
  import { type NavItem } from "@/types"

  interface Props {
    children: Snippet
  }

  let { children }: Props = $props()

  const sidebarNavItems: NavItem[] = [
    {
      title: "Profile",
      href: settingsProfilePath(),
    },
    {
      title: "Email",
      href: settingsEmailPath(),
    },
    {
      title: "Password",
      href: settingsPasswordPath(),
    },
    {
      title: "Sessions",
      href: settingsSessionsPath(),
    },
    {
      title: "Appearance",
      href: settingsAppearancePath(),
    },
  ]
</script>

<div class="px-4 py-6">
  <Heading
    title="Settings"
    description="Manage your profile and account settings"
  />

  <div class="flex flex-col lg:flex-row lg:space-x-12">
    <aside class="w-full max-w-xl lg:w-48">
      <nav class="flex flex-col space-y-1 space-x-0">
        {#each sidebarNavItems as item (item.href)}
          <Button
            variant="ghost"
            class="w-full justify-start {$page.url === item.href
              ? 'bg-muted'
              : ''}"
          >
            <Link href={item.href} class="flex w-full items-start">
              {item.title}
            </Link>
          </Button>
        {/each}
      </nav>
    </aside>

    <Separator class="my-6 lg:hidden" />

    <div class="flex-1 md:max-w-2xl">
      <section class="max-w-xl space-y-12">
        {@render children()}
      </section>
    </div>
  </div>
</div>
