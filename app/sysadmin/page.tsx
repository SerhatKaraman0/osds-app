import { AppSidebar } from "../components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

const sysadminPage = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SidebarProvider>
        <AppSidebar role={"admin"} />
        <main>
          <SidebarTrigger />
          {children}
        </main>
      </SidebarProvider>
    </>
  );
};

export default sysadminPage;
