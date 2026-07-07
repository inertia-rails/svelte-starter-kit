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
  import { sessions, users } from "@/routes"
</script>

<svelte:head>
  <title>Register</title>
</svelte:head>

<AuthBase
  title="Create an account"
  description="Enter your details below to create your account"
>
  <Form
    action={users.create()}
    resetOnSuccess={["password", "password_confirmation"]}
    disableWhileProcessing
    class="flex flex-col gap-6"
  >
    {#snippet children({ errors, processing }: FormComponentSlotProps)}
      <FieldGroup>
        <Field>
          <FieldLabel for="name">Name</FieldLabel>
          <Input
            id="name"
            name="name"
            type="text"
            required
            autofocus
            tabindex={1}
            autocomplete="name"
            placeholder="Full name"
          />
          <FieldError errors={errors.name?.map((message) => ({ message }))} />
        </Field>

        <Field>
          <FieldLabel for="email">Email address</FieldLabel>
          <Input
            id="email"
            name="email"
            type="email"
            required
            tabindex={2}
            autocomplete="email"
            placeholder="email@example.com"
          />
          <FieldError errors={errors.email?.map((message) => ({ message }))} />
        </Field>

        <Field>
          <FieldLabel for="password">Password</FieldLabel>
          <Input
            id="password"
            name="password"
            type="password"
            required
            tabindex={3}
            autocomplete="new-password"
            placeholder="Password"
          />
          <FieldError
            errors={errors.password?.map((message) => ({ message }))}
          />
        </Field>

        <Field>
          <FieldLabel for="password_confirmation">Confirm password</FieldLabel>
          <Input
            id="password_confirmation"
            name="password_confirmation"
            type="password"
            required
            tabindex={4}
            autocomplete="new-password"
            placeholder="Confirm password"
          />
          <FieldError
            errors={errors.password_confirmation?.map((message) => ({
              message,
            }))}
          />
        </Field>

        <Button
          type="submit"
          class="mt-2 w-full"
          tabindex={5}
          disabled={processing}
        >
          {#if processing}
            <LoaderCircle class="h-4 w-4 animate-spin" />
          {/if}
          Create account
        </Button>
      </FieldGroup>

      <div class="text-muted-foreground text-center text-sm">
        Already have an account?
        <TextLink
          href={sessions.new()}
          class="underline underline-offset-4"
          tabindex={6}>Log in</TextLink
        >
      </div>
    {/snippet}
  </Form>
</AuthBase>
