const express  = require('express');
const contentsController = require('../controllers/content.controller');
const router = express.Router();

router.post("/", contentsController.add);
router.get("/:id", contentsController.findById);
router.get("/category/:contentCategoryId", contentsController.findByCategoryId);
router.get("/", contentsController.findAll);

module.exports = router;