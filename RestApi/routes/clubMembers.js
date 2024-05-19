const express = require('express');
const clubMembersController = require('../controllers/clubmembers.controller');
const router = express.Router();
router.post("/", clubMembersController.add);
router.get("/:id", clubMembersController.findById);
router.get("/", clubMembersController.findAll);
router.put("/:id", clubMembersController.update);
router.delete("/:id", clubMembersController.destroy);
module.exports = router;