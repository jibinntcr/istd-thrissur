import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const { startServer } = require('next/dist/server/lib/start-server');

const port = parseInt(process.env.PORT || '3000', 10);
const hostname = process.env.HOSTNAME || '127.0.0.1';
const isDev = process.env.NODE_ENV !== 'production';

startServer({
  dir: process.cwd(),
  port,
  allowRetry: false,
  isDev,
  hostname,
}).catch((err) => {
  console.error('Failed to start Next.js server:', err);
  process.exit(1);
});
