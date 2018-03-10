const express = require('express');
const app = express();

app.use(express.static('./static'));

const server = app.listen(4000);