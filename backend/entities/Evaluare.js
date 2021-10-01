const { Sequelize } = require("sequelize");

module.exports = (database) => {
  return database.define("Evaluare", {
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
    tip_evaluare: {
      type: Sequelize.STRING,
    },
    pondere: {
      type: Sequelize.DECIMAL,
      allowNull: false,
    },

    data_creare: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    termen_raspuns: {
      type: Sequelize.STRING,
    },
    ora_deadline: {
      type: Sequelize.STRING,
    },
    descriere: {
      type: Sequelize.STRING,
    },
    fisier_atasat: {
      type: Sequelize.BOOLEAN,
    },
    id_repartizare: {
      type: Sequelize.INTEGER,

      allowNull: false,
    },
    id_semestru: {
      type: Sequelize.INTEGER,

      allowNull: false,
    },
  });
};
