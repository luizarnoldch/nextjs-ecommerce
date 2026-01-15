"use client"

import {
  type ColumnDef,
  type ColumnFiltersState,
  getCoreRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type PaginationState,
  type SortingState,
  useReactTable,
  type VisibilityState
} from "@tanstack/react-table"
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react"
import { type ReactNode, useId, useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import TableFilters from "./table-filters"
import TablePagination from "./table-pagination"

type GenericTableProps<T> = {
  columns: ColumnDef<T>[]
  data: T[]
  onDeleteRows?: (rows: T[]) => void
  onDoubleClickRow?: (row: T) => void
  addNewItemButton?: ReactNode
  searchFilterPlaceholder?: string
  searchFilterColumnName: string
  filterComponent?: ReactNode
  columnTranslations?: Record<string, string>
}

function GenericTable<T>({
  columns,
  data,
  onDeleteRows,
  onDoubleClickRow,
  addNewItemButton,
  searchFilterColumnName,
  searchFilterPlaceholder = "Filter by name...",
  filterComponent,
  columnTranslations
}: GenericTableProps<T>) {
  const id = useId()

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10
  })
  const [sorting, setSorting] = useState<SortingState>([])

  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters,
      columnVisibility,
      pagination,
      sorting
    },
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues()
  })

  // Proceso para eliminar filas seleccionadas
  const handleDeleteRows = () => {
    if (onDeleteRows) {
      const selectedData = table.getSelectedRowModel().rows.map(row => row.original)
      onDeleteRows(selectedData)
      table.resetRowSelection()
    }
  }

  return (
    <div className="space-y-4">
      <TableFilters
        table={table}
        id={id}
        addNewItemButton={addNewItemButton}
        onDeleteRows={handleDeleteRows}
        searchFilterPlaceholder={searchFilterPlaceholder}
        searchFilterColumnName={searchFilterColumnName}
        filterComponent={filterComponent}
        columnTranslations={columnTranslations}
      />

      <div className="overflow-hidden rounded-md border">
        <Table className="w-full overflow-x-auto">
          <TableHeader className="bg-secondary">
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <TableHead
                    key={header.id}
                    style={{ width: `${header.getSize()}px` }}
                    className="h-11"
                  >
                    {header.isPlaceholder ? null : header.column.getCanSort() ? (
                      <button
                        type="button"
                        className={"flex h-full w-full cursor-pointer select-none items-center justify-between gap-2"}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {header.column.columnDef.header instanceof Function
                          ? header.column.columnDef.header(header.getContext())
                          : header.column.columnDef.header}
                        {{
                          asc: (
                            <ChevronUpIcon
                              className="shrink-0 opacity-60"
                              size={16}
                              aria-hidden="true"
                            />
                          ),
                          desc: (
                            <ChevronDownIcon
                              className="shrink-0 opacity-60"
                              size={16}
                              aria-hidden="true"
                            />
                          )
                        }[header.column.getIsSorted() as string] ?? null}
                      </button>
                    ) : header.column.columnDef.header instanceof Function ? (
                      header.column.columnDef.header(header.getContext())
                    ) : (
                      header.column.columnDef.header
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map(row => (
                <TableRow
                  key={row.id}
                  onDoubleClick={() => onDoubleClickRow?.(row.original)}
                  data-state={row.getIsSelected() ? "selected" : undefined}
                >
                  {row.getVisibleCells().map(cell => (
                    <TableCell
                      key={cell.id}
                      className="last:py-0"
                    >
                      {cell.column.columnDef.cell instanceof Function
                        ? cell.column.columnDef.cell(cell.getContext())
                        : cell.column.columnDef.cell}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Sin registros
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <TablePagination
        table={table}
        id={id}
      />
    </div>
  )
}

export default GenericTable
