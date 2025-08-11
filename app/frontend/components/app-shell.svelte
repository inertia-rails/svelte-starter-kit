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
</script>

{#if variant === "header"}
  <div class={cn("flex min-h-screen w-full flex-col", className)}>
    {@render children()}
  </div>
{:else}
  <SidebarProvider class={className}>
    {@render children()}
  </SidebarProvider>
{/if}
