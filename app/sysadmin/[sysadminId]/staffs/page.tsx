import React, { useEffect, useState } from "react";
import { getSession } from "@/actions";
import NavbarComponent from "@/app/components/app-navbar";
import SysadminStaffTable from "@/app/components/sysadmin-staff-table"; // Ensure the correct import
import { StaffAccountDetails } from "@/app/models/interfaces";
import { getStaff } from "@/app/api/actions";

export default async function SysadminStaffPage() {
  const data = await getStaff();
  return (
    <>
      <NavbarComponent role={""} />
      <div className="container mx-auto p-4">
        <SysadminStaffTable data={data} />
      </div>
    </>
  );
}