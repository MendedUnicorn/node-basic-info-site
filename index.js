const http = require('http');
const fs = require('fs');
const url = require('url');

const hostname = '127.0.0.1';
const port = 8080;

const server = http.createServer((req, res) => {
  const q = url.parse(req.url, true);
  let filename = q.pathname === '/' ? 'index.html' : '.' + q.pathname + '.html';
  fs.readFile(filename, (err, data) => {
    if (err) {
      console.log(err);
      fs.readFile('404.html', (err, data) => {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.write(data);
        res.end();
      });
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(data);
    }
  });
});

server.listen(port, () => {
  console.log(`Server is running at http://${hostname}:${port}/`);
});
