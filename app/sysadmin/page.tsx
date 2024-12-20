import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

import { AppSidebar } from "../components/app-sidebar";
import { getSession } from "@/actions";
import { redirect } from "next/navigation";


const SysadminPage = async () => {
  const session = await getSession();
  

  return (
    <>
      <SidebarProvider>
        <AppSidebar role="admin" id="some_id" />
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

export default SysadminPage;