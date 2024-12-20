"use client";

import React, { useEffect, useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "../components/app-sidebar";

interface StaffPageProps {
  params: {
    staffId: string;
  };
}

export default function StaffPage({ params }: StaffPageProps) {

  return (
    <SidebarProvider>
      <AppSidebar role={"staff"} id={params.staffId} />
      <main>
        <SidebarTrigger />
      </main>
    </SidebarProvider>
  );
};
