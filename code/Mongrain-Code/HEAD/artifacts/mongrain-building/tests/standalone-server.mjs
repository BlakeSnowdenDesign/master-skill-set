import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';

// Deliberately serves ONLY the delivered HTML, never the workspace or assets.
const html = await readFile(new URL('../../../exports/mongrain-building-wix.html', import.meta.url));
createServer((req, res) => {
  if (req.url === '/frame.html') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('<!doctype html><html><body style="margin:0"><iframe title="Wix animation" sandbox="allow-scripts allow-same-origin" src="/embed.html" style="border:0;width:100vw;height:100vh"></iframe></body></html>');
    return;
  }
  if (req.url !== '/embed.html') {
    res.writeHead(404).end('No workspace files on this origin');
    return;
  }
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' });
  res.end(html);
}).listen(5191, '127.0.0.1');
