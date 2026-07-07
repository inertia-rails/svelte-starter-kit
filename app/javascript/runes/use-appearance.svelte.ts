import { isBrowser } from "@/lib/browser"
import * as storage from "@/lib/storage"

type Appearance = "light" | "dark" | "system"

const prefersDark = () => {
  if (!isBrowser) {
    return false
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches
}

const applyTheme = (appearance: Appearance) => {
  if (!isBrowser) return

  const isDark =
    appearance === "dark" || (appearance === "system" && prefersDark())

  document.documentElement.classList.toggle("dark", isDark)
}

const mediaQuery = () => {
  if (!isBrowser) {
    return null
  }

  return window.matchMedia("(prefers-color-scheme: dark)")
}

const handleSystemThemeChange = () => {
  const currentAppearance = storage.getItem("appearance") as Appearance
  applyTheme(currentAppearance ?? "system")
}

export function initializeTheme() {
  const savedAppearance =
    (storage.getItem("appearance") as Appearance) || "system"

  applyTheme(savedAppearance)

  mediaQuery()?.addEventListener("change", handleSystemThemeChange)
}

export function useAppearanceSvelte() {
  let appearance = $state<Appearance>("system")

  $effect.pre(() => {
    const savedAppearance = storage.getItem("appearance") as Appearance | null

    if (savedAppearance) {
      appearance = savedAppearance
    }
  })

  const update = (value: Appearance) => {
    appearance = value

    if (value === "system") {
      storage.removeItem("appearance")
    } else {
      storage.setItem("appearance", value)
    }
    applyTheme(value)
  }

  return {
    get value() {
      return appearance
    },
    update,
  }
}
