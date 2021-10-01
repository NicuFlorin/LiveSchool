const { Sequelize } = require("sequelize");

module.exports = (database) => {
  return database.define("Scoala", {
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
    adresa: {
      type: Sequelize.STRING,
    },
  });
};
