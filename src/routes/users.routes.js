const {Router} = require("express");

const UsersController = require("../controllers/UsersController");

const usersController = new UsersController();

const usersRoutes = Router();

usersRoutes.post("/",usersController.create); // exemplo de uma rota post que executa um metodo da classe controle
usersRoutes.put("/",usersController.update);

module.exports = usersRoutes;


// esse arquivo indica qual o caminho dos metodos que serao executados a partir da rota que o cliente solicitou