import { Menu } from "lucide-react";
import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

type Props = {};

const CatalogNavigation = (props: Props) => {
  return (
    <Sheet>
      <SheetTrigger asChild className="">
        <Button variant="outline">{"left"}</Button>
      </SheetTrigger>
      <SheetContent side={"left"} className="bg-primary">
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            <aside className="flex gap-2">
              <Menu />
              <nav>Catalogo</nav>
            </aside>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="bg-black">sheet content</div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default CatalogNavigation;
