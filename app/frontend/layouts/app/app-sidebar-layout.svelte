<script lang="ts">
  import type { Snippet } from "svelte"

  import AppContent from "@/components/app-content.svelte"
  import AppShell from "@/components/app-shell.svelte"
  import AppSidebarHeader from "@/components/app-sidebar-header.svelte"
  import AppSidebar from "@/components/app-sidebar.svelte"
  import type { BreadcrumbItemType } from "@/types"

  interface Props {
    breadcrumbs?: BreadcrumbItemType[]
    children: Snippet
  }

  let { breadcrumbs = [], children }: Props = $props()
</script>

<AppShell variant="sidebar">
  <AppSidebar />
  <AppContent variant="sidebar" class="overflow-x-hidden">
    <AppSidebarHeader {breadcrumbs} />
    {@render children()}
  </AppContent>
</AppShell>
