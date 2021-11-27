const express = require("express");
const router = express.Router();
const controller = require("../controllers/doctorsController.js");

router.post("/", controller.createDoctor);

router.get("/", controller.getAllDoctors);

router.get("/:id", controller.getDoctor);

router.put("/:id", controller.updateDoctor);

module.exports = router;