<script lang="ts">
  import type { FormComponentSlotProps } from "@inertiajs/core"
  import { Form } from "@inertiajs/svelte"
  import { LoaderCircle } from "@lucide/svelte"

  import InputError from "@/components/input-error.svelte"
  import TextLink from "@/components/text-link.svelte"
  import { Button } from "@/components/ui/button"
  import { Input } from "@/components/ui/input"
  import { Label } from "@/components/ui/label"
  import AuthLayout from "@/layouts/auth-layout.svelte"
  import { identityPasswordResetPath, signInPath } from "@/routes"
</script>

<svelte:head>
  <title>Forgot password</title>
</svelte:head>

<AuthLayout
  title="Forgot password"
  description="Enter your email to receive a password reset link"
>
  <div class="space-y-6">
    <Form method="post" action={identityPasswordResetPath()}>
      {#snippet children({ errors, processing }: FormComponentSlotProps)}
        <div class="grid gap-2">
          <Label for="email">Email address</Label>
          <Input
            id="email"
            name="email"
            type="email"
            autocomplete="off"
            autofocus
            placeholder="email@example.com"
          />
          <InputError messages={errors.email} />
        </div>

        <div class="my-6 flex items-center justify-start">
          <Button type="submit" class="w-full" disabled={processing}>
            {#if processing}
              <LoaderCircle class="h-4 w-4 animate-spin" />
            {/if}
            Email password reset link
          </Button>
        </div>
      {/snippet}
    </Form>

    <div class="text-muted-foreground space-x-1 text-center text-sm">
      <span>Or, return to</span>
      <TextLink href={signInPath()}>log in</TextLink>
    </div>
  </div>
</AuthLayout>
