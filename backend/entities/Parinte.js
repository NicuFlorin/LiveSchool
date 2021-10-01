const { Sequelize } = require("sequelize");

module.exports = (database) => {
  return database.define("Parinte", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },

    id_copil: {
      type: Sequelize.INTEGER,
    },
    id_utilizator: {
      type: Sequelize.INTEGER,
      primaryKey: false,
      autoIncrement: false,
      allowNull: false,
    },
  });
};
