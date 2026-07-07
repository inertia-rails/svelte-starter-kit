<script lang="ts">
  import type { FormComponentSlotProps } from "@inertiajs/core"
  import { Form } from "@inertiajs/svelte"
  import { LoaderCircle } from "@lucide/svelte"

  import TextLink from "@/components/text-link.svelte"
  import { Button } from "@/components/ui/button"
  import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
  } from "@/components/ui/field"
  import { Input } from "@/components/ui/input"
  import AuthBase from "@/layouts/auth-layout.svelte"
  import { identityPasswordResets, sessions, users } from "@/routes"
</script>

<svelte:head>
  <title>Log in</title>
</svelte:head>

<AuthBase
  title="Log in to your account"
  description="Enter your email and password below to log in"
>
  <Form
    action={sessions.create()}
    resetOnSuccess={["password"]}
    class="flex flex-col gap-6"
  >
    {#snippet children({ processing, errors }: FormComponentSlotProps)}
      <FieldGroup>
        <Field>
          <FieldLabel for="email">Email address</FieldLabel>
          <Input
            id="email"
            name="email"
            type="email"
            required
            autofocus
            tabindex={1}
            autocomplete="email"
            placeholder="email@example.com"
          />
          <FieldError errors={errors.email?.map((message) => ({ message }))} />
        </Field>

        <Field>
          <div class="flex items-center justify-between">
            <FieldLabel for="password">Password</FieldLabel>
            <TextLink
              href={identityPasswordResets.new()}
              class="text-sm"
              tabindex={5}
            >
              Forgot password?
            </TextLink>
          </div>
          <Input
            id="password"
            name="password"
            type="password"
            required
            tabindex={2}
            autocomplete="current-password"
            placeholder="Password"
          />
          <FieldError
            errors={errors.password?.map((message) => ({ message }))}
          />
        </Field>

        <Button
          type="submit"
          class="mt-4 w-full"
          tabindex={4}
          disabled={processing}
        >
          {#if processing}
            <LoaderCircle class="h-4 w-4 animate-spin" />
          {/if}
          Log in
        </Button>
      </FieldGroup>

      <div class="text-muted-foreground text-center text-sm">
        Don't have an account?
        <TextLink href={users.new()} tabindex={5}>Sign up</TextLink>
      </div>
    {/snippet}
  </Form>
</AuthBase>
