
export const analizarSentimiento = async (text: string, signal: AbortSignal) => {
  if (typeof text !== 'string') {
    throw new Error('Text must be a string');
  }
  const response = await fetch('/api', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      model: 'finiteautomata/beto-sentiment-analysis',
      inputs: text
    }),
    signal
  })
  const result = await response.json()
  return result
}

export const analizarEmocion = async (text: string, signal: AbortSignal) => {
  if (typeof text !== 'string') {
    throw new Error('Text must be a string');
  }
  const response = await fetch('/api', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      model: 'finiteautomata/beto-emotion-analysis',
      inputs: text,
    }),
    signal
  })
  const result = await response.json()
  return result
}