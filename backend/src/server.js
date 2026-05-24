const fs = require('fs');
const path = require('path');
const app = require('./app');
const env = require('./config/env');
const { sequelize } = require('./database');

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '..', env.upload.dir);
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection established');

    // Quitamos el alter: true para evitar el error 0A000 de PostgreSQL
    // con la columna generada total_amount en la tabla donations
    await sequelize.sync();
    console.log('✅ Models synchronized');

    app.listen(env.port, () => {
      console.log(`🚀 OnlyFlans API running on port ${env.port} [${env.nodeEnv}]`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();