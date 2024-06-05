//importando o Router
const { Router } = require("express");

//importando o NotesController
const NotesController = require("../controllers/NotesController");

//atribuindo a função Router para a variavel notesRoutes
const notesRoutes = Router();

//Instanciando o NotesController
const notesController = new NotesController();

notesRoutes.get("/", notesController.index);

//criando uma rota para o POST (create)
notesRoutes.post("/:user_id", notesController.create);

//criando uma rota para o GET (show)
notesRoutes.get("/:id", notesController.show);

//criando uma rota para o DELETE (delete)
notesRoutes.delete("/:id", notesController.delete);



//exportando pra quem quiser utilizar, poder utilizar o notesRoutes
module.exports = notesRoutes;