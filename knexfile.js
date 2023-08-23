const path = require("path");
module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: path.resolve(__dirname, "src", "database", "database.db")
    },

    pool: {
      afterCreate: (conn,cb) => conn.run("PRAGMA foreign_keys = ON",cb)
    },

    migrations: {
      directory: path.resolve(__dirname, "src", "database", "knex", "migrations")
    }, //caminho das migrations que ira criar as tabelas do banco de dados

    useNullAsDefault: true
  }

};

// arquivo knexfile trata a configuracao que vai rodar o query builder que manipula sql