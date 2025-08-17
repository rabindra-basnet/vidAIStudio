"use client";
import React, { useContext } from "react";
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
} from "@/components/ui/sidebar";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Compass,
  File,
  Gem,
  HomeIcon,
  LogOut,
  LucideFileVideo,
  PlusIcon,
  Settings,
  WalletCards,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { useAuthContext } from "@/app/provider";
import { signOut } from "firebase/auth";
import { auth } from "@/configs/FirebaseConifgs";
import { useRouter } from "next/navigation";
import { VidAIStudioLogo } from "@/components/VidAIStudioLogo";

const options = "Pro";

const MenuItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: HomeIcon,
  },
  {
    title: "Generate Video",
    url: "/create-new-video",
    icon: LucideFileVideo,
  },
  {
    title: "My Projects",
    url: "/projects",
    icon: File,
  },
  {
    title: "Billing",
    url: "/billing",
    icon: WalletCards,
  },
  {
    title: "AI Tools",
    url: "/ai-tools",
    icon: Compass,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];
function AppSidebar() {
  const router = useRouter();
  const path = usePathname();
  const { user } = useAuthContext();
  console.log(user);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <div>
          <div className="flex items-center gap-2 w-full justify-center mt-5">
            {/* <Image
              src={"/logo.png"}
              alt="logo"
              width={40}
              height={40}
              className="w-auto h-auto"
            /> */}
            <VidAIStudioLogo />
            <Badge
              variant="outline"
              className="text-yellow-600 border-yellow-400 bg-yellow-400/10"
            >
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
                <Button className="w-full" variant={"gradiant"}>
                  <PlusIcon />
                  Create New Video
                </Button>
              </Link>
            </div>
            <SidebarMenu className="space-y-2 mt-6">
              {MenuItems?.map((menu, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton
                    isActive={path === menu?.url}
                    className={`
          w-full justify-start px-3 py-2.5 rounded-lg transition-all duration-200 
          flex items-center gap-3
          hover:bg-[#EFB034]/20
          data-[active=true]:bg-[#EFB034] 
          data-[active=true]:text-[#5D4108] 
          text-gray-700
        `}
                    asChild
                  >
                    <Link
                      href={menu?.url}
                      className="flex items-center gap-3 w-full"
                    >
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
        <div className="mx-3 mb-6 p-4 border rounded-lg bg-gray-200">
          <div className="flex items-center justify-between">
            <Gem className="text-gray-400" />
            {user?.credits >=0 && (
              <h2 className="text-gray-400">{user?.credits} Credits Left</h2>
            )}
          </div>
          <Link href="/billing">
            <Button className="w-full mt-3 bg-[#EFB034] hover:bg-[#D29211] active:bg-[#B57E0F] text-[#5D4108] font-medium">
              Buy More Credits
            </Button>
          </Link>
        </div>

        <div className="mx-3 mb-6">
          <Button
            onClick={handleLogout}
            variant="secondary"
            className="w-full border flex items-center justify-start gap-2 px-4 py-2 rounded-lg hover:bg-red-50 hover:text-red-600 transition-all duration-200"
          >
            <LogOut className="w-5 h-5" />
            Log Out
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
export default AppSidebar;
