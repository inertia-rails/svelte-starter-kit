<script lang="ts">
  import type { ComponentProps } from "svelte"

  import { Separator } from "@/components/ui/separator/index"
  import { cn } from "@/utils"

  let {
    ref = $bindable(null),
    class: className,
    ...restProps
  }: ComponentProps<typeof Separator> = $props()
</script>

<Separator
  bind:ref
  data-slot="sidebar-separator"
  data-sidebar="separator"
  class={cn("bg-sidebar-border", className)}
  {...restProps}
/>
