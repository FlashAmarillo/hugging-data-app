'use Client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

interface InfoComponentProps {
  info: CsvRowResponse;
}

const formatNumber = (num: string) => {
  return parseInt(num).toLocaleString('es-ES')
}

const getSentimentEmoji = (label: string) => {
  switch (label) {
    case 'POS':
      return '👍';
    case 'NEU':
      return '🙂';
    case 'NEG':
      return '👎';
    default:
      return '';
  }
}

export default function InfoComponent({ info }: InfoComponentProps) {
  return (
    <Dialog>
      <DialogTrigger
        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 my-4"
      >View Results</DialogTrigger>

      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="text-2xl font-bold mb-4">Analysis Results</DialogTitle>
          <DialogDescription>
            Analysis of the approximate results by feelings and emotions that can be generated in the texts.
          </DialogDescription>
        </DialogHeader>


        <ScrollArea className="flex-grow overflow-y-scroll overflow-auto h-1/2 md:h-fit">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
            <Card>
              <CardHeader>
                <CardTitle>Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <p><strong>Likes:</strong> {formatNumber(info.likes)}</p>
                <p><strong>Comments:</strong> {formatNumber(info.comments)}</p>
                <p><strong>Shares:</strong> {formatNumber(info.shares)}</p>
                <p><strong>Reactions Count:</strong> {formatNumber(info.reactions_count)}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Analyzed Text</CardTitle>
              </CardHeader>
              <CardContent className="text-sm max-h-40 overflow-y-auto">
                {info.text}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Feelings</CardTitle>
              </CardHeader>
              <CardContent>
                {info.sentimiento?.map((sent: Sentimiento) => (
                  <div key={sent.label} className="mb-2">
                    <div className="flex justify-between mb-1">
                      <span>{sent.label} {getSentimentEmoji(sent.label)}</span>
                      <span>{(sent.score * 100).toFixed(2)}%</span>
                    </div>
                    <Progress value={sent.score * 100} className="w-full" />
                  </div>
                ))}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Emotion</CardTitle>
              </CardHeader>
              <CardContent>
                {info.emocion?.map((emo: Emocion) => (
                  <div key={emo.label} className="mb-2">
                    <div className="flex justify-between mb-1">
                      <span>{emo.label}</span>
                      <span>{(emo.score * 100).toFixed(2)}%</span>
                    </div>
                    <Progress value={emo.score * 100} className="w-full" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
