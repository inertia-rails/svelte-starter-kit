<script lang="ts">
  import { Link, router } from "@inertiajs/svelte"
  import { LogOut, Settings } from "@lucide/svelte"

  import {
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
  } from "@/components/ui/dropdown-menu"
  import UserInfo from "@/components/user-info.svelte"
  import { sessionPath, settingsProfilePath } from "@/routes"
  import type { User } from "@/types"

  interface Props {
    auth: {
      session: {
        id: string
      }
      user: User
    }
  }

  let { auth }: Props = $props()

  const handleLogout = () => {
    router.flushAll()
  }
</script>

<DropdownMenuLabel class="p-0 font-normal">
  <div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
    <UserInfo user={auth.user} showEmail={true} />
  </div>
</DropdownMenuLabel>
<DropdownMenuSeparator />
<DropdownMenuGroup>
  <DropdownMenuItem class="w-full">
    {#snippet child({ props })}
      <Link
        href={settingsProfilePath()}
        data-sveltekit-prefetch
        as="button"
        {...props}
      >
        <Settings class="mr-2 h-4 w-4" />
        Settings
      </Link>
    {/snippet}
  </DropdownMenuItem>
</DropdownMenuGroup>
<DropdownMenuSeparator />
<DropdownMenuItem class="w-full">
  {#snippet child({ props })}
    <Link
      href={sessionPath({ id: auth.session.id })}
      method="delete"
      as="button"
      onclick={handleLogout}
      {...props}
    >
      <LogOut class="mr-2 h-4 w-4" />
      Log out
    </Link>
  {/snippet}
</DropdownMenuItem>
