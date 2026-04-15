"use client";

import { Menu } from "lucide-react";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerClose,
} from "@/components/ui/drawer";
import SideMenu from "@/components/SideMenu";
import { X } from "lucide-react";

const MobileMenu = () => {
  return (
    <div className="md:hidden mb-4">
      <Drawer direction="left">
        <DrawerTrigger asChild>
          <button className="flex items-center gap-2 bg-white rounded-lg px-4 py-2 text-[#004D61] font-semibold shadow-sm">
            <Menu className="w-5 h-5" />
            Menu
          </button>
        </DrawerTrigger>
        <DrawerContent className="w-[220px]">
          <div className="flex justify-end p-2">
            <DrawerClose asChild>
              <button className="text-[#004D61]">
                <X className="w-5 h-5" />
              </button>
            </DrawerClose>
          </div>
          <SideMenu />
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default MobileMenu;
