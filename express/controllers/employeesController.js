/*
  Each method below GET, POST, PUT, DELTE, are methods that store the operations
  in memory as, read and write from file have not yet been implemented. Each of these methods
  would typically be handled by a database such as MongoDB.
*/

// Set the JSON Employees Object (which could be read in from a file) to an object
const data = {
  employees: require("../model/employees.json"), // [{},{}]
  setEmployees: function (data) {
    this.employees = data;
  },
};

// Handles Route: "/" for GET request
const getAllEmployees = (req, res) => {
  res.json(data.employees);
};

// Handles Route: "/:id" for GET request
const getEmployeeById = (req, res) => {
  const employee = data.employees.find(emp => emp.id === parseInt(req.params.id));
  if (!employee) {
      return res.status(400).json({ "message": `Employee ID ${req.params.id} was not found` });
  }
  res.json(employee);
};

// Handles Route: "/" for POST request
// POST and PUT should use a schema to validate the request.body
// key:values.
const createNewEmployee = (req, res) => {
  const newEmployee = {
    id: data.employees?.length
      ? data.employees[data.employees.length - 1].id + 1
      : 1,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  };

  if (!newEmployee.firstname || !newEmployee.lastname) {
    return res
      .status(400)
      .json({ message: "First and last names are required." });
  }

  // data.setEmployees([...data.employees, newEmployee]);
  data.employees.push(newEmployee);
  res.status(201).json(data.employees);
};

// Handles Route: "/" for PUT request
const updateEmployee = (req, res) => {
  const employee = data.employees.find(
    (emp) => emp.id === parseInt(req.body.id)
  );
  if (!employee) {
    return res
      .status(400)
      .json({ message: `Employee ID ${req.body.id} not found` });
  }
  if (req.body.firstname) employee.firstname = req.body.firstname;
  if (req.body.lastname) employee.lastname = req.body.lastname;
  const filteredArray = data.employees.filter(
    (emp) => emp.id !== parseInt(req.body.id)
  );
  const unsortedArray = [...filteredArray, employee];
  data.setEmployees(
    unsortedArray.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0))
  );
  res.json(data.employees);
};

// Handles Route: "/" for DELETE request
// See Comments on time complexity for Splice() versus Filter()
// and warnings regarding Splice() for negative key:values
const deleteEmployee = (req, res) => {
  let found = false;
  for (let index in data.employees) {
    if (data.employees[index].id === req.body.id && req.body.id > -1) {
      data.employees.splice(index, 1);
      found = true;
    }
  }
  if (!found) {
    return res.status(400).json({ message: `Employee ID ${req.body.id} was not found` });
  }
  res.json(data.employees);
};

module.exports = {
  getAllEmployees,
  getEmployeeById,
  createNewEmployee,
  updateEmployee,
  deleteEmployee,
};
