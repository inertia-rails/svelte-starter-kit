import { page, router } from "@inertiajs/svelte"
import { toast } from "svelte-sonner"

import type { Flash } from "@/types"

const emptyFlash = {}

export const useFlashSvelte = () => {
  let currentFlash = $state<Flash>(emptyFlash)

  router.on("start", () => {
    currentFlash = emptyFlash
  })

  $effect(() => {
    return page.subscribe(($page) => {
      currentFlash = $page.props.flash
    })
  })

  $effect(() => {
    if (currentFlash.alert) {
      toast.error(currentFlash.alert)
    }
    if (currentFlash.notice) {
      toast(currentFlash.notice)
    }
  })
}
