const { Sequelize } = require("sequelize");

module.exports = (database) => {
  return database.define("Nota", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },

    id_elev: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    nota: {
      type: Sequelize.INTEGER,
    },
    id_evaluare: {
      type: Sequelize.INTEGER,
    },
    data_nota: {
      type: Sequelize.STRING,
    },

    feedback: {
      type: Sequelize.STRING,
    },
  });
};
