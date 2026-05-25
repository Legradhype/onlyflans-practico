const fs = require('fs');
const path = require('path');
const app = require('./app');
const env = require('./config/env');
const { sequelize } = require('./database');

const uploadsDir = path.join(__dirname, '..', env.upload.dir);
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexion estable de la base de datos establecida');
    await sequelize.sync();
    console.log('✅ Modelos sincronizados con la base de datos');

    app.listen(env.port, () => {
      console.log(`🚀 Puerto de OnlyFlans ${env.port} [${env.nodeEnv}]`);
    });
  } catch (error) {
    console.error('❌ Fallo al iniciar el servidor:', error);
    process.exit(1);
  }
};

startServer();