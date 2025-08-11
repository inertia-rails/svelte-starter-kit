<script lang="ts">
  import * as icons from "lucide-svelte"
  import type { Component } from "svelte"

  import { cn } from "@/utils"

  interface Props {
    name: string
    class?: string
    size?: number | string
    color?: string
    strokeWidth?: number | string
  }

  let {
    name,
    class: className = "",
    size = 16,
    color,
    strokeWidth = 2,
  }: Props = $props()

  const computedClass = $derived(cn("h-4 w-4", className))

  const IconComponent = $derived(() => {
    const iconName = name.charAt(0).toUpperCase() + name.slice(1)
    return (icons as Record<string, unknown>)[iconName] as Component
  })
</script>

<IconComponent
  class={computedClass}
  {size}
  stroke-width={strokeWidth}
  {color}
/>
