const express = require("express");
const router = express.Router();
const quoraController = require("./../controller/quoraController");
const authController = require("./../controller/authController");

router.use(authController.verifyJwtToken,authController.loggedInUser);

router.post('/questions/upvote/:qId', quoraController.upVote);
router.post('/questions/downvote/:qId', quoraController.downVote);
router.get('/questions/:id', quoraController.getAQuestion);
router.post('/questions',quoraController.createQuestion);
router.get('/questions', quoraController.getAllQuestions);
router.post('/answers/:qId', quoraController.createAnswer);


module.exports = router;