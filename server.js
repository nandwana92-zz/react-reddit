var express = require('express');
var proxy = require('http-proxy-middleware');

var app = express();

app.use('/public_api', proxy({
  target: 'https://www.reddit.com',
  pathRewrite: {
    '^/public_api/' : '/',     // rewrite path
  },
  changeOrigin: true
}));


app.use('/protected_api', proxy({
  target: 'https://oauth.reddit.com',
  pathRewrite: {
    '^/protected_api/' : '/',     // rewrite path
  },
  changeOrigin: true
}));

app.listen(8001);

// http://localhost:3000/api/foo/bar -> http://www.example.org/api/foo/bar



