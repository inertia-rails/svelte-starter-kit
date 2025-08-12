<script lang="ts">
  import { useForm } from "@inertiajs/svelte"
  import { LoaderCircle } from "@lucide/svelte"

  import InputError from "@/components/input-error.svelte"
  import TextLink from "@/components/text-link.svelte"
  import { Button } from "@/components/ui/button"
  import { Input } from "@/components/ui/input"
  import { Label } from "@/components/ui/label"
  import AuthBase from "@/layouts/auth-layout.svelte"
  import {
    newIdentityPasswordResetPath,
    signInPath,
    signUpPath,
  } from "@/routes"

  const form = useForm({
    email: "",
    password: "",
    remember: false,
  })

  const submit = () => {
    $form.post(signInPath(), {
      onFinish: () => $form.reset("password"),
    })
  }
</script>

<svelte:head>
  <title>Log in</title>
</svelte:head>

<AuthBase
  title="Log in to your account"
  description="Enter your email and password below to log in"
>
  <form on:submit|preventDefault={submit} class="flex flex-col gap-6">
    <div class="grid gap-6">
      <div class="grid gap-2">
        <Label for="email">Email address</Label>
        <Input
          id="email"
          type="email"
          required
          autofocus
          tabindex={1}
          autocomplete="email"
          bind:value={$form.email}
          placeholder="email@example.com"
        />
        <InputError message={$form.errors.email} />
      </div>

      <div class="grid gap-2">
        <div class="flex items-center justify-between">
          <Label for="password">Password</Label>
          <TextLink
            href={newIdentityPasswordResetPath()}
            class="text-sm"
            tabindex={5}
          >
            Forgot password?
          </TextLink>
        </div>
        <Input
          id="password"
          type="password"
          required
          tabindex={2}
          autocomplete="current-password"
          bind:value={$form.password}
          placeholder="Password"
        />
        <InputError message={$form.errors.password} />
      </div>

      <Button
        type="submit"
        class="mt-4 w-full"
        tabindex={4}
        disabled={$form.processing}
      >
        {#if $form.processing}
          <LoaderCircle class="h-4 w-4 animate-spin" />
        {/if}
        Log in
      </Button>
    </div>

    <div class="text-muted-foreground text-center text-sm">
      Don't have an account?
      <TextLink href={signUpPath()} tabindex={5}>Sign up</TextLink>
    </div>
  </form>
</AuthBase>
