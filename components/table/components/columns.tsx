"use client"

import { ColumnDef } from "@tanstack/react-table"

import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"

import { additionaltimings, subjects, levels, papers } from "../data/data"
import { Task } from "../data/schema"
import { DataTableColumnHeader } from "./data-table-column-header"
import { DataTableRowActions } from "./data-table-row-actions"

export const columns: ColumnDef<Task>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  // {
  //   accessorKey: "id",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Task" />
  //   ),
  //   cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => {
      const times = additionaltimings.find((times) => times.value === row.original.times)

      return (
        <div className="flex space-x-2 max-w-64">
          
          <span className=" truncate font-medium overflow-hidden w-full  ">
            {row.getValue("title")}
          </span>
          {times && <Badge variant="outline" className=" min-w-fit" >{times.label}</Badge>}
        </div>
      )
    },
    enableHiding: false,
    enableSorting: false,
  },
  {
    accessorKey: "subject",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Subject" />
    ),
    cell: ({ row }) => {
      const subject = subjects.find(
        (subject) => subject.value === row.getValue("subject")
      )

      if (!subject) {
        return null
      }

      return (
        <div className="flex items-center">
          {subject.icon && (
            <subject.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{subject.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "paper",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Paper" />
    ),
    cell: ({ row }) => {
      const paper = papers.find(
        (paper) => paper.value === row.getValue("paper")
      )

      if (!paper) {
        return null
      }

      return (
        <div className="flex w-[100px] items-center">
          
          <span>{paper.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "level",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Level" />
    ),
    cell: ({ row }) => {
      const level = levels.find(
        (level) => level.value === row.getValue("level")
      )

      if (!level) {
        return null
      }

      return (
        <div className="flex w-[100px] items-center">
          {level.icon && (
            <level.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{level.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
