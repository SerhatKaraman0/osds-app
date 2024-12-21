import React, { useEffect, useState } from "react";
import NavbarComponent from "@/app/components/app-navbar";
import StaffStudentsTable from "@/app/components/staff-students-table";
import { StudentAccountDetails } from "@/app/models/interfaces";
import { getStudents_Staff } from "@/app/api/actions";

export default async function StaffStudentsPage() {
  const data = await getStudents_Staff();
  return (
    <>
      <NavbarComponent role={"staff"} />
      <div className="container mx-auto p-4">
        <StaffStudentsTable data={data} />
      </div>
    </>
  );
}