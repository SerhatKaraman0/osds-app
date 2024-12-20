"use client";

import React, { useEffect, useState } from "react";
import NavbarComponent from "@/app/components/app-navbar";
import StaffRequestsTable from "@/app/components/staff-requests-table"; // Ensure the correct import
import { RequestDetails } from "@/app/models/interfaces";
import { getSession } from "@/actions";

export default function StaffRequestsPage() {
  const [data, setData] = useState<RequestDetails[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await getSession();
        const response = await fetch(`http://localhost:8080/frontend/requests/${user.userId}`);
        const result = await response.json();

        setData(result.requests);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  });

  return (
    <>
      <NavbarComponent role={"staff"} />
      <div className="container mx-auto p-4">
        <StaffRequestsTable data={data} />
      </div>
    </>
  );
}
