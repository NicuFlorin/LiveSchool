const { Sequelize } = require("sequelize");

module.exports = (database) => {
  return database.define("IstoricClase", {
    id: {
      type: Sequelize.INTEGER,

      allowNull: false,
    },

    id_istoric: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    numar: {
      type: Sequelize.INTEGER,
    },
    serie: {
      type: Sequelize.STRING,
    },
    id_an_scolar: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  });
};
