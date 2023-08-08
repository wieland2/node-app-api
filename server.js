// STARTING THE SERVER

const app = require('./app');

const port = 3000;

app.listen(port, '127.0.01', () => {
  console.log(`App running on port ${port}`);
});
