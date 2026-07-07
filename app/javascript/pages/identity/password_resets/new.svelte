<script lang="ts">
  import type { FormComponentSlotProps } from "@inertiajs/core"
  import { Form } from "@inertiajs/svelte"
  import { LoaderCircle } from "@lucide/svelte"

  import TextLink from "@/components/text-link.svelte"
  import { Button } from "@/components/ui/button"
  import { Field, FieldError, FieldLabel } from "@/components/ui/field"
  import { Input } from "@/components/ui/input"
  import AuthLayout from "@/layouts/auth-layout.svelte"
  import { identityPasswordResets, sessions } from "@/routes"
</script>

<svelte:head>
  <title>Forgot password</title>
</svelte:head>

<AuthLayout
  title="Forgot password"
  description="Enter your email to receive a password reset link"
>
  <div class="space-y-6">
    <Form action={identityPasswordResets.create()}>
      {#snippet children({ errors, processing }: FormComponentSlotProps)}
        <Field>
          <FieldLabel for="email">Email address</FieldLabel>
          <Input
            id="email"
            name="email"
            type="email"
            autocomplete="off"
            autofocus
            placeholder="email@example.com"
          />
          <FieldError errors={errors.email?.map((message) => ({ message }))} />
        </Field>

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
      <TextLink href={sessions.new()}>log in</TextLink>
    </div>
  </div>
</AuthLayout>
