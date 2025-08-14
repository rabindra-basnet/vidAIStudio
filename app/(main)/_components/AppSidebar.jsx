"use client"
import React, { useContext } from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Compass, File, Gem, HomeIcon, LucideFileVideo, Settings, WalletCards } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { useAuthContext } from "@/app/provider"

const options = "Pro"

const MenuItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: HomeIcon
  },
  {
    title: "Generate Video ",
    url: "/create-new-video",
    icon: LucideFileVideo
  },
  {
    title: "My Projects",
    url: "/projects",
    icon: File
  },
  {
    title: "Billing",
    url: "#",
    icon: WalletCards
  },
  {
    title: "AI Tools",
    url: "#",
    icon: Compass
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings
  },

]
function AppSidebar() {
  const path = usePathname()
  const { user } = useAuthContext()
  console.log(user)
  return (
    <Sidebar>
      <SidebarHeader>
        <div>
          <div className="flex items-center gap-2 w-full justify-center mt-5">
            <Image src={'/logo.png'} alt="logo"
              width={40} height={40}
            />
            <h2 className="font-bold text-2xl">VidAI Studio</h2>
            <Badge variant="outline" className="text-yellow-600 border-yellow-400 bg-yellow-400/10">
              {options}
            </Badge>
          </div>
          <h2 className="text-lg text-gray-400 text-center mt-3">
            AI Video Generator
          </h2>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupContent>
            <div className="mx-3 mt-4">
              <Link href={"/create-new-video"}>
                <Button className="w-full" variant={"orange"}>Create New Video</Button>
              </Link>
            </div>
            <SidebarMenu className="space-y-2 mt-6" >
              {MenuItems?.map((menu, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton
                    isActive={path === menu?.url}
                    className="w-full justify-start px-3 py-2.5 rounded-lg transition-all duration-200 hover:bg-sidebar-accent data-[active=true]:bg-sidebar-primary data-[active=true]:text-sidebar-primary-foreground"
                    asChild
                  >
                    <Link href={menu?.url} className="flex items-center gap-3 w-full">
                      <menu.icon className="w-5 h-5 flex-shrink-0 text-current" />
                      <span className="font-medium">{menu?.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div className="p-5 border rounded-lg mb-6 bg-gray-800">
          <div className="flex items-center justify-between">
            <Gem className="text-gray-400" />
            <h2 className="text-gray-400">{user?.credits} Credits Left</h2>
          </div>
          <Button className="w-full mt-3">Buy More Credits</Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
export default AppSidebar