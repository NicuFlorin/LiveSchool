const entitiesSetup = require("./entities");
const sequelize = require("sequelize");
const Sequelize = sequelize.Sequelize;
const config = require("./config.json");
const database = new Sequelize(
  config.database.name,
  config.database.user,
  config.database.password,
  {
    host: config.database.host,
    dialect: "mssql",
    define: {
      freezeTableName: true,
      timestamps: false,
    },
  }
);
const entities = entitiesSetup(database);
database
  .authenticate()
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => console.log(`Failed to connect to the database:${err}`));

module.exports = {
  database,
  entities,
};
