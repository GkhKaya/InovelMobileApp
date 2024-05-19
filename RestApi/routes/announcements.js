const express = require('express');
const announcementsController = require('../controllers/announcements.controller');
const router = express.Router();

router.post("/", announcementsController.add);
router.get("/:id", announcementsController.findById);
router.get("/", announcementsController.findAll);
router.put("/:id", announcementsController.update);
router.delete("/:id", announcementsController.destroy);

module.exports = router;