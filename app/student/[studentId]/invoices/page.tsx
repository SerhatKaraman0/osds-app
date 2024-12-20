"use client";

import NavbarComponent from "@/app/components/app-navbar";
import StudentInvoiceTable from "@/app/components/student-invoices";

const studentInvoicesPage = () => {
  const sampleInvoice: InvoiceDetails[] = [
    {
      id: 1,
      invoice_id: "INV-001",
      sender_id: "1001",
      amount: 150.75,
      date: "2023-03-01",
    },
    {
      id: 2,
      invoice_id: "INV-001",
      sender_id: "1001",
      amount: 150.75,
      date: "2023-03-01",
    },
    {
      id: 3,
      invoice_id: "INV-001",
      sender_id: "1001",
      amount: 150.75,
      date: "2023-03-01",
    },
    {
      id: 4,
      invoice_id: "INV-001",
      sender_id: "1001",
      amount: 150.75,
      date: "2023-03-01",
    },
    {
      id: 5,
      invoice_id: "INV-001",
      sender_id: "1001",
      amount: 150.75,
      date: "2023-03-01",
    },
  ]

  return (
    <>
      <NavbarComponent role={"student"} />
      <div className="container mx-auto p-4">
        <StudentInvoiceTable data={sampleInvoice} />
      </div>
    </>
  );
}

export default studentInvoicesPage;