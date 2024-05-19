const express = require('express');
const membersController = require('../controllers/members.controller');
const router = express.Router();

router.post("/", membersController.add);
router.get("/:id", membersController.findById);
router.get("/", membersController.findAll);
router.put("/:id", membersController.update);
router.delete("/:id", membersController.destroy);

module.exports = router;