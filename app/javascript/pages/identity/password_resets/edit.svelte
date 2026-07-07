<script lang="ts">
  import type { FormComponentSlotProps } from "@inertiajs/core"
  import { Form } from "@inertiajs/svelte"
  import { LoaderCircle } from "@lucide/svelte"

  import { Button } from "@/components/ui/button"
  import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
  } from "@/components/ui/field"
  import { Input } from "@/components/ui/input"
  import AuthLayout from "@/layouts/auth-layout.svelte"
  import { identityPasswordResets } from "@/routes"

  interface Props {
    sid: string
    email: string
  }

  let { sid, email }: Props = $props()
</script>

<svelte:head>
  <title>Reset password</title>
</svelte:head>

<AuthLayout
  title="Reset password"
  description="Please enter your new password below"
>
  <Form
    action={identityPasswordResets.update()}
    transform={(data) => ({ ...data, sid, email })}
    resetOnSuccess={["password", "password_confirmation"]}
  >
    {#snippet children({ errors, processing }: FormComponentSlotProps)}
      <FieldGroup>
        <Field>
          <FieldLabel for="email">Email</FieldLabel>
          <Input
            id="email"
            name="email"
            type="email"
            autocomplete="email"
            value={email}
            readonly
          />
          <FieldError errors={errors.email?.map((message) => ({ message }))} />
        </Field>

        <Field>
          <FieldLabel for="password">Password</FieldLabel>
          <Input
            id="password"
            name="password"
            type="password"
            autocomplete="new-password"
            autofocus
            placeholder="Password"
          />
          <FieldError
            errors={errors.password?.map((message) => ({ message }))}
          />
        </Field>

        <Field>
          <FieldLabel for="password_confirmation">Confirm Password</FieldLabel>
          <Input
            id="password_confirmation"
            name="password_confirmation"
            type="password"
            autocomplete="new-password"
            placeholder="Confirm password"
          />
          <FieldError
            errors={errors.password_confirmation?.map((message) => ({
              message,
            }))}
          />
        </Field>

        <Button type="submit" class="mt-4 w-full" disabled={processing}>
          {#if processing}
            <LoaderCircle class="h-4 w-4 animate-spin" />
          {/if}
          Reset password
        </Button>
      </FieldGroup>
    {/snippet}
  </Form>
</AuthLayout>
