import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

import { AppSidebar } from "../components/app-sidebar";

interface StaffPageProps {
  params: {
    staffId: string;
  };
}

const staffPage = ({ params }: StaffPageProps) => {
  return (
    <>
      <SidebarProvider>
        <AppSidebar role={"staff"} id={params.staffId} />
        <main>
          <SidebarTrigger />
        </main>
      </SidebarProvider>
    </>
  );
};

export default staffPage;
