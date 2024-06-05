//importando o Router
const { Router } = require("express");

//importando o UsersController
const UsersController = require("../controllers/UsersController");

//atribuindo a função Router para a variavel usersRoutes
const usersRoutes = Router();


//Instanciando o UsersController
const usersController = new UsersController();

//criando uma rota para o POST (create)
usersRoutes.post("/", usersController.create)

//criando uma rota para o PUT (update)
usersRoutes.put("/:id", usersController.update)


//exportando pra quem quiser utilizar, poder utilizar o usersRoutes
module.exports = usersRoutes;