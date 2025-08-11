<script lang="ts">
  import type { Snippet } from "svelte"

  import AppContent from "@/components/app-content.svelte"
  import AppHeader from "@/components/app-header.svelte"
  import AppShell from "@/components/app-shell.svelte"
  import type { BreadcrumbItemType } from "@/types"

  interface Props {
    breadcrumbs?: BreadcrumbItemType[]
    children: Snippet
  }

  let { breadcrumbs = [], children }: Props = $props()
</script>

<AppShell class="flex-col">
  <AppHeader {breadcrumbs} />
  <AppContent>
    {@render children()}
  </AppContent>
</AppShell>
