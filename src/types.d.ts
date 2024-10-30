
type Credentials = {
  email: string;
  password: string;
}

interface User {
  name: string;
  email: string;
  password: string;
}

interface NotificationEntry {
  text: string;
  date: string;
  read: boolean;
}

interface LoggedInUser {
  name: string;
  email: string;
}

interface CsvRow {
  text: string;
  likes: string;
  comments: string;
  shares: string;
  reactions_count: string;
}

interface Emocion {
  label: string;
  score: number;
}

interface Sentimiento {
  label: string;
  score: number;
}

type CsvRowResponse = {
  [key: string]: string;
  text: string
  likes: string
  comments: string
  shares: string
  reactions_count: string
  sentimiento?: Sentimiento[]
  emocion?: Emocion[]
}

