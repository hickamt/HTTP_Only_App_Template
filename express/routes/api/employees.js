const express = require("express");
const router = express.Router();
const employeesController = require("../../controllers/employeesController");

// Instead of 'router.get()' 'router.put()' etc...
// router.route('/') allows 'chaining' the different
// client requests events
router
  .route("/")
  // using 'verifyJWT' middleware to verify client access auth token
  .get(employeesController.getAllEmployees)
  .post(employeesController.createNewEmployee)
  .put(employeesController.updateEmployee)
  .delete(employeesController.deleteEmployee);

// API request using explicit :id of a user
router.route("/:id").get(employeesController.getEmployeeById);

module.exports = router;
