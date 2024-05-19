const express = require('express');
const rolesController = require('../controllers/roles.controller');
const router = express.Router();
router.post("/addRole", rolesController.add);
router.get("/:id", rolesController.getById);
router.get("/", rolesController.findAll);
router.put("/:id", rolesController.update);
router.delete("/:id", rolesController.destroy);
module.exports = router;
