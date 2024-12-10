const experss = require('express');
const app = express()

// import routes
const routes = require('./routes/index.js');

app.use('/', routes);

const PORT = process.env.PORT || 5000;
app.linsten(PORT, () => {
  console.log(`Server is live on http://localhost:${PORT}`);
}