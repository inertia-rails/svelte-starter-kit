<script lang="ts">
  import type { FormComponentSlotProps } from "@inertiajs/core"
  import { Form, page } from "@inertiajs/svelte"
  import { fly } from "svelte/transition"

  import DeleteUser from "@/components/delete-user.svelte"
  import HeadingSmall from "@/components/heading-small.svelte"
  import { Button } from "@/components/ui/button"
  import { Field, FieldError, FieldLabel } from "@/components/ui/field"
  import { Input } from "@/components/ui/input"
  import AppLayout from "@/layouts/app-layout.svelte"
  import SettingsLayout from "@/layouts/settings/layout.svelte"
  import { settingsProfiles } from "@/routes"
  import { type BreadcrumbItem } from "@/types"

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: "Profile settings",
      href: settingsProfiles.show().url,
    },
  ]
</script>

<svelte:head>
  <title>{breadcrumbs[breadcrumbs.length - 1].title}</title>
</svelte:head>

<AppLayout {breadcrumbs}>
  <SettingsLayout>
    <div class="flex flex-col space-y-6">
      <HeadingSmall
        title="Profile information"
        description="Update your name and email address"
      />

      <Form
        action={settingsProfiles.update()}
        options={{
          preserveScroll: true,
        }}
        class="space-y-6"
      >
        {#snippet children({
          errors,
          processing,
          recentlySuccessful,
        }: FormComponentSlotProps)}
          <Field>
            <FieldLabel for="name">Name</FieldLabel>
            <Input
              id="name"
              name="name"
              value={page.props.auth.user.name}
              required
              autocomplete="name"
              placeholder="Full name"
            />
            <FieldError errors={errors.name?.map((message) => ({ message }))} />
          </Field>

          <div class="flex items-center gap-4">
            <Button type="submit" disabled={processing}>Save</Button>

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

    <DeleteUser />
  </SettingsLayout>
</AppLayout>
