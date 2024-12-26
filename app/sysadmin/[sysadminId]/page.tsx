"use client";
import { RotateCcw } from 'lucide-react';
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
import { getStaff, createUser } from "@/app/api/actions";
import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

// This is how you fetch data in the app directory for Server Components
async function fetchStaffData() {
  const staffResponse = await getStaff();

  return staffResponse;
}

export default function SysadminPage({ params }) {
  const [staff, setStaff] = useState([]);
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [role, setRole] = useState("");
  const [pwd, setPwd] = useState("");
  const [assignedStaff, setAssignedStaff] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const staffData = await fetchStaffData();
      setStaff(staffData);
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col lg:flex-row">
      <SidebarProvider defaultOpen={false}>
        <AppSidebar role={"admin"} id={params.sysadminId} />
        <main className="lg:flex-1 p-6">
          <NavbarComponent role={""} />
          <h1 className="text-3xl font-bold mb-6">Welcome Admin {params.sysadminId}</h1>
          <div className="flex items-center justify-center mt-10">
            <div className="flex flex-col items-center space-y-6">
              <Card className="w-full max-w-sm">
                <CardHeader>
                  <CardTitle className="text-2xl">Create New</CardTitle>
                  <CardDescription>Create new staff, student, admin</CardDescription>
                </CardHeader>
                <CardContent>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full">Create User</Button>
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
                          <Input
                            id="name"
                            placeholder="Serhat Karaman"
                            className="col-span-3"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="username" className="text-right">
                            Username
                          </Label>
                          <Input
                            id="username"
                            placeholder="serhat-role123"
                            className="col-span-3"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="password" className="text-right">
                            Password
                          </Label>
                          <Input
                            id="password"
                            placeholder="some-secure-password"
                            className="col-span-3"
                            value={pwd}
                            onChange={(e) => setPwd(e.target.value)}
                          />
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
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="role" className="text-right">
                            Assign Staff
                          </Label>
                          <div className="col-span-3 flex items-center space-x-2">
                            <Select onValueChange={(value) => setAssignedStaff(value)} disabled={role !== "student"}>
                              <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Role" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel>Role</SelectLabel>
                                  {staff.map((staffMember) => (
                                    <SelectItem key={staffMember.id} value={staffMember.id}>
                                      {staffMember.id}
                                    </SelectItem>
                                  ))}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                            <Button variant={"outline"} onClick={async () => {
                              const updatedStaff = await fetchStaffData();
                              setStaff(updatedStaff);
                            }}><RotateCcw /></Button>
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button
                          type="submit"
                          onClick={async () => {
                            try {
                              const response = await createUser(
                                name,
                                userName,
                                pwd,
                                role,
                                assignedStaff
                              );
                              if (response) {
                                toast.success("User created successfully");
                                setName("");
                                setUserName("");
                                setPwd("");
                                setRole("");
                              } else {
                                toast.error("Failed to create user");
                              }
                            } catch (error) {
                              toast.error(
                                "An error occurred while creating the user"
                              );
                            }
                          }}
                          className="w-full"
                        >
                          Save changes
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </SidebarProvider>
    </div>
  );
}
