"use client";

import React, { useEffect, useState } from "react";

import NavbarComponent from "@/app/components/app-navbar";
import StaffStudentsTable from "@/app/components/staff-students-table";
import { StudentAccountDetails } from "@/app/models/interfaces";

export default function StaffStudentsPage() {
  const [data, setData] = useState<StudentAccountDetails[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/backend/students")
      .then((response) => response.json())
      .then((data) => setData(data.students))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <>
      <NavbarComponent role={""} />
      <div className="container mx-auto p-4">
        <StaffStudentsTable data={data} />
      </div>
    </>
  );
}
