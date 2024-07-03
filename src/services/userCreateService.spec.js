const UserCreateService = require("./UserCreateService");
const UserRepositoryInMemory = require("../repositories/UserRepositoryInMemory");
const AppError = require("../utils/AppError");

describe("UserCreateService", ()=>{
  let userRepository = null;
  let userCreateService = null;

  beforeEach(()=>{
    userRepository = new UserRepositoryInMemory();
    userCreateService = new UserCreateService(userRepository);
  })

  test("user should be created", async ()=>{
    const user = {
      name: "John",
      email: "user@test.com",
      password: "123"
    }
  
    const userCreated = await userCreateService.execute(user);
  
    console.log(userCreated);
  
    expect(userCreated).toHaveProperty("id");
  });

  //Testando se o email já existe
  test("should not be able to create an user with an existing email", async ()=>{
    const user = {
      name: "John",
      email: "user@test.com",
      password: "123"
    }
  
    await userCreateService.execute(user);
  
    await expect(userCreateService.execute(user)).rejects.toBeInstanceOf(AppError);
  })

  //Outra forma de testar se o email já existe
  test("user not should be created with exists email", async () => {
    const user1 = {
      name: "user test 1",
      email: "user@test.com",
      password: "123"
    };
    const user2 = {
      name: "user test 2",
      email: "user@test.com",
      password: "123"
    }

    await userCreateService.execute(user1);
    await expect(userCreateService.execute(user2)).rejects.toEqual(new AppError("Este e-mail já está em uso."));
  });
})
