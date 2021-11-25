const { Sequelize, DataTypes } = require("sequelize");
const { database } = require("./db");

const Doctor = database.define("Doctor", {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING
    },
    crm: {
        type: DataTypes.STRING
    },
    speciality: {
        type: DataTypes.STRING
    },
    clinic: {
        type: DataTypes.STRING
    },
    phone: {
        type: DataTypes.STRING
    },
    favorite: {
        type: DataTypes.BOOLEAN
    }
});

Doctor.sync(); // fazemos com que essa tabela seja criada na base de dados caso ela ainda não exista.

module.exports = {
    Doctor
};