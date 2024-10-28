const express = require("express");
const router = express.Router();

const personController = require("../controllers/personControllers");

router
  .route("/:id?")
  .get(personController.getUsers)
  .post(personController.createUser);

router
  .route("/:id")
  .put(personController.updatePerson)
  .delete(personController.deletePerson);

module.exports = router;
