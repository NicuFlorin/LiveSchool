const { Sequelize } = require("sequelize");

module.exports = (database) => {
  return database.define("Elev", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },

    id_clasa: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },

    id_utilizator: {
      type: Sequelize.INTEGER,
      primaryKey: false,
      autoIncrement: false,
      allowNull: false,
    },
  });
};
