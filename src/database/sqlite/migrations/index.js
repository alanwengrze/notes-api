const sqliteConnection = require("../../sqlite");

const createUsers = require("./createUsers");

async function migrationsRun() {
  const schemas = [
    createUsers
  ].join('');//junta todos os comandos em uma string

  sqliteConnection()
    .then(db => db.exec(schemas))
    .catch(err => console.log(err));
}

module.exports = migrationsRun;