require("dotenv/config");

// importando o sistema de error do express
require("express-async-errors")

// importando o database
const migrationsRun = require("./database/sqlite/migrations");

// importando o AppError
const AppError = require("./utils/AppError");

// importando as configs de upload de imagem
const uploadConfigs = require("./configs/upload");

// importando o cors
const cors = require('cors');

//importando o express
const express = require("express");

//importando as rotas
const routes = require("./routes");//qnd não passo um arquivo como parametro depois da barra, ele pega o arquivo index.js
migrationsRun();

//inicializando o express
const app = express();

//habilitando o cors
app.use(cors());

//permite que o express entenda o formato JSON
app.use(express.json());

//definindo o caminho das imagens
app.use("/files", express.static(uploadConfigs.UPLOADS_FOLDER));

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
const PORT = process.env.PORT || 3333;

//ouvindo a porta do servidor, quando a aplicação for iniciada, o servidor vai executar o console.log
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));