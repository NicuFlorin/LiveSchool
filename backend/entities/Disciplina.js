const { Sequelize } = require("sequelize");

module.exports = (database) => {
  return database.define("Disciplina", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },

    denumire: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: [1, 100],
      },
    },
    id_scoala: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  });
};
