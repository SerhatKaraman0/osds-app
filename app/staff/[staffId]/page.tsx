"use client";
import React, { useEffect, useState } from "react";
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

interface StaffPageProps {
  params: {
    staffId: string;
  };
}

export default function StaffPage({ params }: StaffPageProps) {

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/backend/students");
        const result = await response.json();
        setData(result.students);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  });

  return (
    <>
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
        </main>
      </SidebarProvider>
    </>
  );
}

