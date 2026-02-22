module.exports =  {
  apps : [{
    name      : 'green-rx-backend', // A unique name for your application
    script    : 'dist/src/server.js',      // The entry point file for your Node.js app
    instances : 'max',         // 'max' will use all available CPU cores for load balancing
    exec_mode : 'fork',     // Run in cluster mode
    watch     : true,          // Watch for file changes and restart the app (optional, useful for development)
    env_production : {
      NODE_ENV: 'production', // Environment variables for the production environment
      PORT: 6010
    }
  }]
};