<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements"

  import { type WithElementRef, cn } from "@/utils"

  let {
    ref = $bindable(null),
    class: className,
    children,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLLIElement>, HTMLLIElement> = $props()
</script>

<li
  bind:this={ref}
  data-slot="sidebar-menu-item"
  data-sidebar="menu-item"
  class={cn("group/menu-item relative", className)}
  {...restProps}
>
  {@render children?.()}
</li>
