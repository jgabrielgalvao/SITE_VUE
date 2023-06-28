const Sequelize = require("sequelize");
const database = require("../db/database");

const Usuario = database.define("usuarios", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },

    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },

    email: {
        type: Sequelize.STRING,
        allowNull: false,
    },

    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },

    typeUser: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "client"
    }
});

const Produto = database.define("produtos", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },

    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },

    desc: {
        type: Sequelize.STRING,
        allowNull: false,
    },

    price: {
        type: Sequelize.REAL,
        allowNull: false,
    },

    picture: {
        type: Sequelize.BLOB,
        allowNull: true,
    }
});

module.exports = Usuario, Produto;