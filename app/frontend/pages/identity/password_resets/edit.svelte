<script lang="ts">
  import type { FormComponentSlotProps } from "@inertiajs/core"
  import { Form } from "@inertiajs/svelte"
  import { LoaderCircle } from "@lucide/svelte"

  import InputError from "@/components/input-error.svelte"
  import { Button } from "@/components/ui/button"
  import { Input } from "@/components/ui/input"
  import { Label } from "@/components/ui/label"
  import AuthLayout from "@/layouts/auth-layout.svelte"
  import { identityPasswordResetPath } from "@/routes"

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
    method="put"
    action={identityPasswordResetPath()}
    transform={(data) => ({ ...data, sid, email })}
    resetOnSuccess={["password", "password_confirmation"]}
  >
    {#snippet children({ errors, processing }: FormComponentSlotProps)}
      <div class="grid gap-6">
        <div class="grid gap-2">
          <Label for="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            autocomplete="email"
            value={email}
            class="mt-1 block w-full"
            readonly
          />
          <InputError messages={errors.email} class="mt-2" />
        </div>

        <div class="grid gap-2">
          <Label for="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            autocomplete="new-password"
            class="mt-1 block w-full"
            autofocus
            placeholder="Password"
          />
          <InputError messages={errors.password} />
        </div>

        <div class="grid gap-2">
          <Label for="password_confirmation">Confirm Password</Label>
          <Input
            id="password_confirmation"
            name="password_confirmation"
            type="password"
            autocomplete="new-password"
            class="mt-1 block w-full"
            placeholder="Confirm password"
          />
          <InputError messages={errors.password_confirmation} />
        </div>

        <Button type="submit" class="mt-4 w-full" disabled={processing}>
          {#if processing}
            <LoaderCircle class="h-4 w-4 animate-spin" />
          {/if}
          Reset password
        </Button>
      </div>
    {/snippet}
  </Form>
</AuthLayout>
