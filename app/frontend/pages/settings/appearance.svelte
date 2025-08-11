<script lang="ts">
  import AppearanceTabs from "@/components/appearance-tabs.svelte"
  import HeadingSmall from "@/components/heading-small.svelte"
  import AppLayout from "@/layouts/app-layout.svelte"
  import SettingsLayout from "@/layouts/settings/layout.svelte"
  import { settingsAppearancePath } from "@/routes"
  import { type BreadcrumbItem } from "@/types"

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: "Appearance settings",
      href: settingsAppearancePath(),
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
        title="Appearance settings"
        description="Update your account's appearance settings"
      />
      <AppearanceTabs />
    </div>
  </SettingsLayout>
</AppLayout>
