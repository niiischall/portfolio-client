import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';

const app = express();
 
app.use(express.static(path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'dist/client'), { index: false }));
 
app.use('*', async (_, res) => {
  try {
    const template = fs.readFileSync('./dist/client/index.html', 'utf-8');
    const { render } = await import('./dist/server/entry-server.js');
 
    const { getServerData } = await import('./dist/function/function.js');
    const data = await getServerData();
    const script = `<script>window.__data__=${JSON.stringify(data)}</script>`;

    const html = template.replace(`<!--outlet-->`, `${render(data)} ${script}`);
    res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
});

app.use('/robots.txt', function (req, res) {
  res.type('text/plain');
  res.send("User-agent: *\nDisallow: /");
});
 
app.listen(4173, () => {  
  console.log(`App listening on port: ${4173}`);
});