export interface User {
  id: string;
  name: string;
  email: string;
  username: string;
}

export interface SentimentResult {
  positive: number;
  neutral: number;
  negative: number;
  reviews: Array<{
    text: string;
    sentiment: 'positive' | 'neutral' | 'negative';
  }>;
}

export interface TeamMember {
  name: string;
  major: string;
  github: string;
  image: string;
}

export interface Message {
  id: string;
  text: string;
  isBot: boolean;
}