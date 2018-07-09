const express = require('express');
const app = express();
const path = require('path');

app.use('/static', express.static(path.join(__dirname, 'public')));

app.listen(8888, () => console.log('Example app listening on port 8888!'));