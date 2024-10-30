'use client'

import { ChangeEvent, useState } from 'react'
import Papa from 'papaparse'
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface CsvUploaderProps {
  onDataLoaded: (data: CsvRow[], header: string[]) => void;
}

export default function CsvUploader({ onDataLoaded }: CsvUploaderProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target?.files?.[0]
    if (file) {
      setIsLoading(true)
      Papa.parse(file, {
        complete: (result) => {
          const headers = result?.meta?.fields as string[]
          const data = result?.data as CsvRow[]
          onDataLoaded(data, headers)
          setIsLoading(false)
        },
        header: true
      })
    }
  }

  return (
    <Card>
      <CardHeader className='p-2'>
        <CardTitle className='text-lg'>Load your .CSV file</CardTitle>
      </CardHeader>
      <CardContent className='p-2'>
        <Input 
          type="file" 
          accept=".csv" 
          onChange={handleFileUpload}
          disabled={isLoading}
        />
        {isLoading && <p>Loading...</p>}
      </CardContent>
    </Card>
  )
}