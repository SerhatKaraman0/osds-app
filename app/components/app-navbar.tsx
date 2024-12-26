"use client";

import { Bug } from "lucide-react";
import Link from "next/link";
import { NextResponse } from "next/server";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import React, { useEffect, useState } from "react";
import SVGComponent from "./coin-svg";
import { getSession, logout } from "@/actions";
import { Toaster } from "sonner";
import { toast } from "sonner";
import { emitWarning } from "process";
import { redirect } from "next/dist/server/api-utils";

async function getUserBalance() {
  const user = await getSession();
  return user.balance;
}

async function handleLoadCredit(creditAmount) {
  const user = await getSession();
  const res = await fetch(`http://0.0.0.0:8080/backend/create/request/${user.userId}/to/${user.assigned_staff_id}/amount/${Number(creditAmount)}`, {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      request_id: 0,
      request_sender_id: user.userId,
      request_receiver_id: user.assigned_staff_id,
      request_state: "pending",
      request_type: "transaction",
      request_amount: Number(creditAmount)
    })
  });
  return res.ok;
}

export default function NavbarComponent({ role }: { role: string }) {
  const [balance, setBalance] = useState(0);
  const [requestAmount, setRequestAmount] = useState(0);

  const handleIncrement = () => {
    setRequestAmount(prev => prev + 281);
  };

  const handleDecrement = () => {
    setRequestAmount(prev => Math.max(0, prev - 281));
  };

  const formattedBalance = balance.toString().padStart(5, '0');

  useEffect(() => {
    const fetchBalance = async () => {
      const user = await getSession();
      if (user.role === "student") {
        const userBalance = await getUserBalance();
        const data = JSON.parse(JSON.stringify(userBalance));
        const formattedBalance = data.toString().padStart(5, '0');
        setBalance(formattedBalance);
      }
    };

    fetchBalance();
  }, []);

  return (
    <>
      <Toaster richColors />
      <header className="flex h-20 w-full shrink-0 items-center px-4 md:px-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <MenuIcon className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <Link href="#" className="mr-6 hidden lg:flex" prefetch={false}>
              <MountainIcon className="h-6 w-6" />
              <span className="sr-only">Acme Inc</span>
            </Link>
            <div className="grid gap-2 py-6">
              <Link
                href="#"
                className="flex w-full items-center py-2 text-lg font-semibold"
                prefetch={false}
              >
                Home
              </Link>
              <Link
                href="#"
                className="flex w-full items-center py-2 text-lg font-semibold"
                prefetch={false}
              >
                About
              </Link>
              <Link
                href="#"
                className="flex w-full items-center py-2 text-lg font-semibold"
                prefetch={false}
              >
                Services
              </Link>
              <Link
                href="#"
                className="flex w-full items-center py-2 text-lg font-semibold"
                prefetch={false}
              >
                Contact
              </Link>
            </div>
          </SheetContent>
        </Sheet>
        <Link href="#" className="mr-6 hidden lg:flex" prefetch={false}>
          <Bug className="h-6 w-6" />
          <span className="pl-3">OSDS</span>
        </Link>
        <nav className="ml-auto hidden lg:flex gap-6">
          {role === "student" ? (
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" >
                  <SVGComponent /> <span className="font-geist">{formattedBalance}</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-60">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">Load Credit</h4>
                    <p className="text-sm text-muted-foreground">
                      Load Credit to request certificate.
                    </p>
                  </div>
                  <div className="grid gap-2">
                    <div className="grid grid-cols-3 items-center gap-4">
                      <Label htmlFor="credit">Credit Amount</Label>
                      <div className="col-span-2 flex items-center gap-2">
                        <Button
                          variant="outline"
                          onClick={handleDecrement}
                          className="px-3 h-8"
                        >
                          -
                        </Button>

                        <Input
                          id="credit"
                          value={requestAmount}
                          readOnly
                          className="text-center h-8"
                        />

                        <Button
                          variant="outline"
                          onClick={handleIncrement}
                          className="px-3 h-8"
                        >
                          +
                        </Button>
                      </div>
                    </div>
                    <div className="grid items-center gap-4">
                      <Button variant="outline" onClick={async () => {
                        const req = await handleLoadCredit(requestAmount);
                        if (req) {
                          toast.success("Transaction Request has been created", {
                            description: "Sunday, December 03, 2023 at 9:00 AM",
                            action: {
                              label: "Undo",
                              onClick: () => console.log("Undo"),
                            },
                          });
                        }
                      }}>
                        Load Credit
                      </Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          ) : (
            ""
          )}
          {role !== "login" ? (
            <Button variant="destructive" onClick={async () => {
              await logout();
              return NextResponse.redirect(
                new URL("http://localhost:3000/login")
              )
            }}>
              Logout
            </Button>
          ) : (
            ""
          )}
        </nav>
      </header>
    </>
  );
}

function MenuIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

function MountainIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}