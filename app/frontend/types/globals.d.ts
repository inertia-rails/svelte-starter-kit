import type { FlashData, SharedData } from "@/types"

declare module "@inertiajs/core" {
  export interface InertiaConfig {
    sharedPageProps: SharedData
    flashDataType: FlashData
    errorValueType: string[]
  }
}
