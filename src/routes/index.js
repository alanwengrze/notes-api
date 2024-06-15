//Esse arquivo reúne todas as rotas da aplicação

//importando o Router
const { Router } = require('express');

//importando o arquivo users.routes
const usersRouter = require("./users.routes")
const notesRouter = require("./notes.routes")
const tagsRouter = require("./tags.routes")
const sessionsRouter = require("./sessions.routes")

const routes = Router();

//toda vez que alguém for acessar o meu /users, vai ser redirecionado para o usersRouter
routes.use("/users", usersRouter);

//toda vez que alguém for acessar o meu /sessions, vai ser redirecionado para o sessionsRouter
routes.use("/sessions", sessionsRouter);

//toda vez que alguém for acessar o meu /notes, vai ser redirecionado para o notesRouter
routes.use("/notes", notesRouter);

//toda vez que alguém for acessar o meu /tags, vai ser redirecionado para o tagsRouter
routes.use("/tags", tagsRouter);


//exportando as rotas
module.exports = routes;