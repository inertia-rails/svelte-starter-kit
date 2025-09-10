<script lang="ts">
  import type { FormComponentSlotProps } from "@inertiajs/core"
  import { Form } from "@inertiajs/svelte"
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

      <Form
        method="put"
        action={settingsPasswordPath()}
        options={{
          preserveScroll: true,
        }}
        resetOnError
        resetOnSuccess
        class="space-y-6"
      >
        {#snippet children({
          errors,
          processing,
          recentlySuccessful,
        }: FormComponentSlotProps)}
          <div class="grid gap-2">
            <Label for="password_challenge">Current password</Label>
            <Input
              id="password_challenge"
              name="password_challenge"
              type="password"
              class="mt-1 block w-full"
              autocomplete="current-password"
              placeholder="Current password"
            />
            <InputError message={errors.password_challenge} />
          </div>

          <div class="grid gap-2">
            <Label for="password">New password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              class="mt-1 block w-full"
              autocomplete="new-password"
              placeholder="New password"
            />
            <InputError message={errors.password} />
          </div>

          <div class="grid gap-2">
            <Label for="password_confirmation">Confirm password</Label>
            <Input
              id="password_confirmation"
              name="password_confirmation"
              type="password"
              class="mt-1 block w-full"
              autocomplete="new-password"
              placeholder="Confirm password"
            />
            <InputError message={errors.password_confirmation} />
          </div>

          <div class="flex items-center gap-4">
            <Button type="submit" disabled={processing}>Save password</Button>

            {#if recentlySuccessful}
              <p
                class="text-sm text-neutral-600"
                in:fly={{ y: -10, duration: 200 }}
                out:fly={{ y: -10, duration: 200 }}
              >
                Saved.
              </p>
            {/if}
          </div>
        {/snippet}
      </Form>
    </div>
  </SettingsLayout>
</AppLayout>
