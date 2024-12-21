import React, { useEffect, useState } from "react";
import { getSession } from "@/actions";


import NavbarComponent from "@/app/components/app-navbar";
import SysadminAdminTable from "@/app/components/sysadmin-admin-table"; // Ensure the correct import
import { SysadminAccountDetails } from "@/app/models/interfaces";
import { getAdmin } from "@/app/api/actions";

export default async function SysadminAdminPage() {
  const data = await getAdmin();
  return (
    <>
      <NavbarComponent role={"admin"} />
      <div className="container mx-auto p-4">
        <SysadminAdminTable data={data} />
      </div>
    </>
  );
}