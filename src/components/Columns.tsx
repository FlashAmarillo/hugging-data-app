

import dynamic from 'next/dynamic'
import type { ColumnDef, Row } from "@tanstack/react-table"
import type { CsvRowResponse } from '@/types'
const InfoComponent = dynamic(() => import('./InfoComponent'), { ssr: false })



// Función auxiliar para formatear el header
function formatHeaderText(header: string): string {
  return header
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

// Componente para la celda de resultados
function ResultCell({ row }: { row: Row<CsvRowResponse> }) {
  const hasResults = row?.original?.sentimiento || row?.original?.emocion
  if (!hasResults) return null

  return (
    <InfoComponent info={row?.original} />
  )
}

export function generateColumns(headers: string[]): ColumnDef<CsvRowResponse>[] {
  // Crear las columnas basadas en los headers del .CSV
  const dynamicColumns: ColumnDef<CsvRowResponse>[] = headers.map((header) => {
    // Si el header está vacío o es "", usar "index"
    const columnHeader = header.trim() === '' ? 'index' : header
    const accessorKey = columnHeader.toLowerCase()

    return {
      accessorKey,
      header: columnHeader === 'index' 
        ? '#' // Mostrar # como título de la columna index
        : formatHeaderText(columnHeader),
      cell: ({ row }) => {
        const value = row.getValue(accessorKey)
        
        // Si es la columna index, mostrar el número + 1 para que empiece desde 1
        if (accessorKey === 'index') {
          return row.index + 1
        }
        
        // Si el valor es un número, formatearlo con separadores de miles
        if (typeof value === 'number') {
          return value.toLocaleString()
        }
        return value
      },
      // Hacer la columna index más pequeña
      size: accessorKey === 'index' ? 70 : undefined,
    }
  })

  // Añadir la columna de resultados al final
  const resultsColumn: ColumnDef<CsvRowResponse> = {
    accessorKey: "results",
    header: "Results",
    cell: ResultCell
  }

  return [...dynamicColumns, resultsColumn]
}
