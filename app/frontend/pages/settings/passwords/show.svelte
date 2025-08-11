<script lang="ts">
  import type { Errors } from "@inertiajs/core"
  import { useForm } from "@inertiajs/svelte"
  import { fly } from "svelte/transition"

  import HeadingSmall from "@/components/heading-small.svelte"
  import InputError from "@/components/input-error.svelte"
  import { Button } from "@/components/ui/button"
  import { Input } from "@/components/ui/input"
  import { Label } from "@/components/ui/label"
  import AppLayout from "@/layouts/app-layout.svelte"
  import SettingsLayout from "@/layouts/settings/layout.svelte"
  import { settingsPasswordPath } from "@/routes"
  import { type BreadcrumbItem } from "@/types"

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: "Password settings",
      href: settingsPasswordPath(),
    },
  ]
  let passwordInput = $state<HTMLInputElement | null>(null)
  let currentPasswordInput = $state<HTMLInputElement | null>(null)

  const form = useForm({
    password_challenge: "",
    password: "",
    password_confirmation: "",
  })

  const updatePassword = (e: Event) => {
    e.preventDefault()
    $form.put(settingsPasswordPath(), {
      preserveScroll: true,
      onSuccess: () => $form.reset(),
      onError: (errors: Errors) => {
        if (errors.password) {
          $form.reset("password", "password_confirmation")
          passwordInput?.focus()
        }

        if (errors.password_challenge) {
          $form.reset("password_challenge")
          currentPasswordInput?.focus()
        }
      },
    })
  }
</script>

<svelte:head>
  <title>{breadcrumbs[breadcrumbs.length - 1].title}</title>
</svelte:head>

<AppLayout {breadcrumbs}>
  <SettingsLayout>
    <div class="space-y-6">
      <HeadingSmall
        title="Update password"
        description="Ensure your account is using a long, random password to stay secure"
      />

      <form onsubmit={updatePassword} class="space-y-6">
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

        <div class="grid gap-2">
          <Label for="password">New password</Label>
          <Input
            id="password"
            bind:ref={passwordInput}
            bind:value={$form.password}
            type="password"
            class="mt-1 block w-full"
            autocomplete="new-password"
            placeholder="New password"
          />
          <InputError message={$form.errors.password} />
        </div>

        <div class="grid gap-2">
          <Label for="password_confirmation">Confirm password</Label>
          <Input
            id="password_confirmation"
            bind:value={$form.password_confirmation}
            type="password"
            class="mt-1 block w-full"
            autocomplete="new-password"
            placeholder="Confirm password"
          />
          <InputError message={$form.errors.password_confirmation} />
        </div>

        <div class="flex items-center gap-4">
          <Button type="submit" disabled={$form.processing}
            >Save password</Button
          >

          {#if $form.recentlySuccessful}
            <p
              class="text-sm text-neutral-600"
              in:fly={{ y: -10, duration: 200 }}
              out:fly={{ y: -10, duration: 200 }}
            >
              Saved.
            </p>
          {/if}
        </div>
      </form>
    </div>
  </SettingsLayout>
</AppLayout>
