const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3124;

app.use(express.static('./public/dist'));

app.listen(port, () => console.log(`Listening on ${port}`));
