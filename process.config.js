module.exports = { // pm2 start process.config.js
    apps: [
        {
            name: 'proxy',
            script: './app.js',
            watch: true,
        },
        {
            name: 'frontend',
            script: './frontend/index.js',
            watch: true,
        },
        {
            name: 'backend',
            script: './backend/index.js',
            watch: true,
        },
    ],
};