// Types for the chat with AI feature

export type MessageRole = 'user' | 'assistant';

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
}

export interface ChatSession {
  id: string;
  title: string;
  timestamp: Date;
  messages: Message[];
}

export interface DemoResponses {
  pricing: string;
  metrics: string;
  forecast: string;
  [key: string]: string;
}
