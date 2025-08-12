<script lang="ts">
  import { Link } from "@inertiajs/svelte"
  import { BookOpen, Folder, LayoutGrid } from "@lucide/svelte"

  import NavFooter from "@/components/nav-footer.svelte"
  import NavMain from "@/components/nav-main.svelte"
  import NavUser from "@/components/nav-user.svelte"
  import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
  } from "@/components/ui/sidebar"
  import { dashboardPath } from "@/routes"
  import { type NavItem } from "@/types"

  import AppLogo from "./app-logo.svelte"

  const mainNavItems: NavItem[] = [
    {
      title: "Dashboard",
      href: dashboardPath(),
      icon: LayoutGrid,
    },
  ]

  const footerNavItems: NavItem[] = [
    {
      title: "Github Repo",
      href: "https://github.com/inertia-rails/svelte-starter-kit",
      icon: Folder,
    },
    {
      title: "Documentation",
      href: "https://inertia-rails.dev",
      icon: BookOpen,
    },
  ]
</script>

<Sidebar collapsible="icon" variant="inset">
  <SidebarHeader>
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton size="lg">
          {#snippet child({ props })}
            <Link {...props} href={dashboardPath()}>
              <AppLogo />
            </Link>
          {/snippet}
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  </SidebarHeader>

  <SidebarContent>
    <NavMain items={mainNavItems} />
  </SidebarContent>

  <SidebarFooter>
    <NavFooter items={footerNavItems} />
    <NavUser />
  </SidebarFooter>
</Sidebar>
