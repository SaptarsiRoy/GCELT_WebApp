"use client"

//icons
import { X } from "lucide-react"

// Global imports
import { Table } from "@tanstack/react-table"

// Local imports
import { DataTableFacetedFilter } from "./data-table-faceted-filter"

// Components
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { DataTableViewOptions } from "@/app/components/customUi/dataTable/data-table-view-options"
//types
import { SafeUser } from "@/app/types";


interface DataTableToolbarProps<SafeUser> {
  table: Table<SafeUser>
}

export function DataTableToolbar<SafeUser>({
  table,
}: DataTableToolbarProps<SafeUser>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter Students by Name..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        <Input
          placeholder="Filter Students by email..."
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {/* {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={statuses}
          />
        )}
        {table.getColumn("priority") && (
          <DataTableFacetedFilter
            column={table.getColumn("priority")}
            title="Priority"
            options={priorities}
          />
        )} */}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  )
}