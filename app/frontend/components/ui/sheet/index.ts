import { Dialog as SheetPrimitive } from "bits-ui"

import Close from "./sheet-close.svelte"
import Content from "./sheet-content.svelte"
import Description from "./sheet-description.svelte"
import Footer from "./sheet-footer.svelte"
import Header from "./sheet-header.svelte"
import Overlay from "./sheet-overlay.svelte"
import Title from "./sheet-title.svelte"
import Trigger from "./sheet-trigger.svelte"

const Root = SheetPrimitive.Root
const Portal = SheetPrimitive.Portal

export {
  Close,
  Close as SheetClose,
  Content,
  Content as SheetContent,
  Description,
  Description as SheetDescription,
  Footer,
  Footer as SheetFooter,
  Header,
  Header as SheetHeader,
  Overlay,
  Overlay as SheetOverlay,
  Portal,
  Portal as SheetPortal,
  Root,
  //
  Root as Sheet,
  Title,
  Title as SheetTitle,
  Trigger,
  Trigger as SheetTrigger,
}
