const express = require("express");
const router = express.Router();
const quoraController = require("./../controller/quoraController");

router.get('/questions/:id', quoraController.getAQuestion);
router.post('/questions',quoraController.createQuestion);
router.get('/questions', quoraController.getAllQuestions);
router.post('/answers/:qId', quoraController.createAnswer);
module.exports = router;