import { NextRequest, NextResponse } from 'next/server'
import { InferenceClient } from '@huggingface/inference'

const hf = new InferenceClient(process.env.NEXT_PUBLIC_HUGGINGFACE_API_TOKEN)

export async function POST(request: NextRequest) {
  const {inputs, model}  = await request.json()
  
  if (typeof inputs !== 'string') {
    return NextResponse.json({ error: 'Invalid input type', details: 'Text must be a string' }, { status: 400 })
  }
  try {
    const result = await hf.textClassification({
      model,
      inputs
    })
    return NextResponse.json(result, { status: 200 })
    
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error processing the request:', error.message)
      return NextResponse.json({ error: 'Error processing the request', details: error.message }, { status: 500 })
    } else {
      console.error('Unexpected error:', error)
      return NextResponse.json({ error: 'Unexpected error occurred' }, { status: 500 })
    }
  }
}
