import type { SharedData } from "@/types"

declare module "@inertiajs/core" {
  export interface InertiaConfig {
    sharedPageProps: SharedData
    errorValueType: string[]
  }
}
