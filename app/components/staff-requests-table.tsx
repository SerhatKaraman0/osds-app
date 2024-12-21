"use client";
import * as React from "react";
import { useCallback, useMemo, useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  RowExpanding,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { postTranscriptRequest } from "../api/actions";
import { toast } from "sonner";
import { ArrowUpDown, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
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
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getSession } from "@/actions";


interface RequestDetails {
  id: number;
  request_sender_id: string;
  request_type: "transcript" | "transaction";
  request_state: "pending" | "approved" | "denied";
  request_date: string;
}

interface RequestsTableProps {
  data: RequestDetails[];
}

const requestService = {
  async updateRequestState(requestId: number, state: "approved" | "denied") {
    try {
      const response = await fetch(
        `http://0.0.0.0:8080/backend/requests/${requestId}/state/${state}`,
        {
          method: "PUT",
          headers: { Accept: "application/json" },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      toast[state === "approved" ? "success" : "error"](
        `Request ${state === "approved" ? "Approved" : "Denied"}`
      );
      return data;
    } catch (error) {
      toast(`Error updating request: ${error.message}`);
      console.error("Error updating request:", error);
      throw error;
    }
  },

  async fetchRequests() {
    try {
      const user = await getSession();
      const response = await fetch(`http://0.0.0.0:8080/backend/requests/${user.userId}`, {
        method: "GET",
        headers: { Accept: "application/json" },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      return data.requests;
    } catch (error) {
      toast(`Error fetching requests: ${error.message}`);
      console.error("Error fetching requests:", error);
      throw error;
    }
  },
};

const REQUEST_TYPE_ORDER = {
  transcript: 0,
  transaction: 1,
};

const REQUEST_STATE_ORDER = {
  pending: 0,
  approved: 1,
  denied: 2,
};

const TranscriptDialog = React.memo(({ studentId }: { studentId: string }) => {
  const [courses, setCourses] = useState<{ course_code: string; course_name: string, grade: string, cr: string }[]>(
    Array(5).fill({ course_code: "", course_name: "", grade: "", ch: "16", cr: "" })
  );

  const autoPopulateCourses = () => {
    const sampleCourses = [
      { course_code: "CS101", course_name: "Computer Science 101", grade: "A", ch:"16", cr: "4" },
      { course_code: "MATH101", course_name: "Calculus I", grade: "B", ch:"9", cr: "3" },
      { course_code: "ENG101", course_name: "English Literature", grade: "B", ch:"9", cr: "3" },
      { course_code: "HIST101", course_name: "History of the World", grade: "A-", ch:"14.8", cr: "4" },
      { course_code: "PHYS101", course_name: "Physics I", grade: "A-", ch:"14.8", cr: "4" },
    ];
    setCourses(sampleCourses);
  };


  const updateCourse = (index: number, field: string, value: string) => {
    setCourses((prev) =>
      prev.map((course, i) => (i === index ? { ...course, [field]: value } : course))
    );
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Send Transcript</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>Send Transcript</DialogTitle>
            <DialogDescription>
              Enter the course codes and grades
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={postTranscriptRequest}>
            {courses.map((course, index) => (
              <div key={index} className="grid grid-cols-4 items-center gap-4 mb-4">
                <Label className="text-right">Course {index + 1}</Label>
                <div className="col-span-3 grid grid-cols-4 gap-4">
                  <Input
                    placeholder="Course Code"
                    value={course.course_code}
                    onChange={(e) => updateCourse(index, 'course_code', e.target.value)}
                    required
                  />
                  <Input
                    placeholder="Course Name"
                    value={course.course_name}
                    onChange={(e) => updateCourse(index, 'course_name', e.target.value)}
                    required
                  />
                  <Input
                    placeholder="Grade"
                    value={course.grade}
                    onChange={(e) => updateCourse(index, 'grade', e.target.value)}
                    required
                  />
                  <Input
                    placeholder="Cr."
                    value={course.cr}
                    onChange={(e) => updateCourse(index, 'cr', e.target.value)}
                    required
                  />
                </div>
              </div>
            ))}
            <DialogFooter className="mt-6">
              <Button type="button" onClick={() => { autoPopulateCourses() }}>Auto Populate</Button>
              <Button type="submit" onClick={async () => {
                const result = await postTranscriptRequest(studentId, courses)
                if (result.success) {
                  toast.success("Transcript sent successfully");
                } else {
                  toast.error("Error sending transcript");
                }
              }}>Send</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog >
    </>
  );
});

TranscriptDialog.displayName = "TranscriptDialog";

export default function StaffRequestsTable({ data }: RequestsTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [requestsData, setRequestsData] = useState<RequestDetails[]>(data);

  const handleApprove = useCallback(async (requestId: number) => {
    await requestService.updateRequestState(requestId, "approved");
  }, []);

  const handleDeny = useCallback(async (requestId: number) => {
    await requestService.updateRequestState(requestId, "denied");
  }, []);

  const handleRefresh = useCallback(async () => {
    try {
      const user = await getSession();
      const freshData = await fetch(`http://0.0.0.0/frontend/requests/${user.userId}`, {
        method: "GET",
        headers: { Accept: "application/json" },
      });
      setRequestsData(freshData.requests);
      toast.success("Requests data refreshed successfully");
    } catch (error) {
      toast.error("Failed to refresh requests data");
    }
  }, []);

  const columns = useMemo<ColumnDef<RequestDetails>[]>(() => [
    {
      accessorKey: "something",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
    },
    {
      accessorKey: "id",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Request ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: "request_sender_id",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Sender ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: "request_type",
      header: "Type",
      sortingFn: (rowA, rowB) => (
        REQUEST_TYPE_ORDER[rowA.getValue("request_type")] -
        REQUEST_TYPE_ORDER[rowB.getValue("request_type")]
      ),
    },
    {
      accessorKey: "request_state",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          State
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      sortingFn: (rowA, rowB) => (
        REQUEST_STATE_ORDER[rowA.getValue("request_state")] -
        REQUEST_STATE_ORDER[rowB.getValue("request_state")]
      ),
    },
    {
      accessorKey: "request_date",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const { request_type, request_state, id, request_sender_id } = row.original;

        if (request_type === "transcript") {
          return (
            <div className="flex justify-center">
              <TranscriptDialog studentId={request_sender_id} />
            </div>
          );
        }

        if (request_type === "transaction") {
          if (request_state === "pending") {
            return (
              <div className="flex space-x-2 justify-center">
                <Button
                  variant="outline"
                  className="bg-green-300 w-24"
                  onClick={() => handleApprove(id)}
                >
                  Approve
                </Button>
                <Button
                  variant="destructive"
                  className="w-24"
                  onClick={() => handleDeny(id)}
                >
                  Deny
                </Button>
              </div>
            );
          }

          return (
            <div className="flex justify-center">
              <Button
                variant={request_state === "approved" ? "outline" : "destructive"}
                className={request_state === "approved" ? "bg-green-300 w-24" : "w-24"}
                disabled
              >
                {request_state === "approved" ? "Approved" : "Denied"}
              </Button>
            </div>
          );
        }

        return null;
      },
    },
  ], [handleApprove, handleDeny]);

  const initialSorting = useMemo(() => [
    { id: "request_state", desc: false },
    { id: "type", desc: false },
  ], []);

  const table = useReactTable({
    data: requestsData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting: initialSorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="flex justify-center items-start mt-18">
      <div className="w-4/5">
        <div className="flex justify-center items-center py-4">
          <Input
            placeholder="Filter ids..."
            value={(table.getColumn("id")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("id")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="outline" onClick={handleRefresh} className="ml-4">
            Refresh
          </Button>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="flex justify-between py-4 px-2">
          <div>
            <Button
              variant="outline"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              {"<<"}
            </Button>
            <Button
              variant="outline"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
            <Button
              variant="outline"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              {">>"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
