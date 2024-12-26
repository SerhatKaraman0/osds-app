"use client";

import { useState, useEffect } from "react";
import { getSession } from "@/actions";
import NavbarComponent from "@/app/components/app-navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CertificateDetails } from "@/app/models/interfaces";
import StudentCertificateTable from "@/app/components/student-certificates";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import SVGComponent from "@/app/components/coin-svg";
import { createRequest_Certificate, getTranscriptsByUserId } from "@/app/api/actions";

const StudentCertificatePage = () => {
  const [user, setUser] = useState<any>(null);
  const [data, setData] = useState<CertificateDetails[]>([]);
  const [invoiceId, setInvoiceId] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userSession = await getSession();
        setUser(userSession);
        const transcripts = await getTranscriptsByUserId(userSession.userId);
        setData(transcripts);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleRequestCertificate = async () => {
    try {
      if (!user) {
        toast.error("User session not found!");
        return;
      }

      if (user.balance < 281) {
        toast.error("Insufficient balance!");
        return;
      }

      const request = await createRequest_Certificate({ invoiceId });

      if (!request?.success) {
        toast.error(request?.message);
      } else {
        toast.success("Certificate Request Created Successfully");
      }
    } catch (error) {
      console.error("Error requesting certificate:", error);
      toast.error("An error occurred while requesting the certificate.");
    }
  };

  return (
    <>
      <Toaster richColors />
      <NavbarComponent role={"student"} />
      <div className="container mx-auto p-4">
        <div className="flex items-center">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="ml-32 mr-4" variant="outline">
                Request Certificate
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Request Certificate</DialogTitle>
                <DialogDescription>
                  Enter your invoice id to request a certificate
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="invoice_id" className="text-right">
                    Invoice ID
                  </Label>
                  <Input
                    id="invoice_id"
                    value={invoiceId}
                    onChange={(e) => setInvoiceId(e.target.value)}
                    placeholder="INVOICE-123"
                    className="col-span-3"
                    required
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant={"outline"} onClick={handleRequestCertificate}>
                  Request Certificate
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <span className="text-right text-sm italic text-gray-400">
            100 <SVGComponent className="inline-block w-3 h-3" /> + tax applies
          </span>
        </div>
        <StudentCertificateTable data={data} />
      </div>
    </>
  );
};

export default StudentCertificatePage;
