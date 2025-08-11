<script lang="ts">
  import { useForm } from "@inertiajs/svelte"
  import { page } from "@inertiajs/svelte"
  import { fly } from "svelte/transition"

  import DeleteUser from "@/components/delete-user.svelte"
  import HeadingSmall from "@/components/heading-small.svelte"
  import InputError from "@/components/input-error.svelte"
  import { Button } from "@/components/ui/button"
  import { Input } from "@/components/ui/input"
  import { Label } from "@/components/ui/label"
  import AppLayout from "@/layouts/app-layout.svelte"
  import SettingsLayout from "@/layouts/settings/layout.svelte"
  import { settingsProfilePath } from "@/routes"
  import { type BreadcrumbItem } from "@/types"

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: "Profile settings",
      href: settingsProfilePath(),
    },
  ]

  const form = useForm({
    name: $page.props.auth.user.name,
  })

  const submit = (e: Event) => {
    e.preventDefault()
    $form.patch(settingsProfilePath(), {
      preserveScroll: true,
    })
  }
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

      <form onsubmit={submit} class="space-y-6">
        <div class="grid gap-2">
          <Label for="name">Name</Label>
          <Input
            id="name"
            class="mt-1 block w-full"
            bind:value={$form.name}
            required
            autocomplete="name"
            placeholder="Full name"
          />
          <InputError class="mt-2" message={$form.errors.name} />
        </div>

        <div class="flex items-center gap-4">
          <Button type="submit" disabled={$form.processing}>Save</Button>

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

    <DeleteUser />
  </SettingsLayout>
</AppLayout>
