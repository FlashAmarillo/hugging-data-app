'use client';

import { ColumnDef } from "@tanstack/react-table"

export const columns: ColumnDef<CsvRowResponse>[] = [
  {
    accessorKey: "text",
    header: "Text",
  },
  {
    accessorKey: "likes",
    header: "Likes",
  },
  {
    accessorKey: "comments",
    header: "Comments",
  },
  {
    accessorKey: "shares",
    header: "Shares",
  },
  {
    accessorKey: "reactions_count",
    header: "Reactions Count",
  },
  {
    accessorKey: "results",
    header: "Results",
    cell: ({ getValue }) => JSON.stringify(getValue(), null, 2),  // Puedes ajustar cómo quieres mostrar esto
  },
  
]