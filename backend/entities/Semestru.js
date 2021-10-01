const { Sequelize } = require("sequelize");

module.exports = (database) => {
  return database.define("Semestru", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },

    nume: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: [1, 100],
      },
    },
    data_inceput: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    data_sfarsit: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    id_an_scolar: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  });
};
