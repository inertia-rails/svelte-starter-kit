<script lang="ts">
  import { Link, page } from "@inertiajs/svelte"

  import * as Sidebar from "@/components/ui/sidebar"
  import type { NavItem } from "@/types"

  interface Props {
    items: NavItem[]
  }

  let { items }: Props = $props()
</script>

<Sidebar.Group class="px-2 py-0">
  <Sidebar.GroupLabel>Platform</Sidebar.GroupLabel>
  <Sidebar.Menu>
    {#each items as item (item.title)}
      <Sidebar.MenuItem>
        <Sidebar.MenuButton
          isActive={item.href === $page.url}
          tooltipContent={item.title}
        >
          {#snippet child({ props })}
            <Link href={item.href} {...props}>
              <item.icon />
              <span>{item.title}</span>
            </Link>
          {/snippet}
        </Sidebar.MenuButton>
      </Sidebar.MenuItem>
    {/each}
  </Sidebar.Menu>
</Sidebar.Group>
