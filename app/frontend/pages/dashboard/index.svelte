<script lang="ts">
  // import { Head } from "@inertiajs/svelte"

  import PlaceholderPattern from "@/components/placeholder-pattern.svelte"
  import AppLayout from "@/layouts/app-layout.svelte"
  import { dashboardPath } from "@/routes"
  import { type BreadcrumbItem } from "@/types"

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: "Dashboard",
      href: dashboardPath(),
    },
  ]
</script>

<svelte:head>
  <title>{breadcrumbs[breadcrumbs.length - 1].title}</title>
</svelte:head>

<AppLayout {breadcrumbs}>
  <div class="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
    <div class="grid auto-rows-min gap-4 md:grid-cols-3">
      <div
        class="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border"
      >
        <PlaceholderPattern />
      </div>
      <div
        class="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border"
      >
        <PlaceholderPattern />
      </div>
      <div
        class="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border"
      >
        <PlaceholderPattern />
      </div>
    </div>
    <div
      class="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 rounded-xl border md:min-h-min"
    >
      <PlaceholderPattern />
    </div>
  </div>
</AppLayout>
