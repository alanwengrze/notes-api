const { hash, compare } = require ('bcryptjs');
const AppError = require('../utils/AppError');
const UserRepository = require('../repositories/UserRepository');
const UserCreateService = require("../services/UserCreateService");
//importando a conexão
const sqliteConnection = require('../database/sqlite');

class UsersController {
  //criando os metodos

  //novos usuarios
  async create(request, response) {
    const {name, email, password} = request.body;

    //criando o repositorio
    const userRepository = new UserRepository();

    //criando o service
    const userCreateService = new UserCreateService(userRepository);

    await userCreateService.execute({ name, email, password });

    return response.status(201).json();
  }

  //atualizando os dados de usuario
  async update(request, response) {
    //pegando os dados do body
    const { name, email, password, old_password } = request.body;
    const user_id = request.user.id;

    //criando a conexão
    const database = await sqliteConnection();

    //pegando usuario pelo id
    const user = await database.get("SELECT * FROM users WHERE id = (?)", [user_id]);

    if(!name || !email) {
      throw new AppError("Nome e e-mail obrigatórios.");
    }

    //verificando se a senha atual foi informada
    if(!old_password){
      throw new AppError("Por favor, informe sua senha para atualizar os dados.");
    }
    //verificando se a senha está correta
    if(old_password){
      const checkOldPassword = await compare(old_password, user.password);

      //se a senha antiga não confere, dispara um erro
      if(!checkOldPassword) {
        throw new AppError("Senha inválida.");
      }
    }
    if(password === old_password) {
      throw new AppError("A nova senha deve ser diferente da antiga.");
    }

    //verificando se o usuario existe
    if(!user) {
      throw new AppError("Usuário não encontrado.");
    }

    //verificando se o email já está em uso
    const userWithUpdatedEmail = await database.get("SELECT * FROM users WHERE email = (?)", [email])

    if(userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id){
      throw new AppError("Este e-mail já está em uso.");
    }

    //Se passar da validação, atualiza os dados
    user.name = name ?? user.name; //se o nome for informado, atualiza, se nao, mantem o antigo
    user.email = email ?? user.email;

    //verificando se a senha antiga foi informada
    if(password && !old_password) {
      throw new AppError("Voce precisa informar a senha antiga para definir a nova senha.");
    }

    //verificando se ambas as senhas foram informadas
    if(password && old_password) {
      //verificando se a senha antiga confere
      const checkOldPassword = await compare(old_password, user.password);

      //se a senha antiga não confere, dispara um erro
      if(!checkOldPassword) {
        throw new AppError("A senha antiga não confere.");
      }
      //se passar da validação, atualiza a senha
      //criptografando a nova senha
      user.password = await hash(password, 8);
    }

    await database.run(
      `
        UPDATE users SET
        name = ?,
        email = ?,
        password = ?,
        updated_at = DATETIME('now')
        WHERE id = ?
      `,
      [user.name, user.email, user.password, user_id]
    )

    return response.status(200).json();
  }
}

module.exports = UsersController;