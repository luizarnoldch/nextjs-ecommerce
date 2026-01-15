"use client"

import { Plus } from "lucide-react"
import type { ReactNode } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerOverlay,
  DrawerPortal,
  DrawerTitle,
  DrawerTrigger
} from "@/components/ui/drawer"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useIsMobile } from "@/hooks/use-mobile"

type ModalFormProps = {
  children: ReactNode
  className?: string
  title: string
  description: string
  isOpen?: boolean
  onOpenChange?: (open: boolean) => void
  size?: "sm" | "md" | "lg" | "xl"
  disableOutsideClick?: boolean
  trigger?: ReactNode
}

const SIZE_CLASSES = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl"
}

const ResponsiveDialog = ({
  children,
  className,
  title,
  description,
  isOpen,
  onOpenChange,
  size = "lg",
  disableOutsideClick = false,
  trigger
}: ModalFormProps) => {
  const isMobile = useIsMobile()

  const defaultTrigger = (
    <Button
      size="sm"
      className="h-10 w-10 p-0"
      aria-label="Open modal"
    >
      <Plus className="h-5 w-5" />
    </Button>
  )

  return (
    <>
      {isMobile ? (
        <Drawer
          open={isOpen}
          onOpenChange={onOpenChange}
        >
          <DrawerTrigger asChild>{trigger || defaultTrigger}</DrawerTrigger>
          <DrawerPortal>
            <DrawerOverlay className="bg-black/10 backdrop-blur-sm" />
            <DrawerContent className={`pb-16 ${className}`}>
              <DrawerHeader>
                <DrawerTitle>{title}</DrawerTitle>
                <DrawerDescription>{description}</DrawerDescription>
              </DrawerHeader>
              <ScrollArea className="flex max-h-[60vh] w-full items-center justify-center">
                <div className={`w-full ${SIZE_CLASSES[size] || SIZE_CLASSES.lg} mx-auto`}>{children}</div>
              </ScrollArea>
              {/* <DrawerFooter>
                <DrawerClose asChild>
                  <Button variant="outline">Close</Button>
                </DrawerClose>
              </DrawerFooter> */}
            </DrawerContent>
          </DrawerPortal>
        </Drawer>
      ) : (
        <Dialog
          open={isOpen}
          onOpenChange={onOpenChange}
        >
          <DialogTrigger asChild>{trigger || defaultTrigger}</DialogTrigger>
          <DialogPortal>
            <DialogOverlay className="bg-black/10 backdrop-blur-sm" />
            <DialogContent
              onInteractOutside={disableOutsideClick ? e => e.preventDefault() : undefined}
              className={`top-[35%] left-[50%] w-full translate-x-[-50%] ${SIZE_CLASSES[size]} ${className}`}
            >
              <DialogHeader>
                <DialogTitle>{title}</DialogTitle>
                <DialogDescription>{description}</DialogDescription>
              </DialogHeader>
              <ScrollArea className="max-h-[60vh] w-full pr-4">{children}</ScrollArea>
              {/* <DialogFooter>
              <DialogClose asChild>
                  <Button variant="outline">Close</Button>
                </DialogClose>
              </DialogFooter> */}
            </DialogContent>
          </DialogPortal>
        </Dialog>
      )}
    </>
  )
}

export default ResponsiveDialog
