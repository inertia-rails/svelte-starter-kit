<script lang="ts">
  import type { FormComponentSlotProps } from "@inertiajs/core"
  import { Form } from "@inertiajs/svelte"

  import HeadingSmall from "@/components/heading-small.svelte"
  import InputError from "@/components/input-error.svelte"
  import { Button } from "@/components/ui/button"
  import * as Dialog from "@/components/ui/dialog"
  import { Input } from "@/components/ui/input"
  import { Label } from "@/components/ui/label"
  import { usersPath } from "@/routes"

  let passwordInput: HTMLInputElement | null = null
</script>

<div class="space-y-6">
  <HeadingSmall
    title="Delete account"
    description="Delete your account and all of its resources"
  />
  <div
    class="space-y-4 rounded-lg border border-red-100 bg-red-50 p-4 dark:border-red-200/10 dark:bg-red-700/10"
  >
    <div class="relative space-y-0.5 text-red-600 dark:text-red-100">
      <p class="font-medium">Warning</p>
      <p class="text-sm">Please proceed with caution, this cannot be undone.</p>
    </div>
    <Dialog.Root>
      <Dialog.Trigger>
        <Button variant="destructive">Delete account</Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Form
          method="delete"
          action={usersPath()}
          options={{
            preserveScroll: true,
          }}
          onError={() => passwordInput?.focus()}
          resetOnSuccess
          class="space-y-6"
        >
          {#snippet children({
            errors,
            processing,
            resetAndClearErrors,
          }: FormComponentSlotProps)}
            <Dialog.Header class="space-y-3">
              <Dialog.Title>
                Are you sure you want to delete your account?
              </Dialog.Title>
              <Dialog.Description>
                Once your account is deleted, all of its resources and data will
                also be permanently deleted. Please enter your password to
                confirm you would like to permanently delete your account.
              </Dialog.Description>
            </Dialog.Header>

            <div class="grid gap-2">
              <Label for="password_challenge" class="sr-only">Password</Label>
              <Input
                id="password_challenge"
                type="password"
                name="password_challenge"
                bind:ref={passwordInput}
                placeholder="Password"
              />
              <InputError message={errors.password_challenge} />
            </div>

            <Dialog.Footer class="gap-2">
              <Dialog.Close>
                {#snippet child()}
                  <Button
                    variant="secondary"
                    onclick={() => resetAndClearErrors()}>Cancel</Button
                  >
                {/snippet}
              </Dialog.Close>

              <Button type="submit" variant="destructive" disabled={processing}>
                Delete account
              </Button>
            </Dialog.Footer>
          {/snippet}
        </Form>
      </Dialog.Content>
    </Dialog.Root>
  </div>
</div>
