<script lang="ts">
  import { page } from "@inertiajs/svelte"
  import { ChevronsUpDown } from "@lucide/svelte"

  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
  } from "@/components/ui/sidebar"
  import UserInfo from "@/components/user-info.svelte"
  import UserMenuContent from "@/components/user-menu-content.svelte"
  import { type User } from "@/types"

  const auth = $derived(
    $page.props.auth as { user: User; session: { id: string } },
  )
  const { isMobile, state } = useSidebar()
</script>

<SidebarMenu>
  <SidebarMenuItem>
    <DropdownMenu>
      <DropdownMenuTrigger>
        {#snippet child({ props })}
          <SidebarMenuButton
            {...props}
            size="lg"
            class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          >
            <UserInfo user={auth.user} />
            <ChevronsUpDown class="ml-auto size-4" />
          </SidebarMenuButton>
        {/snippet}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        class="w-(--reka-dropdown-menu-trigger-width) min-w-56 rounded-lg"
        side={isMobile ? "bottom" : state === "collapsed" ? "left" : "bottom"}
        align="end"
        sideOffset={4}
      >
        <UserMenuContent {auth} />
      </DropdownMenuContent>
    </DropdownMenu>
  </SidebarMenuItem>
</SidebarMenu>
