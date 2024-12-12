"use client";

import NavbarComponent from "@/app/components/app-navbar";
import SysadminAdminTable from "@/app/components/sysadmin-admin-table"; // Ensure the correct import
import { SysadminAccountDetails } from "@/models/interfaces";
import React, { useEffect, useState } from "react";

export default function SysadminAdminPage() {
  const [data, setData] = useState<SysadminAccountDetails[]>([]);

  useEffect(() => {
    // Fetch data from API
    fetch("http://localhost:8080/backend/sysadmins")
      .then((response) => response.json())
      .then((data) => setData(data.sysadmins))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <>
      <NavbarComponent role={""} />
      <div className="container mx-auto p-4">
        <SysadminAdminTable data={data} />
      </div>
    </>
  );
}