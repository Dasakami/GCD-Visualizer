export interface AuthResponse {
  access_token: string;
  token_type: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
}

export interface User {
  email: string;
  id?: string;
}

export interface GcdStep {
  step: number;
  a: number;
  b: number;
  quotient?: number;
  remainder?: number;
  operation?: string;
  explanation?: string;
}

export interface GcdResult {
  result: number;
  steps: GcdStep[];
  a: number;
  b: number;
}

export interface GcdCalculateRequest {
  a: number;
  b: number;
}

export interface HistoryItem {
  id: string;
  a: number;
  b: number;
  result: number;
  steps: GcdStep[];
  created_at: string;
}

export interface TheoryContent {
  title: string;
  content: string;
}

export type Theme = 'light' | 'dark';
export type PlaybackSpeed = 0.5 | 1 | 2;
