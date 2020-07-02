const express = require('express');
const exihbitionRouter = express.Router();
const exhibitionController = require('../controllers/exhibitionController')


exihbitionRouter.get('/exhibitions', exhibitionController.list)

exihbitionRouter.get('/exhibitions/search?',exhibitionController.findByKeywords)

exihbitionRouter.get('/exhibitions/id/:id', exhibitionController.findById)

exihbitionRouter.get('/exhibitions/date/:date/page/:page',exhibitionController.findByDate)


//for posting test data
exihbitionRouter.post('/exhibitions',exhibitionController.post)


module.exports = exihbitionRouter;