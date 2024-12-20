"use client";

import React, { useEffect, useState } from "react";

import NavbarComponent from "@/app/components/app-navbar";
import SysadminStudentTable from "@/app/components/sysadmin-student-table";
import { StudentAccountDetails } from "@/app/models/interfaces";

export default function SysadminStudentPage() {
  const [data, setData] = useState<StudentAccountDetails[]>([]);


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
      <NavbarComponent role={"admin"} />
      <div className="container mx-auto p-4">
        <SysadminStudentTable data={data} />
      </div>
    </>
  );
}
