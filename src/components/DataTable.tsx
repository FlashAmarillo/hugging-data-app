'use client'

// import dynamic from 'next/dynamic'
import { useState } from 'react'
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  type SortingState,
  getSortedRowModel,
} from "@tanstack/react-table"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { CsvRowResponse } from '@/types'

interface ResultsTableProps<TData, TValue> {
  data: TData[],
  columns: ColumnDef<TData, TValue>[]
}

export default function DataTable<TData extends CsvRowResponse, TValue>({
  data,
  columns
}: ResultsTableProps<TData, TValue>) {
  
  const [sorting, setSorting] = useState<SortingState>([])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  })

  return (
    <div className="rounded-md border overflow-x-auto max-w-full">
      <Table className="w-full table-fixed">
        
        <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <TableHead 
                  key={header.id}
                  className='font-semibold text-center'
                  style={{ width: header.column.columnDef.size || 'auto', maxWidth: '100%' }}
                  >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              )
            })}
          </TableRow>
        ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row?.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  
                  <TableCell
                    key={cell.id}
                    className="break-words whitespace-normal"
                    style={{ 
                      width: 'auto',
                      maxWidth: cell.column.columnDef.size || '200px',
                      overflow: 'hidden',
                      textAlign: cell.column.columnDef.header === 'Text' ? 'left' : 'center'
                    }}
                  >
                    {flexRender(
                      cell.column.columnDef.cell ?? '',
                      cell.getContext()
                    )}
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
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}