
const Exhibition = require('../models/exhibitionModel')

exports.list = (req, res) => {
    console.log(req.params.keywords)
    Exhibition.find()
        .then(exhibitions => {
            res.status(200).json(exhibitions)
        })
}

exports.findByDate = async (req, res) => {
    let page = req.params.page

    //date compare bug
    const query = Exhibition.find({
        $and: [
            { dateFrom: { $lte: req.params.date } },
            { dateTo: { $gte: req.params.date } }
        ]
    })
    const count = await query.count()
    let limit = 3
    let totalPage = Math.ceil(count / limit);


    Exhibition.find({
        $and: [
            { dateFrom: { $lte: req.params.date } },
            { dateTo: { $gte: req.params.date } }
        ]
    }).skip((page - 1) * limit)
        .limit(limit)
        .then(exhibitions => {
            res.status(200).json({ exhibitions, totalPage })
        })
}

exports.findByKeywords = async (req, res) => {
    let page = req.query.page

    const query = Exhibition.find({
        $text: {
            $search: req.query.keywords
        }
    })
    let limit = 3
    const count = await query.count().exec()
    let totalPage = Math.ceil(count / limit);

    Exhibition.find({
        $text: {
            $search: req.query.keywords
        }
    }).skip((page - 1) * limit)
        .limit(limit)
        .then(exhibitions => {
            res.status(200).json({ exhibitions, totalPage })
        })
}


exports.findById = (req, res) => {
    Exhibition.findById(req.params.id)
        .then(exhibition => {
            res.status(200).json(exhibition)
        })
}

//for posting test data
exports.post = (req, res) => {
    Exhibition.create(req.body)
        .then(exhibition => {
            res.status(201).json(exhibition)
        })
}

