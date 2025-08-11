<script lang="ts">
  import type { Snippet } from "svelte"

  // import AppLayout from "@/layouts/app/app-sidebar-layout.svelte"
  import AppLayout from "@/layouts/app/app-header-layout.svelte"
  import type { BreadcrumbItemType } from "@/types"

  interface Props {
    breadcrumbs?: BreadcrumbItemType[]
    children: Snippet
  }

  let { breadcrumbs = [], children }: Props = $props()
</script>

<AppLayout {breadcrumbs}>
  {@render children()}
</AppLayout>
