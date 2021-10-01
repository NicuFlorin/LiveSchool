const { Sequelize } = require("sequelize");

module.exports = (database) => {
  return database.define("Repetent", {
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
    clasa: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    seria: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    id_scoala: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  });
};
