<script lang="ts">
  import type { Method } from "@inertiajs/core"
  import { Link } from "@inertiajs/svelte"
  import type { Snippet } from "svelte"

  import { cn } from "@/utils"

  interface Props {
    href: string
    tabindex?: number
    method?: Method
    as?: keyof HTMLElementTagNameMap
    children: Snippet
    class?: string
  }

  let {
    href,
    tabindex,
    method,
    as,
    class: className,
    children,
  }: Props = $props()
</script>

<Link
  {href}
  {tabindex}
  {as}
  {method}
  class={cn(
    "text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:decoration-neutral-500",
    className,
  )}
>
  {@render children()}
</Link>
