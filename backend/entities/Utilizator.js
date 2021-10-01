const Sequelize = require("sequelize");

module.exports = (database) => {
  return database.define("Utilizator", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },

    nume: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: [1, 100],
      },
    },
    prenume: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    parola: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    telefon: {
      type: Sequelize.STRING,
    },
    adresa: {
      type: Sequelize.STRING,
    },
    data_nasterii: {
      type: Sequelize.STRING,
    },
    id_scoala: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    tip_utilizator: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });
};
