<script lang="ts">
  import { cn } from "@/utils"

  interface Props {
    message?: string
    class?: string
  }

  let { message, class: className }: Props = $props()
</script>

{#if message}
  <div>
    <p class={cn("text-sm text-red-600 dark:text-red-500", className)}>
      {message}
    </p>
  </div>
{/if}
