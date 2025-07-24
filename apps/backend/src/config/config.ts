import * as process from 'node:process';

export const config = {
  app: {
    name: 'MoodFlow',
    version: '1.0.0',
  },
  api: {
    port: process.env.BACKEND_PORT || 3001,
    cors: {
      origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    },
  },
  database: {
    url: process.env.DATABASE_URL || 'mongodb://localhost:27017/moodflow',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'your-secret-key',
    expiresIn: '7d',
  },
  groq: {
    apiKey: process.env.GROQ_API_KEY,
    model: 'llama3-8b-8192',
  },
};
