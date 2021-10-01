const { Sequelize } = require("sequelize");

module.exports = (database) => {
  return database.define("Corigenta", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },

    clasa: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    id_disciplina: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    id_elev: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    nota: {
      type: Sequelize.DECIMAL,
      allowNull: false,
    },
    data_examen: {
      type: Sequelize.STRING,
    },
    id_an_scolar: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  });
};
