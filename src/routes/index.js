const {Router} = require("express");
const routes = Router();
const usersRouter = require("./users.routes");
const moviesRouter = require("./movies.routes");
const tagsRouter = require("./tags.routes");

routes.use("/users",usersRouter);
routes.use("/movies",moviesRouter);
routes.use("/tags",tagsRouter);

module.exports = routes;

// é o primeiro caminho de rota que o client segue, a partir de uma rota definida, ele encaminha para o detalhamento da rota