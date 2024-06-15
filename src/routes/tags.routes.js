//Rota de tags
//importando o Router
const { Router } = require("express");

const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

//importando o NotesController
const TagsController = require("../controllers/TagsController");

//atribuindo a função Router para a variavel tagsRoutes
const tagsRoutes = Router();

//Instanciando o TagsController
const tagsController = new TagsController();

tagsRoutes.get("/",ensureAuthenticated, tagsController.index);



//exportando pra quem quiser utilizar, poder utilizar o tagsRoutes
module.exports = tagsRoutes;