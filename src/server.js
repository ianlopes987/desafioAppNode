require("express-async-errors"); // para o appError funcionar precisamos instalar esse modulo
const express = require("express");
const database = require("./database/sqlite");
const routes = require("./routes");
const AppError = require("./utils/AppError");

database(); // inicializando o banco de dados

const app = express(); // criando o app do servidor
app.use(express.json());

app.use(routes); // indicando as rotas que o servidor seguirá, no arquivo rotas foi indicado os caminhos

app.use((error,request,response,next) => {
    if(error instanceof AppError){
        return response.status(error.statusCode).json({
            status:"error",
            message: error.message
        });
    }

    console.error(error);

    return response.status(500).json({
        status:"error",
        message: "internal server error"
    });

    //tratando erros de client e servidor para apresentar na tela caso erro
})

const PORT = 3333; 

app.listen(PORT,() => console.log(`Server in con on Port ${PORT}`));


// esse arquivo tem a funcao de criar o servidor que vai rodar a aplicacao na porta 3333


