<script lang="ts">
  import Breadcrumbs from "@/components/breadcrumbs.svelte"
  import { SidebarTrigger } from "@/components/ui/sidebar"
  import type { BreadcrumbItemType } from "@/types"

  interface Props {
    breadcrumbs?: BreadcrumbItemType[]
  }

  let { breadcrumbs = [] }: Props = $props()
</script>

<header
  class="border-sidebar-border/70 flex h-16 shrink-0 items-center gap-2 border-b px-6 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:px-4"
>
  <div class="flex items-center gap-2">
    <SidebarTrigger class="-ml-1" />
    {#if breadcrumbs && breadcrumbs.length > 0}
      <Breadcrumbs {breadcrumbs} />
    {/if}
  </div>
</header>
