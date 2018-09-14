const next = require('next');
const express = require('express');

const apiRouter = require('./api/routes');


const app = next({ dev: process.env.NODE_ENV !== 'production' });
const nextHandler = app.getRequestHandler();

app.prepare()
  .then(() => {
    const server = express();

    server.use('/api', apiRouter);
    server.use(nextHandler);

    const port = process.env.PORT || 3000;
    server.listen(port, (err) => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port} in ${process.env.NODE_ENV} mode`);
    });
  })
  .catch((err) => {
      console.error(err.stack);
      process.exit(1);
  });
