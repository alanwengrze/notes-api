//importando o Router
const { Router } = require("express");

const multer = require('multer');
const uploadConfig = require('../configs/upload');

//importando o UsersController
const UsersController = require("../controllers/UsersController");
const UserAvatarController = require("../controllers/UserAvatarController")

//importando o ensureAuthenticated (verifica se o usuário está autenticado)
const  ensureAuthenticated = require("../middlewares/ensureAuthenticated");

//atribuindo a função Router para a variavel usersRoutes
const usersRoutes = Router();

const upload = multer(uploadConfig.MULTER);

//Instanciando o UsersController
const usersController = new UsersController();

//Instanciando o UserAvatarController
const userAvatarController = new UserAvatarController();

//criando uma rota para o POST (create)
usersRoutes.post("/", usersController.create)

//criando uma rota para o PUT (update)
usersRoutes.put("/", ensureAuthenticated, usersController.update);

usersRoutes.patch("/avatar", ensureAuthenticated, upload.single('avatar'), userAvatarController.update);


//exportando pra quem quiser utilizar, poder utilizar o usersRoutes
module.exports = usersRoutes;