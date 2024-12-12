import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

import { AppSidebar } from "../components/app-sidebar";

export default function SysadminPage() {
  return (
    <>
      <SidebarProvider>
        <AppSidebar role="admin" id="some_id"/>
        <main>
          <SidebarTrigger />
          <div className="p-4">
            <h1 className="text-2xl font-bold">Welcome, Sysadmin!</h1>
            {/* Add your content here */}
          </div>
        </main>
      </SidebarProvider>
    </>
  );
}
