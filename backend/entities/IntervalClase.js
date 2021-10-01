const { Sequelize } = require("sequelize");

module.exports = (database) => {
  return database.define("IntervalClase", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },

    clasa_primara: {
      type: Sequelize.INTEGER,
    },
    clasa_terminala: {
      type: Sequelize.INTEGER,
    },
    id_scoala: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  });
};
