'use client'

import { useState, useRef } from 'react'
import dynamic from 'next/dynamic'
import { analizarSentimiento, analizarEmocion } from './fetchData'
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { generateColumns } from '@/components/Columns'
import type { ColumnDef } from '@tanstack/react-table'
import type { CsvRow, CsvRowResponse } from '@/types'

const CsvUploader = dynamic(() => import('@/components/CsvUploader'))
const DataTable = dynamic(() => import('@/components/DataTable'))

export default function AdminPage() {

  const [data, setData] = useState<CsvRow[]>([])
  const [headers, setHeaders] = useState<ColumnDef<CsvRowResponse>[]>([])
  const [processedData, setProcessedData] = useState<CsvRowResponse[]>([])
  const [isProcessing, setIsProcessing] = useState<boolean>(false)
  const [progress, setProgress] = useState(0)
  // const [isCancelled, setIsCancelled] = useState<boolean>(false)
  const abortControllerRef = useRef<AbortController | null>(null)
  const [numberProcessData, setNumberProcessData] = useState<number>(0)
  
  // funcion para guardar la informacion de los encabezados y los datos en el estado
  const handleDataLoaded = (loadedData: CsvRow[], loadedHeaders: string[]) => {
    setHeaders(generateColumns(loadedHeaders))
    setData(loadedData)
  }

  const processData = async () => {
    setIsProcessing(true)
    // setIsCancelled(false)
    setProgress(0)
    abortControllerRef.current = new AbortController()

    try {
      // Seleccionar los datos a procesar
      const toProcess = numberProcessData === data.length ? data : data.slice(0, numberProcessData)
      
      // Crear arrays de promesas para sentimientos y emociones
      const sentimientosPromises = toProcess.map(row => 
        analizarSentimiento(row.text, abortControllerRef.current!.signal)
      )
      
      const emocionesPromises = toProcess.map(row => 
        analizarEmocion(row.text, abortControllerRef.current!.signal)
      )

      // Contador para el progreso
      let completedRequests = 0
      const totalRequests = toProcess.length * 2 // Total de peticiones (sentimientos + emociones)

      // Crear un array de promesas con el manejo de progreso
      const allPromises = [...sentimientosPromises, ...emocionesPromises].map(promise =>
        promise.then(result => {
          completedRequests++
          setProgress((completedRequests / totalRequests) * 100)
          return result
        })
      )

      // Esperar a que todas las peticiones terminen
      const results = await Promise.all(allPromises)

      console.log(results)

      // Separar los resultados
      const sentimientos = results.slice(0, toProcess.length)
      const emociones = results.slice(toProcess.length)

      // Combinar los resultados con los datos originales
      const processed = toProcess.map((row, index) => ({
        ...row,
        sentimiento: sentimientos[index],
        emocion: emociones[index]
      }))

      setProcessedData(processed)
      console.log({
        title: "Processing complete",
        description: `Successfully processed ${processed.length} entries.`,
      })
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        console.log('Processing was aborted')
        console.log({
          title: "Processing cancelled",
          description: "The operation was cancelled by the user.",
        })
      } else {
        console.error('Processing failed:', error)
        console.log({
          variant: "destructive",
          title: "Processing failed",
          description: "An unexpected error occurred. Please try again.",
        })
      }
    } finally {
      setIsProcessing(false)
    }
  }

  const cancelProcessing = () => {
    // setIsCancelled(true)
    abortControllerRef.current?.abort()
  }

  const handleChangeNumberOfProcessData = (value: string) => {
    if(value === 'all') {
      setNumberProcessData(data.length)
    } else {
      setNumberProcessData(parseInt(value))
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <CsvUploader onDataLoaded={handleDataLoaded} />
      {data.length > 0 && (
        <div className='flex gap-4 items-center'>
          <Select onValueChange={handleChangeNumberOfProcessData}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select the number of entries to process" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="100">100</SelectItem>
              <SelectItem value="all">All</SelectItem>
            </SelectContent>
          </Select>

          <Button 
            onClick={processData}
            disabled={isProcessing || numberProcessData === 0}
            className="my-4"
          >Data processing
          </Button>

          {isProcessing && (
            <Button onClick={cancelProcessing} className="bg-red-500">
              Cancel
            </Button>
          )}
        </div>
      )}

      {isProcessing && (
        <div className="my-4">
          <Progress value={progress} className="w-full" />
          <p>Processing data: {Math.round(progress)}%</p>
        </div>
      )}

      {processedData.length > 0 && (
        <div className="container mx-auto py-10">
          <h2 className="text-xl font-semibold mb-4">Results</h2>
          <DataTable 
            data={processedData}
            columns={headers} 
          />
        </div>
      )}
    </div>
  )
}