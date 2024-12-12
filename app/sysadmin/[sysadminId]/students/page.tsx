"use client";

import React, { useEffect, useState } from "react";

import NavbarComponent from "@/app/components/app-navbar";
import SysadminStudentTable from "@/app/components/sysadmin-student-table"; // Ensure the correct import
import { StudentAccountDetails } from "@/app/models/interfaces";

export default function SysadminStudentPage() {
  const [data, setData] = useState<StudentAccountDetails[]>([]);

  useEffect(() => {
    // Fetch data from API
    fetch("http://localhost:8080/backend/students")
      .then((response) => response.json())
      .then((data) => setData(data.students))
      .catch((error) => console.error("Error fetching data:", error));
  }, [data]);

  return (
    <>
      <NavbarComponent role={""} />
      <div className="container mx-auto p-4">
        <SysadminStudentTable data={data} />
      </div>
    </>
  );
}
