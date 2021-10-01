const { Sequelize } = require("sequelize");

module.exports = (database) => {
  return database.define("RepartizareProfesor", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },

    id_profesor: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    id_disciplina: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    id_clasa: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    id_an_scolar: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  });
};
