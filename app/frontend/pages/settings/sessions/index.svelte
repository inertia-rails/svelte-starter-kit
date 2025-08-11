<script lang="ts">
  import { router } from "@inertiajs/svelte"
  import { page } from "@inertiajs/svelte"

  import HeadingSmall from "@/components/heading-small.svelte"
  import { Badge } from "@/components/ui/badge"
  import { Button } from "@/components/ui/button"
  import AppLayout from "@/layouts/app-layout.svelte"
  import SettingsLayout from "@/layouts/settings/layout.svelte"
  import { sessionPath, settingsSessionsPath } from "@/routes"
  import type { BreadcrumbItem, Session } from "@/types"

  interface Props {
    sessions: Session[]
  }

  let { sessions }: Props = $props()

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: "Sessions",
      href: settingsSessionsPath(),
    },
  ]

  const auth = $derived($page.props.auth)

  const deleteSession = (sessionId: string) => {
    router.delete(sessionPath({ id: sessionId }))
  }
</script>

<svelte:head>
  <title>{breadcrumbs[breadcrumbs.length - 1].title}</title>
</svelte:head>

<AppLayout {breadcrumbs}>
  <SettingsLayout>
    <div class="space-y-6">
      <HeadingSmall
        title="Sessions"
        description="Manage your active sessions across devices"
      />
      <div class="space-y-4">
        {#each sessions as session (session.id)}
          <div class="flex flex-col space-y-2 rounded-lg border p-4">
            <div class="flex items-center justify-between">
              <div class="space-y-1">
                <p class="font-medium">
                  {session.user_agent}
                  {#if session.id === auth.session.id}
                    <Badge variant="secondary" class="ml-2">Current</Badge>
                  {/if}
                </p>
                <p class="text-muted-foreground text-sm">
                  IP: {session.ip_address}
                </p>
                <p class="text-muted-foreground text-sm">
                  Active since:
                  {new Date(session.created_at).toLocaleString()}
                </p>
              </div>
              {#if session.id !== auth.session.id}
                <Button
                  variant="destructive"
                  onclick={() => deleteSession(session.id)}
                >
                  Log out
                </Button>
              {/if}
            </div>
          </div>
        {/each}
      </div>
    </div>
  </SettingsLayout>
</AppLayout>
