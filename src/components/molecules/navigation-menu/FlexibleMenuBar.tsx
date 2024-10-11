"use client"

import { useState } from "react";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
  } from "@/components/ui/navigation-menu";
  import { MdMenu } from "react-icons/md";
import Link from "next/link";


export const FlexibleMenuBar = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const props = {
        isMenuOpen, 
        setIsMenuOpen, 
    }
    return ( <FlexibleMenuBarView {...props}></FlexibleMenuBarView> );
}

const FlexibleMenuBarView = ({isMenuOpen, setIsMenuOpen} : any) => {

    return (
        <>
    <div className="hidden md:block justify-center items-center">
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuLink href={'/doc/next'}>설명서</NavigationMenuLink>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    </div>
    <div className="md:hidden">
        <MdMenu size={28} onClick={() => setIsMenuOpen(!isMenuOpen)} />
    </div>
    
    {isMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md md:hidden">
            <NavigationMenu>
                <NavigationMenuList className="flex flex-col space-y-4 p-4">
                    <NavigationMenuItem>
                        <NavigationMenuLink href={'/doc/next'}>설명서</NavigationMenuLink>

                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </div> )}
   
    </>
    )
}
