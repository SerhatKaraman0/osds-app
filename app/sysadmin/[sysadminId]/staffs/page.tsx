"use client";

import React, { useEffect, useState } from "react";

import NavbarComponent from "@/app/components/app-navbar";
import SysadminStaffTable from "@/app/components/sysadmin-staff-table"; // Ensure the correct import

import { StaffAccountDetails } from "@/app/models/interfaces";

export default function SysadminStaffPage() {
  const [data, setData] = useState<StaffAccountDetails[]>([]);

  useEffect(() => {
    // Fetch data from API
    fetch("http://localhost:8080/backend/staff")
      .then((response) => response.json())
      .then((data) => setData(data.staffs))
      .catch((error) => console.error("Error fetching data:", error));
  }, [data]);

  return (
    <>
      <NavbarComponent role={""} />
      <div className="container mx-auto p-4">
        <SysadminStaffTable data={data} />
      </div>
    </>
  );
}
