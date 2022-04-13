const path = require('path');
const express = require('express');
// import { getHtmlData } from '@matti-kit/data';

const port = process.env.PORT || 4000;

const app = express();

app.set('views', './static');
app.set('view engine', 'ejs');

app.get('/playground', async (req, res) => {
  const data = {}; // const data = await getHtmlData();
  res.render('index', { scripts: ['playground/assets/main.js'], data });
});
app.use(
  '/playground/assets',
  express.static(path.dirname(require.resolve('@matti-kit/playground'))),
);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
