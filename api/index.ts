import { VercelRequest, VercelResponse } from '@vercel/node';
import express from 'express';
import { registerRoutes } from '../server/routes';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let server: any;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!server) {
    server = await registerRoutes(app);
  }
  
  // Handle the request
  app(req as any, res as any);
}
