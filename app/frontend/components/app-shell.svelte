<script lang="ts">
  import type { Snippet } from "svelte"

  import { SidebarProvider } from "@/components/ui/sidebar"
  import { cn } from "@/utils"

  interface Props {
    variant?: "header" | "sidebar"
    children: Snippet
    class?: string
  }

  let { variant, children, class: className }: Props = $props()

  let isOpen = $state<boolean>(
    typeof window !== "undefined"
      ? localStorage.getItem("sidebar") !== "false"
      : true,
  )

  function handleSidebarChange(open: boolean) {
    isOpen = open

    if (typeof window !== "undefined") {
      localStorage.setItem("sidebar", String(open))
    }
  }
</script>

{#if variant === "header"}
  <div class={cn("flex min-h-screen w-full flex-col", className)}>
    {@render children()}
  </div>
{:else}
  <SidebarProvider
    class={className}
    open={isOpen}
    onOpenChange={handleSidebarChange}
  >
    {@render children()}
  </SidebarProvider>
{/if}
