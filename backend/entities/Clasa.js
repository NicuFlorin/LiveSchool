const { Sequelize } = require("sequelize");

module.exports = (database) => {
  return database.define("Clasa", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },

    numar: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    serie: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    id_an_scolar: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  });
};
