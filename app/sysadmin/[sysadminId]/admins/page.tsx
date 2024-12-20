"use client";

import React, { useEffect, useState } from "react";
import { getSession } from "@/actions";


import NavbarComponent from "@/app/components/app-navbar";
import SysadminAdminTable from "@/app/components/sysadmin-admin-table"; // Ensure the correct import
import { SysadminAccountDetails } from "@/app/models/interfaces";

export default function SysadminAdminPage() {
  const [data, setData] = useState<SysadminAccountDetails[]>([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/backend/sysadmins");
        const result = await response.json();
        setData(result.sysadmins);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  });

  return (
    <>
      <NavbarComponent role={"admin"} />
      <div className="container mx-auto p-4">
        <SysadminAdminTable data={data} />
      </div>
    </>
  );
}