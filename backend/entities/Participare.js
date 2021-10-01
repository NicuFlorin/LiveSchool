const { Sequelize } = require("sequelize");

module.exports = (database) => {
  return database.define("Participare", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },

    tip_participare: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: [1, 20],
      },
    },
    id_elev: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    comentariu: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: [0, 100],
      },
    },
    data_participare: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    id_repartizare: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    id_semestru: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  });
};
