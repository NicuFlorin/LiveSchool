const { Sequelize } = require("sequelize");

module.exports = (database) => {
  return database.define("ConditiiPromovare", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },

    corigente_max: {
      type: Sequelize.INTEGER,
    },
    absente_max: {
      type: Sequelize.INTEGER,
    },
    id_scoala: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  });
};
