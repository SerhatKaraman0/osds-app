"use client";

import React, { useEffect, useState } from "react";

import NavbarComponent from "@/app/components/app-navbar";
import StaffRequestsTable from "@/app/components/staff-requests-table"; // Ensure the correct import
import { RequestDetails } from "@/app/models/interfaces";

export default function StaffRequestsPage() {
  const [data, setData] = useState<RequestDetails[]>([]);

  useEffect(() => {
    // Fetch data from API
    fetch("http://localhost:8080/backend/requests")
      .then((response) => response.json())
      .then((data) => setData(data.requests))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <>
      <NavbarComponent role={""} />
      <div className="container mx-auto p-4">
        <StaffRequestsTable data={data} />
      </div>
    </>
  );
}
