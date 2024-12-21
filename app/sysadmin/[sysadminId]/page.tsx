"use client";
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
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { createUser } from "@/app/api/actions";

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

export default function sysadminPage({ params }) {
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [role, setRole] = useState("");
  const [pwd, setPwd] = useState("");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div className="flex">
      <SidebarProvider defaultOpen={false}>
        <AppSidebar role={"admin"} id={params.sysadminId} />
        <main>
          <NavbarComponent role={""} />

          <h1 className="pl-7 text-3xl m-0">
            Welcome Admin {params.sysadminId},
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
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline">Create User</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Create User</DialogTitle>
                        <DialogDescription>
                          Create a new user in the system
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="name" className="text-right">
                            Name
                          </Label>
                          <Input id="name" placeholder="Serhat Karaman" className="col-span-3" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="username" className="text-right">
                            Username
                          </Label>
                          <Input id="username" placeholder="serhat-role123" className="col-span-3" value={userName} onChange={(e) => setUserName(e.target.value)} />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="password" className="text-right">
                            Password
                          </Label>
                          <Input id="password" placeholder="some-secure-password" className="col-span-3" value={pwd} onChange={(e) => setPwd(e.target.value)} />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="role" className="text-right">
                            Role
                          </Label>
                          <Select onValueChange={(value) => setRole(value)}>
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Role" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Role</SelectLabel>
                                <SelectItem value="sysadmin">Sysadmin</SelectItem>
                                <SelectItem value="staff">Staff</SelectItem>
                                <SelectItem value="student">Student</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit" onClick={async () => {
                          try {
                            const response = await createUser(name, userName, pwd, role);
                            if (response) {
                              toast.success("User created successfully");
                            } else {
                              toast.error("Failed to create user");
                            }
                          } catch (error) {
                            toast.error("An error occurred while creating the user");
                          }
                        }}>
                          Save changes
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
              <Card className="justify-center ml-20 h-80 w-80">
                <CardHeader>
                  <CardTitle className="text-2xl text-center">
                    Total Users
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="pt-16 text-5xl text-center">40</p>
                </CardContent>
              </Card>
              <Card className="justify-center ml-20 h-80 w-80">
                <CardHeader>
                  <CardTitle className="text-center text-2xl">
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
    </div >
  );
}
