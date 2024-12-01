import { AppSidebar } from "@/app/components/app-sidebar";
import NavbarComponent from "@/app/components/app-navbar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function studentPage({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { studentId: string };
}) {
  if (!params || !params.studentId) {
    return <div>Error: Missing student ID</div>;
  }

  return (
    <>
      <SidebarProvider defaultOpen={false}>
        <AppSidebar role={"student"} id={params.studentId}/>
        <main>
          <NavbarComponent role={"student"} />

          <h1 className="pl-7 text-3xl m-0">
            Welcome Student {params.studentId},
          </h1>
          <div className="flex items-center justify-center mt-20">
            <div className="flex flex-row">
              <Card className="justify-center ml-8 h-80 w-80">
                <CardHeader>
                  <CardTitle className="text-2xl">Create New</CardTitle>
                  <CardDescription>
                    Create new staff, student, admin
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Card Content</p>
                </CardContent>
              </Card>
              <Card className="justify-center ml-20 h-80 w-80">
                <CardHeader>
                  <CardTitle className="text-2xl">Total Users</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-5xl text-center">40</p>
                </CardContent>
              </Card>
              <Card className="justify-center ml-20 h-80 w-80">
                <CardHeader>
                  <CardTitle className="text-2xl">
                    Total Certificates Created
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-5xl text-center">120</p>
                </CardContent>
              </Card>
            </div>
          </div>
          <SidebarTrigger className="mt-32" />
          {children}
        </main>
      </SidebarProvider>
    </>
  );
}
