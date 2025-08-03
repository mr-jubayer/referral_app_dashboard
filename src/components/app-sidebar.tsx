import { IconDashboard, IconTree } from "@tabler/icons-react";
import * as React from "react";

import { NavMain } from "@/components/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: IconDashboard,
    },
    {
      title: "User List",
      url: "/user-list",
      icon: IconTree,
    },
    {
      title: "Referral Tree View",
      url: "/referral-tree-view",
      icon: IconTree,
    },
    {
      title: "Deposit Review & Approval",
      url: "/deposit-review",
      icon: IconTree,
    },
    {
      title: "Withdraw Review & Approval",
      url: "/withdraw-review",
      icon: IconTree,
    },
    {
      title: "Balance Report",
      url: "/balance-report",
      icon: IconTree,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <span className="text-xl font-bold">App Name</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
    </Sidebar>
  );
}
