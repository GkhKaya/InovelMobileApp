const express = require('express');
const departmentsController = require('../controllers/departments.controller');
const router = express.Router();
router.post("/", departmentsController.add);
router.get("/:id", departmentsController.findById);
router.get("/", departmentsController.findAll);
router.put("/:id", departmentsController.update);
router.delete("/:id", departmentsController.destroy);
module.exports = router;