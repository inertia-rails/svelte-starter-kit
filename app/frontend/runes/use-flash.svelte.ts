import { router } from "@inertiajs/svelte"
import { toast } from "svelte-sonner"

export function useFlash() {
  $effect(() => {
    return router.on("flash", (event) => {
      const flash = event.detail.flash
      if (flash.alert) {
        toast.error(flash.alert)
      }
      if (flash.notice) {
        toast(flash.notice)
      }
    })
  })
}
