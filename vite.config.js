import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import url from 'url';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'api-server',
      configureServer(server) {
        server.middlewares.use(async (req, res, next) => {
          if (req.url.startsWith('/api/')) {
            const parsedUrl = url.parse(req.url, true);
            req.query = parsedUrl.query;

            res.status = (code) => {
              res.statusCode = code;
              return res;
            };
            res.json = (data) => {
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify(data));
            };

            const endpointName = parsedUrl.pathname.replace('/api/', '').split('/')[0];
            const handlerPath = path.resolve(process.cwd(), `api/${endpointName}.js`);

            try {
              const module = await server.ssrLoadModule(handlerPath);
              const handler = module.default || module;
              return await handler(req, res);
            } catch (err) {
              console.error(`Error loading API endpoint ${endpointName}:`, err);
              res.statusCode = 500;
              return res.end(JSON.stringify({ error: err.message }));
            }
          }
          next();
        });
      }
    }
  ]
});
