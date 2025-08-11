<script lang="ts">
  import { Link } from "@inertiajs/svelte"

  import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb"

  interface BreadcrumbItemType {
    title: string
    href?: string
  }

  interface Props {
    breadcrumbs: BreadcrumbItemType[]
  }

  let { breadcrumbs }: Props = $props()
</script>

<Breadcrumb>
  <BreadcrumbList>
    {#each breadcrumbs as item, index (index)}
      <BreadcrumbItem>
        {#if index === breadcrumbs.length - 1}
          <BreadcrumbPage>{item.title}</BreadcrumbPage>
        {:else}
          <BreadcrumbLink>
            {#snippet child({ props })}
              <Link {...props} href={item.href ?? "#"}>{item.title}</Link>
            {/snippet}
          </BreadcrumbLink>
        {/if}
      </BreadcrumbItem>
      {#if index !== breadcrumbs.length - 1}
        <BreadcrumbSeparator />
      {/if}
    {/each}
  </BreadcrumbList>
</Breadcrumb>
