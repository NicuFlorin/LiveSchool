const { Sequelize } = require("sequelize");

module.exports = (database) => {
  return database.define("AnScolar", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },

    data_inceput: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    data_sfarsit: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    id_scoala: {
      type: Sequelize.INTEGER,

      allowNull: false,
    },
  });
};
