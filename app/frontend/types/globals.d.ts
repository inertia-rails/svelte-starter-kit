import type { AppPageProps } from "@/types/index"

declare module "@inertiajs/core" {
  interface PageProps extends InertiaPageProps, AppPageProps {}
}
