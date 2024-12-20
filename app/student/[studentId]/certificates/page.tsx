"use client";
import { getSession } from "@/actions";
import { redirect } from "next/navigation";
import NavbarComponent from "@/app/components/app-navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CertificateDetails } from "@/app/models/interfaces";
import StudentCertificateTable from "@/app/components/student-certificates";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner";
import SVGComponent from "@/app/components/coin-svg";

const studentCertificatePage = async () => {
  const sampleCertificateDetails: CertificateDetails[] = [
    {
      id: 1,
      certificate_id: "CERT-5001",
      sender_id: "1001",
      date: "2023-10-05",
    },
    {
      id: 2,
      certificate_id: "CERT-5001",
      sender_id: "1001",
      date: "2023-10-05",
    },
    {
      id: 3,
      certificate_id: "CERT-5001",
      sender_id: "1001",
      date: "2023-10-05",
    },
    {
      id: 4,
      certificate_id: "CERT-5001",
      sender_id: "1001",
      date: "2023-10-05",
    },
    {
      id: 5,
      certificate_id: "CERT-5001",
      sender_id: "1001",
      date: "2023-10-05",
    },
  ];

  return (
    <>
      <Toaster richColors />
      <NavbarComponent role={"student"} />
      <div className="container mx-auto p-4">
        <div className="flex items-center">
          <Button className="ml-32 mr-4" variant={"outline"} onClick={() => { toast.success("hello world"); }}>
            Request Certificate
          </Button>
          <span className="text-right text-sm italic text-gray-400">100 <SVGComponent className="inline-block w-3 h-3" /> + tax applies</span>
        </div>
        <StudentCertificateTable data={sampleCertificateDetails} />
      </div>
    </>
  );
}

export default studentCertificatePage;