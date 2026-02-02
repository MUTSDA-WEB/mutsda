import http from 'node:http';

const PORT = process.env.PORT || 4000;

const html = `
<html>
  <head><meta charset="utf-8" /></head>
  <body>
    MUTSDA SERVER (local runner)
    <form>
      <input type="file" name="file" />
    </form>
  </body>
</html>
`;

const commonHeaders = {
  'Content-Type': 'text/html; charset=utf-8',
  'Access-Control-Allow-Credentials': 'true',
  'Access-Control-Allow-Origin': '*',
};

const server = http.createServer((req, res) => {
  // CORS preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    });
    res.end();
    return;
  }

  if (req.method === 'GET' && (req.url === '/' || req.url === '/index.html')) {
    res.writeHead(200, commonHeaders);
    res.end(html);
    return;
  }

  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Not found');
});

server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`MUTSDA backend running: http://localhost:${PORT}`);
});
