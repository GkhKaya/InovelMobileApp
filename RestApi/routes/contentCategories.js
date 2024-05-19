const express = require('express');
const contentCategoriesController = require('../controllers/contentcategories.contoller');
const router = express.Router();

router.post("/", contentCategoriesController.add);
router.get("/:id", contentCategoriesController.findById);
router.get("/", contentCategoriesController.findAll);

module.exports = router;