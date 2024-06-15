// importando o sqlite
const sqlite3 = require("sqlite3"); // o driver
const sqlite = require("sqlite"); //responsável por conectar

// importando o path para trabalhar com caminhos
const path = require("path");

async function sqliteConnection(){
  const database = await sqlite.open({
    filename: path.resolve(__dirname, "..", "database.db"),
    driver: sqlite3.Database
  });
  return database;
}
module.exports = sqliteConnection;