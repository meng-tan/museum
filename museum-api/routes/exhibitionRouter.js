const express = require("express");
const exihbitionRouter = express.Router();
const exhibitionController = require("../controllers/exhibitionController");

exihbitionRouter.get("/exhibitions", exhibitionController.list);

exihbitionRouter.get("/exhibitions/:id", exhibitionController.findById);

exihbitionRouter.put("/exhibition", exhibitionController.insertTestData);

module.exports = exihbitionRouter;
