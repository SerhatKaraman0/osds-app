import { AppSidebar } from "../components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

const studentPage = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SidebarProvider>
        <AppSidebar role={"student"} id={params.stude}/>
        <main>
          <SidebarTrigger />
          {children}
        </main>
      </SidebarProvider>
    </>
  );
};

export default studentPage;
