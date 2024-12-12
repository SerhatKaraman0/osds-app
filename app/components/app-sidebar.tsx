"use client";

import {
  UserRound,
  UserRoundPen,
  ShieldCheck,
  Siren,
  ReceiptText,
  GitPullRequest,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const adminItems = (sysadminId: string) => [
  {
    title: "Admin",
    url: `/sysadmin/${sysadminId}/admins`,
    icon: Siren,
  },
  {
    title: "Staff",
    url: `/sysadmin/${sysadminId}/staffs`,
    icon: UserRound,
  },
  {
    title: "Student",
    url: `/sysadmin/${sysadminId}/students`,
    icon: UserRoundPen,
  },
  {
    title: "Certificate",
    url: `/sysadmin/${sysadminId}/certificates`,
    icon: ShieldCheck,
  },
];

const staffItems = (staffId: string) => [
  {
    title: "Students",
    url: `/staff/${staffId}/students`,
    icon: UserRoundPen,
  },
  {
    title: "Requests",
    url: `/staff/${staffId}/requests`,
    icon: GitPullRequest,
  },
];

const studentItems = (studentId: string) => [
  {
    title: "Certificates",
    url: `/student/${studentId}/certificates`,
    icon: ShieldCheck,
  },
  {
    title: "Invoices",
    url: `/student/${studentId}/invoices`,
    icon: ReceiptText,
  },
];

interface AppSidebarProps {
  role: "admin" | "staff" | "student";
  id: string;
}

export function AppSidebar({ role, id }: AppSidebarProps) {
  let items: { title: string; url: string; icon: React.ComponentType }[];

  switch (role) {
    case "admin":
      items = adminItems(id);
      break;
    case "staff":
      items = staffItems(id);
      break;
    case "student":
      items = studentItems(id);
      break;
    default:
      items = [];
  }

  return (
    <Sidebar variant="floating" collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>OSDS App</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
