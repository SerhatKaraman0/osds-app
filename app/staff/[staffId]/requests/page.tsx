import React, { useEffect, useState } from "react";
import NavbarComponent from "@/app/components/app-navbar";
import StaffRequestsTable from "@/app/components/staff-requests-table"; // Ensure the correct import
import { RequestDetails } from "@/app/models/interfaces";
import { getSession } from "@/actions";
import { getRequests_Request } from "@/app/api/actions";

export default async function StaffRequestsPage() {
  const data = await getRequests_Request();
  return (
    <>
      <NavbarComponent role={"staff"} />
      <div className="container mx-auto p-4">
        <StaffRequestsTable data={data} />
      </div>
    </>
  );
}
