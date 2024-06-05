// importando o sistema de error do express
require("express-async-errors")

// importando o database
const migrationsRun = require("./database/sqlite/migrations");

// importando o AppError
const AppError = require("./utils/AppError");

//pegando tudo de express e adicionando a uma variavel
const express = require("express");

const routes = require("./routes");//qnd não passo um arquivo como parametro depois da barra, ele pega o arquivo index.js
migrationsRun();

//inicializando o express
const app = express();

//permite que o express entenda o formato JSON
app.use(express.json());

//inserindo as rotas na aplicação (que estão no routes)
app.use(routes);

app.use((error, request, response, next)=>{
  //se o erro tiver uma instância de AppError
  //erro do lado do cliente
  if(error instanceof AppError){
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message
    });
  }

  console.error(error);

  // erro do lado do servidor
  return response.status(500).json({
    status: "error",
    message: "Internal server error"
  })
});

//colocando o endereço em uma variável, esse endereço vai ser a porta do servidor
const PORT = 3333;

//ouvindo a porta do servidor, quando a aplicação for iniciada, o servidor vai executar o console.log
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));