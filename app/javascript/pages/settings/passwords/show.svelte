<script lang="ts">
  import type { FormComponentSlotProps } from "@inertiajs/core"
  import { Form } from "@inertiajs/svelte"
  import { fly } from "svelte/transition"

  import HeadingSmall from "@/components/heading-small.svelte"
  import { Button } from "@/components/ui/button"
  import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
  } from "@/components/ui/field"
  import { Input } from "@/components/ui/input"
  import AppLayout from "@/layouts/app-layout.svelte"
  import SettingsLayout from "@/layouts/settings/layout.svelte"
  import { settingsPasswords } from "@/routes"
  import { type BreadcrumbItem } from "@/types"

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: "Password settings",
      href: settingsPasswords.show().url,
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
        action={settingsPasswords.update()}
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
          <FieldGroup>
            <Field>
              <FieldLabel for="password_challenge">
                Current password
              </FieldLabel>
              <Input
                id="password_challenge"
                name="password_challenge"
                type="password"
                autocomplete="current-password"
                placeholder="Current password"
              />
              <FieldError
                errors={errors.password_challenge?.map((message) => ({
                  message,
                }))}
              />
            </Field>

            <Field>
              <FieldLabel for="password">New password</FieldLabel>
              <Input
                id="password"
                name="password"
                type="password"
                autocomplete="new-password"
                placeholder="New password"
              />
              <FieldError
                errors={errors.password?.map((message) => ({ message }))}
              />
            </Field>

            <Field>
              <FieldLabel for="password_confirmation">
                Confirm password
              </FieldLabel>
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
          </FieldGroup>

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
