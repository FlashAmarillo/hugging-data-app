export type Credentials = {
  email: string;
  password: string;
}

export interface User {
  name: string;
  email: string;
  password: string;
}

export interface NotificationEntry {
  text: string;
  date: string;
  read: boolean;
}

export interface LoggedInUser {
  name: string;
  email: string;
}

export interface CsvRow {
  text: string;
  likes: string;
  comments: string;
  shares: string;
  reactions_count: string;
}

export interface Emocion {
  label: string;
  score: number;
}

export interface Sentimiento {
  label: string;
  score: number;
}

export interface CsvRowResponse {
  [key: string]: string | Sentimiento[] | Emocion[] | undefined;
  likes?: string;
  comments?: string;
  shares?: string;
  reactions_count?: string;
  text?: string;
  sentimiento?: Sentimiento[];
  emocion?: Emocion[];
} 