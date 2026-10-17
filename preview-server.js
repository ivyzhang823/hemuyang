const http = require('http');
const fs = require('fs');
const path = require('path');

const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml' };
http.createServer((request, response) => {
  const pathname = decodeURIComponent(request.url.split('?')[0]);
  const file = path.join(__dirname, pathname === '/' ? 'index.html' : pathname);
  fs.readFile(file, (error, data) => {
    if (error) { response.statusCode = 404; response.end('Not found'); return; }
    response.setHeader('Content-Type', types[path.extname(file)] || 'application/octet-stream');
    response.end(data);
  });
}).listen(4173, '127.0.0.1', () => console.log('http://127.0.0.1:4173'));
