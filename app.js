var express = require('express');
const httpProxy = require('http-proxy');
var port = process.env.PORT || 3000;
var app = express(),
    path = require('path'),
    publicDir = path.join(__dirname, 'public');
const proxy = httpProxy.createProxyServer();


const { fork } = require('child_process');

fork('frontend/index.js');
fork('backend/index.js');

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


