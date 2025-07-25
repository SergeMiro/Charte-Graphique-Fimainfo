import { VercelRequest, VercelResponse } from '@vercel/node';
import express from 'express';
import { registerRoutes } from '../server/routes';

// Create Express app
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Initialize server
let server: any = null;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    // Initialize server if not already done
    if (!server) {
      server = await registerRoutes(app);
    }
    
    // Handle the request
    return app(req as any, res as any);
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
