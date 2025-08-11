<script lang="ts">
  interface Props {
    title: string
    description?: string
  }

  let { title, description }: Props = $props()
</script>

<header>
  <h3 class="mb-0.5 text-base font-medium">{title}</h3>
  {#if description}
    <p class="text-muted-foreground text-sm">
      {description}
    </p>
  {/if}
</header>
