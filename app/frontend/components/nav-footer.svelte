<script lang="ts">
  import * as Sidebar from "@/components/ui/sidebar"
  import { type NavItem } from "@/types"

  interface Props {
    items: NavItem[]
    class?: string
  }

  let { items, class: className = "" }: Props = $props()
</script>

<Sidebar.Group class={`group-data-[collapsible=icon]:p-0 ${className}`}>
  <Sidebar.GroupContent>
    <Sidebar.Menu>
      {#each items as item (item.title)}
        <Sidebar.MenuItem>
          <Sidebar.MenuButton
            class="text-neutral-600 hover:text-neutral-800 dark:text-neutral-300 dark:hover:text-neutral-100"
          >
            {#snippet child({ props })}
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                {...props}
              >
                <item.icon />
                <span>{item.title}</span>
              </a>
            {/snippet}
          </Sidebar.MenuButton>
        </Sidebar.MenuItem>
      {/each}
    </Sidebar.Menu>
  </Sidebar.GroupContent>
</Sidebar.Group>
