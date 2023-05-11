// write a hello world expresss app
const express = require('express');
const path = require('path');
const app = express();
const port = 3006;

app.use(express.static(path.join(__dirname, 'website', 'build')));

app.get('*', (req, res) => {
  //res.sendFile(path.join(__dirname, '../..', 'front-end/my-app/build', 'index.html'));
  res.sendFile(path.join(__dirname, 'website', 'build', 'index.html'));
});

//app.get('/', (req, res) => res.send('Hello World! One more time!'));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));