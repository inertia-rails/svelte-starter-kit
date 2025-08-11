<script lang="ts">
  import type { Errors } from "@inertiajs/core"
  import { router, useForm } from "@inertiajs/svelte"
  import { page } from "@inertiajs/svelte"
  import { fly } from "svelte/transition"

  import HeadingSmall from "@/components/heading-small.svelte"
  import InputError from "@/components/input-error.svelte"
  import { Button } from "@/components/ui/button"
  import { Input } from "@/components/ui/input"
  import { Label } from "@/components/ui/label"
  import AppLayout from "@/layouts/app-layout.svelte"
  import SettingsLayout from "@/layouts/settings/layout.svelte"
  import { identityEmailVerificationPath, settingsEmailPath } from "@/routes"
  import type { BreadcrumbItem } from "@/types"

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: "Email settings",
      href: settingsEmailPath(),
    },
  ]

  let currentPasswordInput = $state<HTMLInputElement | null>(null)

  const user = $derived($page.props.auth.user)

  const form = useForm({
    password_challenge: "",
    email: $page.props.auth.user.email,
  })

  const submit = (e: Event) => {
    e.preventDefault()
    $form.patch(settingsEmailPath(), {
      preserveScroll: true,
      onSuccess: () => $form.reset("password_challenge"),
      onError: (errors: Errors) => {
        if (errors.password_challenge) {
          $form.reset("password_challenge")
          currentPasswordInput?.focus()
        }
      },
    })
  }

  const resendVerification = () => {
    router.post(identityEmailVerificationPath())
  }
</script>

<svelte:head>
  <title>{breadcrumbs[breadcrumbs.length - 1].title}</title>
</svelte:head>

<AppLayout {breadcrumbs}>
  <SettingsLayout>
    <div class="space-y-6">
      <HeadingSmall
        title="Update email"
        description="Update your email address and verify it"
      />

      <form onsubmit={submit} class="space-y-6">
        <div class="grid gap-2">
          <Label for="email">Email address</Label>

          <Input
            id="email"
            type="email"
            class="mt-1 block w-full"
            bind:value={$form.email}
            required
            autocomplete="username"
            placeholder="Email address"
          />

          <InputError class="mt-2" message={$form.errors.email} />
        </div>

        {#if !user.verified}
          <div>
            <p class="text-muted-foreground -mt-4 text-sm">
              Your email address is unverified.
              <button
                type="button"
                onclick={resendVerification}
                class="text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:decoration-neutral-500"
              >
                Click here to resend the verification email.
              </button>
            </p>
          </div>
        {/if}

        <div class="grid gap-2">
          <Label for="password_challenge">Current password</Label>

          <Input
            id="password_challenge"
            bind:ref={currentPasswordInput}
            bind:value={$form.password_challenge}
            type="password"
            class="mt-1 block w-full"
            autocomplete="current-password"
            placeholder="Current password"
          />

          <InputError message={$form.errors.password_challenge} />
        </div>

        <div class="flex items-center gap-4">
          <Button type="submit" disabled={$form.processing}>Save</Button>

          {#if $form.recentlySuccessful}
            <p
              class="text-sm text-neutral-600"
              in:fly={{ y: -10, duration: 200 }}
              out:fly={{ y: -10, duration: 200 }}
            >
              Saved
            </p>
          {/if}
        </div>
      </form>
    </div>
  </SettingsLayout>
</AppLayout>
