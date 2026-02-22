module.exports = {
  apps : [{
    name      : 'green-rx-backend',
    script    : 'dist/src/server.js',
    instances : 1,          // Change this to 1
    exec_mode : 'fork',     // Keep as fork
    watch     : true,
    env_production : {
      NODE_ENV: 'production',
      PORT: 6010
    }
  }]
};