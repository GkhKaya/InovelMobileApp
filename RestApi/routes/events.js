const express = require('express');
const eventsController = require('../controllers/events.controller');
const router = express.Router();
router.post("/", eventsController.add);
router.get("/:id", eventsController.findById);
router.get("/", eventsController.findAll);
router.put("/:id", eventsController.update);
router.delete("/:id", eventsController.destroy);
module.exports = router;