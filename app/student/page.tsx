import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

import { AppSidebar } from "../components/app-sidebar";

interface StudentPageProps {
  params: { studentId: string };
}

const studentPage = ({ params }: StudentPageProps) => {
  return (
    <>
      <SidebarProvider>
        <AppSidebar role={"student"} id={params.studentId} />
        <main>
          <SidebarTrigger />
        </main>
      </SidebarProvider>
    </>
  );
};

export default studentPage;
