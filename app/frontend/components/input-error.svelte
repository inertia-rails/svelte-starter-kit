<script lang="ts">
  import { cn } from "@/utils"

  interface Props {
    messages?: string[]
    class?: string
  }

  let { messages, class: className }: Props = $props()
</script>

{#if messages}
  <div>
    <p class={cn("text-sm text-red-600 dark:text-red-500", className)}>
      {messages.join(", ")}
    </p>
  </div>
{/if}
