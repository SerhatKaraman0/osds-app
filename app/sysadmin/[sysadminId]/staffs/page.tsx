"use client";

import NavbarComponent from "@/app/components/app-navbar";
import SysadminStaffTable from "@/app/components/sysadmin-staff-table"; // Ensure the correct import
import { StaffAccountDetails } from "@/models/interfaces";
import React, { useEffect, useState } from "react";

export default function SysadminStaffPage() {
  const [data, setData] = useState<StaffAccountDetails[]>([]);

  useEffect(() => {
    // Fetch data from API
    fetch("http://localhost:8080/backend/staff")
      .then((response) => response.json())
      .then((data) => setData(data.staffs))
      .then(console.log(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <>
      <NavbarComponent role={""} />
      <div className="container mx-auto p-4">
        <SysadminStaffTable data={data} />
      </div>
    </>
  );
}