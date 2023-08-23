const {Router} = require("express");

const TagsController = require("../controllers/TagsController");

const tagsController = new TagsController();

const tagsRoutes = Router();

tagsRoutes.get("/",tagsController.index); // exemplo de uma rota post que executa um metodo da classe controle

module.exports = tagsRoutes;


// esse arquivo indica qual o caminho dos metodos que serao executados a partir da rota que o cliente solicitou