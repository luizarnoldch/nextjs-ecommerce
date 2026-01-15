import type { Table } from "@tanstack/react-table"
import { Columns3Icon, ListFilterIcon, TrashIcon, XIcon } from "lucide-react"
import { type ReactNode, useRef } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"

interface TableFiltersProps<T> {
  table: Table<T>
  id: string
  onDeleteRows?: () => void
  addNewItemButton?: ReactNode
  searchFilterPlaceholder?: string
  searchFilterColumnName: string
  filterComponent?: ReactNode
  columnTranslations?: Record<string, string>
}

function TableFilters<T>({
  table,
  id,
  addNewItemButton,
  onDeleteRows,
  searchFilterPlaceholder,
  searchFilterColumnName,
  filterComponent,
  columnTranslations
}: TableFiltersProps<T>) {
  // Ejemplo simple: filtro global en la primera columna (se puede mejorar o hacer multi)
  const inputRef = useRef<HTMLInputElement>(null)

  // Ejemplo de filtros de columnas visibles
  const columnsWithVisibility = table.getAllColumns().filter(col => col.getCanHide())

  const translations = columnTranslations ?? {}

  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        {/* Input para filtro global */}
        <div className="relative">
          <Input
            id={`${id}-input`}
            ref={inputRef}
            className="peer min-w-40 ps-9 md:min-w-60 xl:min-w-80"
            value={(table.getColumn(searchFilterColumnName)?.getFilterValue() ?? "") as string}
            onChange={e => table.getColumn(searchFilterColumnName)?.setFilterValue(e.target.value)}
            placeholder={`${searchFilterPlaceholder}...`}
            type="text"
            aria-label={`${searchFilterPlaceholder}`}
          />
          <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
            <ListFilterIcon
              size={16}
              aria-hidden="true"
            />
          </div>
          {!!table.getColumn(searchFilterColumnName)?.getFilterValue() && (
            <Button
              className="absolute inset-y-2 end-2 flex size-5 h-full items-center justify-center rounded-md text-muted-foreground/80 transition"
              onClick={() => {
                table.getColumn(searchFilterColumnName)?.setFilterValue("")
                inputRef.current?.focus()
              }}
              aria-label="Clear filter"
              variant={"outline"}
              size={"icon"}
            >
              <XIcon className="" />
            </Button>
          )}
        </div>

        {filterComponent && <>{filterComponent}</>}

        {/* Toggle columnas */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
            >
              <Columns3Icon
                size={16}
                aria-hidden="true"
              />
              Columnas
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Mostrar:</DropdownMenuLabel>
            {columnsWithVisibility.map(col => (
              <DropdownMenuCheckboxItem
                key={col.id}
                className=""
                checked={col.getIsVisible()}
                onCheckedChange={value => col.toggleVisibility(!!value)}
                onSelect={e => e.preventDefault()}
              >
                {translations[col.id] ?? col.id}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex items-center gap-3">
        {table.getSelectedRowModel().rows.length > 0 && onDeleteRows && (
          <Button
            variant="outline"
            size="sm"
            onClick={onDeleteRows}
          >
            <TrashIcon
              size={16}
              aria-hidden="true"
            />
            Delete ({table.getSelectedRowModel().rows.length})
          </Button>
        )}
        {addNewItemButton}
      </div>
    </div>
  )
}

export default TableFilters
