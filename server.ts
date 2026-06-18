import express from 'express';
import http from 'http';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { config } from './server/config/env';
import { initSocket } from './server/services/socket';
import { errorHandler } from './server/middlewares/errorHandler';
import masterRouter from './server/routes/index';

async function startServer() {
  const app = express();
  const server = http.createServer(app);

  // Initialize unified Socket.IO real-time channels
  initSocket(server);

  // Standard payload parsers
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Custom high-performance CORS header middleware
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', config.CORS_ORIGIN);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    
    if (req.method === 'OPTIONS') {
      res.sendStatus(200);
    } else {
      next();
    }
  });

  // Mount API dispatch center under /api namespace
  app.use('/api', masterRouter);

  // Serve static assets directory if it exists
  app.use('/assets', express.static(path.join(process.cwd(), 'assets')));

  // Check running environment and hot wire the appropriate server layer
  if (config.NODE_ENV !== 'production') {
    console.log('⚡ Vite Dev Server middleware booting...');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    console.log('📦 Serving compiled web production assets...');
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: express.Request, res: express.Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  // Central global exception capture middleware
  app.use(errorHandler);

  server.listen(config.PORT, '0.0.0.0', () => {
    console.log(`🚀 RoomServiceOS Full-Stack Server active at: http://localhost:${config.PORT}`);
  });
}

startServer().catch((error) => {
  console.error('❌ Root crash on startup sequence:', error);
  process.exit(1);
});
