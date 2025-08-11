type Appearance = "light" | "dark" | "system"

const prefersDark = () => {
  if (typeof window === "undefined") {
    return false
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches
}

const applyTheme = (appearance: Appearance) => {
  const isDark =
    appearance === "dark" || (appearance === "system" && prefersDark())

  document.documentElement.classList.toggle("dark", isDark)
}

const mediaQuery = () => {
  if (typeof window === "undefined") {
    return null
  }

  return window.matchMedia("(prefers-color-scheme: dark)")
}

const handleSystemThemeChange = () => {
  const currentAppearance = localStorage.getItem("appearance") as Appearance
  applyTheme(currentAppearance ?? "system")
}

export function initializeTheme() {
  const savedAppearance =
    (localStorage.getItem("appearance") as Appearance) || "system"

  applyTheme(savedAppearance)

  mediaQuery()?.addEventListener("change", handleSystemThemeChange)
}

export function useAppearanceSvelte() {
  let appearance = $state<Appearance>("system")

  $effect.pre(() => {
    const savedAppearance = localStorage.getItem(
      "appearance",
    ) as Appearance | null

    if (savedAppearance) {
      appearance = savedAppearance
    }
  })

  const update = (value: Appearance) => {
    appearance = value

    if (value === "system") {
      localStorage.removeItem("appearance")
    } else {
      localStorage.setItem("appearance", value)
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
