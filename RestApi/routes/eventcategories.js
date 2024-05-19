const express = require('express');
const eventCategoriesController = require('../controllers/eventcategories.controller');
const router = express.Router(); 
router.post("/", eventCategoriesController.add);
router.get("/:id", eventCategoriesController.findById);
router.get("/", eventCategoriesController.findById);
router.put("/:id", eventCategoriesController.update);
router.delete("/:id", eventCategoriesController.destroy);
module.exports = router;