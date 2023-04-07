// write a hello world expresss app
const express = require('express');
const app = express();
const port = 3006;
app.get('/', (req, res) => res.send('Hello World! One more time!'));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
