module.exports = { // pm2 start process.config.js
    apps: [
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