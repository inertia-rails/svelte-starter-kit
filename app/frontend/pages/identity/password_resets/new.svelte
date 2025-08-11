<script lang="ts">
  import { useForm } from "@inertiajs/svelte"
  import { LoaderCircle } from "lucide-svelte"

  import InputError from "@/components/input-error.svelte"
  import TextLink from "@/components/text-link.svelte"
  import { Button } from "@/components/ui/button"
  import { Input } from "@/components/ui/input"
  import { Label } from "@/components/ui/label"
  import AuthLayout from "@/layouts/auth-layout.svelte"
  import { identityPasswordResetPath, signInPath } from "@/routes"

  const form = useForm({
    email: "",
  })

  const submit = (e: Event) => {
    e.preventDefault()
    $form.post(identityPasswordResetPath())
  }
</script>

<svelte:head>
  <title>Forgot password</title>
</svelte:head>

<AuthLayout
  title="Forgot password"
  description="Enter your email to receive a password reset link"
>
  <div class="space-y-6">
    <form onsubmit={submit}>
      <div class="grid gap-2">
        <Label for="email">Email address</Label>
        <Input
          id="email"
          type="email"
          name="email"
          autocomplete="off"
          bind:value={$form.email}
          autofocus
          placeholder="email@example.com"
        />
        <InputError message={$form.errors.email} />
      </div>

      <div class="my-6 flex items-center justify-start">
        <Button type="submit" class="w-full" disabled={$form.processing}>
          {#if $form.processing}
            <LoaderCircle class="h-4 w-4 animate-spin" />
          {/if}
          Email password reset link
        </Button>
      </div>
    </form>

    <div class="text-muted-foreground space-x-1 text-center text-sm">
      <span>Or, return to</span>
      <TextLink href={signInPath()}>log in</TextLink>
    </div>
  </div>
</AuthLayout>
