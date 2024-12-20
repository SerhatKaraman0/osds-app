import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

import { AppSidebar } from "../components/app-sidebar";
import { getSession } from "@/actions";
import { redirect } from "next/navigation";


interface StudentPageProps {
  params: { studentId: string };
}

const studentPage = async ({ params }: StudentPageProps) => {
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
