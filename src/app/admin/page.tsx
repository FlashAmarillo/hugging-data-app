'use client'

import { useState, useRef } from 'react'
import dynamic from 'next/dynamic'
// import CsvUploader from '@/components/CsvUploader'
// import DataTable from '@/components/DataTable'
import { columns } from '@/components/Columns'
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

const CsvUploader = dynamic(() => import('@/components/CsvUploader'), { ssr: false })
const DataTable = dynamic(() => import('@/components/DataTable'), { ssr: false })

export default function AdminPage() {

  const [data, setData] = useState<CsvRow[]>([])
  const [processedData, setProcessedData] = useState<CsvRowResponse[]>([])
  const [isProcessing, setIsProcessing] = useState<boolean>(false)
  const [progress, setProgress] = useState(0)
  const [isCancelled, setIsCancelled] = useState<boolean>(false)
  const abortControllerRef = useRef<AbortController | null>(null)
  const [numberProcessData, setNumberProcessData] = useState<number>(0)
  
  // const loggedInUser: LoggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}')

  const handleDataLoaded = (loadedData: CsvRow[]) => {
    setData(loadedData)
  }

  const processData = async () => {
    
    setIsProcessing(true)
    setIsCancelled(false)
    const processed = []
    abortControllerRef.current = new AbortController()

    try {
      const toProcess = numberProcessData === data.length ? data : data.slice(0, numberProcessData)
      for (let i = 0; i < toProcess.length; i++) {
        if (isCancelled) {
          break
        }
        const row = toProcess[i]
        const sentimiento = await analizarSentimiento(row.text, abortControllerRef.current.signal)
        const emocion = await analizarEmocion(row.text, abortControllerRef.current.signal)
        const processedRow = { ...row, sentimiento, emocion }
        processed.push(processedRow)
        setProgress(((i + 1) / data.length) * 100)
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        console.log('Processing was aborted')
      } else {
        console.error('Processing cancelled or failed:', error)
      }
    }
    setProcessedData(processed)
    setIsProcessing(false)
  }

  const cancelProcessing = () => {
    setIsCancelled(true)
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
            columns={columns} 
          />
        </div>
      )}
    </div>
  )
}