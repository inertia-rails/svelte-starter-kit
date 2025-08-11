<script lang="ts">
  import type { Snippet } from "svelte"

  import AuthLayout from "@/layouts/auth/auth-simple-layout.svelte"

  interface Props {
    title?: string
    description?: string
    children: Snippet
  }

  let { title, description, children }: Props = $props()
</script>

<AuthLayout {title} {description}>
  {@render children()}
</AuthLayout>
