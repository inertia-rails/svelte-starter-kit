<script lang="ts">
  import type { Snippet } from "svelte"

  import { Toaster } from "@/components/ui/sonner"
  import { useFlash } from "@/runes/use-flash.svelte"

  interface Props {
    children: Snippet
  }

  let { children }: Props = $props()

  useFlash()
</script>

{@render children()}
<Toaster richColors />
