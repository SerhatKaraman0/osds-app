"use client";
import React, { useState, useCallback } from "react";
import NavbarComponent from "@/app/components/app-navbar";
import { AppSidebar } from "@/app/components/app-sidebar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toaster, toast } from "sonner";
import { changeDesKey } from "@/app/api/actions"; // Assuming you have this action defined

interface StaffPageProps {
  params: {
    staffId: string;
  };
}

export default function StaffPage({ params }: StaffPageProps) {
  const [desKey, setDesKey] = useState("");

  const handleSaveChanges = useCallback(async () => {
    try {
      toast.success("DES Key Updated Successfully. Logging out...");
      // Add your logout logic here
    } catch (error) {
      toast.error("An error occurred while updating the DES Key.");
      console.error("Error updating DES Key:", error);
    }
  }, [desKey]);

  return (
    <>
      <Toaster richColors />
      <SidebarProvider defaultOpen={false}>
        <AppSidebar role="staff" id={params.staffId} />
        <main>
          <NavbarComponent role="" />
          <h1 className="pl-7 text-3xl m-0">Welcome Staff {params.staffId},</h1>
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
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline">Change DES Key</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Change DES Key</DialogTitle>
                        <DialogDescription>
                          Change the DES Key and logout
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="des_key" className="text-right">
                            DES Key
                          </Label>
                          <Input
                            id="des_key"
                            placeholder="NEW_DES_KEY"
                            className="col-span-3"
                            value={desKey}
                            onChange={(e) => setDesKey(e.target.value)}
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="button" onClick={handleSaveChanges}>
                          Save changes
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
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
        </main>
      </SidebarProvider>
    </>
  );
}