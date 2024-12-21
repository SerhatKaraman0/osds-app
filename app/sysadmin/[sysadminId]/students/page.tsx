import React, { useEffect, useState } from "react";

import NavbarComponent from "@/app/components/app-navbar";
import SysadminStudentTable from "@/app/components/sysadmin-student-table";
import { StudentAccountDetails } from "@/app/models/interfaces";
import { getStudents } from "@/app/api/actions";

export default async function SysadminStudentPage() {
  const data = await getStudents();

  return (
    <>
      <NavbarComponent role={"admin"} />
      <div className="container mx-auto p-4">
        <SysadminStudentTable data={data} />
      </div>
    </>
  );
}
