class AppError{
    message;
    statusCode;

    constructor(message,statusCode = 400){
        this.message = message;
        this.statusCode = statusCode;
    }
}

module.exports = AppError;

/* essa classe foi criada para ser usada para tratar erros. criamos a classe com o erro e o status code de variavel
e chamamos o construtor. padronizamos com o erro 400 que é bad request */