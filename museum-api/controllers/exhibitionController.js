const Exhibition = require("../models/exhibition");

exports.list = async (req, res) => {
  let page = req.query.page || 1;
  let date = req.query.date;
  const filter = date
    ? { $and: [{ dateFrom: { $lte: date } }, { dateTo: { $gte: date } }] }
    : {};

  let count;
  if (date) {
    count = await Exhibition.find(filter).countDocuments();
  } else {
    count = await Exhibition.find().estimatedDocumentCount();
  }
  let limit = 3;
  let totalPage = Math.ceil(count / limit);

  Exhibition.find(filter, null, {
    skip: (page - 1) * limit,
    limit
  })
    .then((exhibitions) => res.status(200).json({ exhibitions, totalPage }))
    .catch((err) => {
      res.status(400).json({ err: err.message });
    });
};

exports.findById = (req, res) => {
  Exhibition.findById(req.params.id)
    .then((exhibition) => {
      res.status(200).json(exhibition);
    })
    .catch((err) => {
      res.status(400).json({ err: err.message });
    });
};

exports.insertTestData = (req, res) => {
  Exhibition.create(req.body)
    .then((exhibition) => {
      res.status(201).json(exhibition);
    })
    .catch((err) => {
      res.status(400).json({ err: err.message });
    });
};

// exports.findByKeywords = async (req, res) => {
//   let page = req.query.page;

//   const query = Exhibition.find({
//     $text: {
//       $search: req.query.keywords
//     }
//   });
//   let limit = 3;
//   const count = await query.count().exec();
//   let totalPage = Math.ceil(count / limit);

//   Exhibition.find({
//     $text: {
//       $search: req.query.keywords
//     }
//   })
//     .skip((page - 1) * limit)
//     .limit(limit)
//     .then((exhibitions) => {
//       res.status(200).json({ exhibitions, totalPage });
//     });
// };
