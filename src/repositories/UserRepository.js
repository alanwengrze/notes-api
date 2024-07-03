const sqliteConnection = require('../database/sqlite');

class UserRepository {
  async findByEmail(email){
    //criando a conexão
    const database = await sqliteConnection();
     //pegando usuario pelo email
    const user = await database.get("SELECT * FROM users WHERE email = (?)", [email]);

    return user;
  };

  async create({name, email, password}){
    //criando a conexão
    const database = await sqliteConnection();

    //inserindo os dados na tabela users
    const userId = await database.run("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, password]);

    return {id: userId };
  }
}

module.exports = UserRepository;