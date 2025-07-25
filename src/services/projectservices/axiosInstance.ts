import axios from 'axios';
export const STATIC_TOKEN =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo3LCJlbWFpbCI6InRlc3RpbmdAbmxhLmNvbSIsInN0YXR1cyI6ImFjdGl2ZSIsInJvbGUiOiJ1c2VyIiwic2hvd19wb3B1cCI6MSwicGFzc3dvcmQiOiIkMmEkMTAkeW9HSi5WU3hRck1kWGpIc0NHMENWLnhCUWxBSlppWmdCaFZ5UGZCVlIyaGVlREZHUVcyclMiLCJjbGllbnRfZmlyc3RfbmFtZSI6IlRlc3RpbmciLCJjbGllbnRfbGFzdF9uYW1lIjoiTmFtZTEiLCJmdWxsX25hbWUiOm51bGwsImFkZHJlc3MiOiJqYWhza2pkbiIsInBob25lX251bWJlciI6IjIzMjEzMzQzIiwiY2xpZW50X2xvZ28iOm51bGwsImNyZWF0ZWRfYnkiOm51bGwsImNyZWF0ZWRBdCI6IjIwMjItMTItMDdUMjM6NDQ6MDIuMDAwWiIsInVwZGF0ZWRBdCI6IjIwMjMtMDQtMThUMTc6Mjk6NDMuMDAwWiJ9LCJpYXQiOjE3NTI1NTM1MzMsImV4cCI6MTc1NTE0NTUzM30.6FZGkZOd4ircbZzfELkcCWJ87nnLos_QsY-q0HvFZGs';
export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    Authorization: STATIC_TOKEN,
    'Content-Type': 'application/json',
  },
});

// Axios for Python backend
export const axiosPythonInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL_PYTHON,
  headers: {
    Authorization: STATIC_TOKEN,
    'Content-Type': 'application/json',
  },
});
