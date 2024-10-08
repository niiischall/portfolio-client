import fs from 'fs';
import express from 'express';
import { createServer } from 'vite';
 
const app = express();
 
const vite = await createServer({
  server: {
    middlewareMode: true,
  },
  appType: 'custom',
});
 
app.use(vite.middlewares);
 
app.use('*', async (req, res, next) => {
  const url = req.originalUrl;

  try {
    const template = await vite.transformIndexHtml(url, fs.readFileSync('index.html', 'utf-8'));
    const { render } = await vite.ssrLoadModule('/src/entry-server.tsx');

    const { getServerData } = await vite.ssrLoadModule('/src/function.ts');
    const data = await getServerData();
    const script = `<script>window.__data__=${JSON.stringify(data)}</script>`;
 
    const html = template.replace(`<!--outlet-->`, `${render(data)} ${script}`);
    res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
  } catch (error) {
    vite.ssrFixStacktrace(error)
    next(error)
  }
});

app.use('/robots.txt', function (req, res) {
  res.type('text/plain');
  res.send("User-agent: *\nDisallow: /");
});
 
 
app.listen(4173, () => {
  console.log('http://localhost:4173.');
});