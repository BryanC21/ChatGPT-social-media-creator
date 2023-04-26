var express = require('express');
const httpProxy = require('http-proxy');
var port = process.env.PORT || 3000;
var app = express(),
    path = require('path'),
    publicDir = path.join(__dirname, 'public');
const proxy = httpProxy.createProxyServer();

/*
const { fork } = require('child_process');

const a = fork('backend/index.js');

a.on('error', (code) => {
    console.log(`child process exited with code ${code}`);
    fork('backend/index.js');
});

const b = fork('frontend/index.js');

b.on('error', (code) => {
    console.log(`child process exited with code ${code}`);
    fork('frontend/index.js');
});*/

//fork('backend/index.js');
//fork('frontend/index.js');

// spawn child processes
/*
exec("forever start ./frontend/index.js", (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
});*/

//app.use(express.static(publicDir))
// Routes
app.use((req, res) => {
    if (req.path.startsWith('/api')) {
        // forward requests starting with '/api' to port 3005
        proxy.web(req, res, { target: 'http://localhost:5003' });
    } 
    else if (req.path.startsWith('/test-proxy')){
        return res.send('test-proxy success');
    }
    else {
        // forward all other requests to port 5005
        proxy.web(req, res, { target: 'http://localhost:3006' });
    }
});

app.listen(port, () => {
    console.log(`Frontend is running on port ${port}`);
});
module.exports = app;


