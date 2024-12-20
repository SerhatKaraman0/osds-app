"use client";

import React, { useEffect, useState } from "react";
import { getSession } from "@/actions";
import NavbarComponent from "@/app/components/app-navbar";
import SysadminStaffTable from "@/app/components/sysadmin-staff-table"; // Ensure the correct import
import { StaffAccountDetails } from "@/app/models/interfaces";

export default function SysadminStaffPage() {
  const [data, setData] = useState<StaffAccountDetails[]>([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await getSession();
        const response = await fetch(`http://localhost:8080/frontend/admin/0/staff`);
        const result = await response.json()

        setData(result.staff);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  });

  return (
    <>
      <NavbarComponent role={""} />
      <div className="container mx-auto p-4">
        <SysadminStaffTable data={data} />
      </div>
    </>
  );
}