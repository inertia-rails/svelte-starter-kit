<script lang="ts">
  import type { FormComponentSlotProps } from "@inertiajs/core"
  import { Form, router } from "@inertiajs/svelte"
  import { page } from "@inertiajs/svelte"
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
  import { identityEmailVerifications, settingsEmails } from "@/routes"
  import type { BreadcrumbItem } from "@/types"

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: "Email settings",
      href: settingsEmails.show().url,
    },
  ]

  const user = $derived(page.props.auth.user)

  const resendVerification = () => {
    router.post(identityEmailVerifications.create().url)
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

      <Form
        action={settingsEmails.update()}
        options={{
          preserveScroll: true,
        }}
        resetOnError={["password_challenge"]}
        resetOnSuccess={["password_challenge"]}
        class="space-y-6"
      >
        {#snippet children({
          errors,
          processing,
          recentlySuccessful,
        }: FormComponentSlotProps)}
          <FieldGroup>
            <Field>
              <FieldLabel for="email">Email address</FieldLabel>

              <Input
                id="email"
                name="email"
                type="email"
                defaultValue={page.props.auth.user.email}
                required
                autocomplete="username"
                placeholder="Email address"
              />

              <FieldError
                errors={errors.email?.map((message) => ({ message }))}
              />
            </Field>

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
          </FieldGroup>

          <div class="flex items-center gap-4">
            <Button type="submit" disabled={processing}>Save</Button>

            {#if recentlySuccessful}
              <p
                class="text-sm text-neutral-600"
                in:fly={{ y: -10, duration: 200 }}
                out:fly={{ y: -10, duration: 200 }}
              >
                Saved
              </p>
            {/if}
          </div>
        {/snippet}
      </Form>
    </div>
  </SettingsLayout>
</AppLayout>
