import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

import { AppSidebar } from "./components/app-sidebar";

export default function Home() {
  return (
    <>
      <SidebarProvider>
        <AppSidebar role={"admin"} id="some-id" />
        <main>
          <SidebarTrigger />
        </main>
      </SidebarProvider>
    </>
  );
}
