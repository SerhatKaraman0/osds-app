"use client";

import React, { useEffect, useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import { ChevronDown, ArrowUpDown } from "lucide-react";
import { updateStudentInfo } from "../api/actions";
import { StudentAccountDetails } from "../models/interfaces";

const studentColumns: ColumnDef<StudentAccountDetails>[] = [
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
    id: "id",
    accessorKey: "id",
  },
  {
    accessorKey: "std_name",
    header: "Name",
  },
  {
    accessorKey: "department",
    header: "Department",
  },
  {
    accessorKey: "std_academic_year",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Academic Year
        <ArrowUpDown />
      </Button>
    ),
  },
  {
    accessorKey: "credits",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Credits
        <ArrowUpDown />
      </Button>
    ),
  },
  {
    accessorKey: "register_date",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Register Date
        <ArrowUpDown />
      </Button>
    ),
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const [studentId, setStudentId] = useState("");
      const [department, setDepartment] = useState("");
      const [academicYear, setAcademicYear] = useState("");
      const [semester, setSemester] = useState("");

      const handleSave = async () => {
        try {
          const response = await updateStudentInfo(
            row.original.id,
            studentId,
            department,
            academicYear,
            semester
          );
          if (response) {
            toast.success("Student information updated successfully.");
          } else {
            toast.error("Failed to update student information.");
          }
        } catch (error) {
          toast.error("An error occurred while updating.");
        }
      };

      return (
        <div className="flex space-x-2">
          <Dialog>
            <DialogTrigger>
              <Button variant="outline">Edit</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Student Information</DialogTitle>
                <DialogDescription>
                  Update the student's information below.
                </DialogDescription>
              </DialogHeader>
              <form className="space-y-4">
                <div>
                  <label
                    htmlFor="std_id"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Student ID
                  </label>
                  <Input
                    id="std_id"
                    type="text"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    htmlFor="department"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Department
                  </label>
                  <Input
                    id="department"
                    type="text"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    htmlFor="std_academic_year"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Academic Year
                  </label>
                  <Input
                    id="std_academic_year"
                    type="text"
                    value={academicYear}
                    onChange={(e) => setAcademicYear(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    htmlFor="std_semester"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Semester
                  </label>
                  <Input
                    id="std_semester"
                    type="text"
                    value={semester}
                    onChange={(e) => setSemester(e.target.value)}
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button
                    type="button"
                    variant="default"
                    className="bg-green-700"
                    onClick={handleSave}
                  >
                    Save
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      );
    },
  },
];

interface StudentsTableProps {
  data: StudentAccountDetails[];
}

export default function StaffStudentsTable({ data }: StudentsTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns: studentColumns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="flex justify-center items-start mt-8">
      <div className="w-4/5">
        <Input
          placeholder="Filter students..."
          value={
            (table.getColumn("std_name")?.getFilterValue() as string) ?? ""
          }
          onChange={(e) =>
            table.getColumn("std_name")?.setFilterValue(e.target.value)
          }
          className="mb-4"
        />
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.length > 0 ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={studentColumns.length}
                    className="text-center"
                  >
                    No data available.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex justify-end mt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
