const {Router} = require("express");

const MoviesController = require("../controllers/MoviesController");

const moviesController = new MoviesController();

const moviesRoutes = Router();

moviesRoutes.post("/",moviesController.create);
moviesRoutes.get("/:id",moviesController.show);
moviesRoutes.get("/",moviesController.index);
moviesRoutes.delete("/",moviesController.delete);

module.exports = moviesRoutes;