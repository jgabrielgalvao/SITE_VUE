    const Sequelize = require("sequelize");
    const sequelize = new Sequelize(`ventilas`, `root`, `Guerreiros23`, {
        dialect: 'mysql',
        host: `172.17.0.2`
    });

    sequelize.authenticate().then(() => {
        console.log('Connected to MySQL Server');
    }).catch((error) => {
        console.error('Failed to connect to MySQL Server. ', error);
    });

    module.exports = sequelize;