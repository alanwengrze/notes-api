const { hash } = require ('bcryptjs');
const AppError = require('../utils/AppError');
class UserCreateService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }
  async execute({ name, email, password }) {

    if(!email) {
      throw new AppError("E-mail obrigatório.");
    }
    
    //verificando se o email existe
    const checkUserExists = await this.userRepository.findByEmail(email);

    if(checkUserExists) {
      throw new AppError("Este e-mail já está em uso.");
    }

    //criptografando a senha
    const hashedPassword = await hash(password, 8);

    //inserindo os dados na tabela users
    const userCreated = await this.userRepository.create({name, email, password: hashedPassword});

    return userCreated;
  }
}
module.exports = UserCreateService;