const http = require('http');
const fs = require('fs');

if (fs.existsSync('.env')) {
  const envLines = fs.readFileSync('.env', 'utf-8').split('\n');

  envLines.forEach(line => {
    const [key, value] = line.split('=');
    if (key && value) {
      process.env[key] = value;
    }
  });
} else {
  console.warn('.env file not found. Make sure to set the API_KEY in your environment.');
}

const API_KEY = process.env.API_KEY;
if (!API_KEY) {
  console.error('API_KEY is not defined. Make sure to set it in your .env file or environment.');
  process.exit(1); 
}

const FIXER_URL = `http://data.fixer.io/api/latest?access_key=${API_KEY}`;
const PORT = process.env.PORT ? process.env.PORT : 3000;

const cache = {
  data: null,
  lastFetch: 0
};

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/rates') {

    const now = Date.now();
    // keep cache for 1 minute
    if (now - cache.lastFetch < 60 * 1000 && cache.data) {
      res.writeHead(200, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      });
      res.end(cache.data);
      return;
    }

    http.get(FIXER_URL, (apiRes) => {
      let data = '';

      apiRes.on('data', (chunk) => {
        data += chunk;
      });

      apiRes.on('end', () => {
        if (apiRes.statusCode === 200) {
          res.writeHead(200, {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          });
          res.end(data);
        } else {
          res.writeHead(apiRes.statusCode, {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          });
          res.end(JSON.stringify({ error: 'An error occurred fetching rates' }));
        }
      });
    }).on('error', (err) => {
      res.writeHead(500, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      });
      res.end(JSON.stringify({ error: 'An error occurred with the server' }));
    });
  } else {
    res.writeHead(404);
    res.end();
  }
});

server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});