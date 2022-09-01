const { employees } = require('../model/employees.json');

// console.log(emps.employees);

const data = {
  employees,
  setEmployees(employees) {
    this.employees = employees;
  },
};

const getAllEmployees = (req, res) => {
  res.json(data.employees);
};

const createEmployee = (req, res) => {
  const newEmpoyee = {
    id: data.employees.length + 1,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  };

  if (!req.body.firstName || !req.body.lastName) {
    return res
      .status(400)
      .json({ message: 'first and last names are required' });
  }
  data.setEmployees([...data.employees, newEmpoyee]);
  res.status(201).json(data.employees);
};

const updateEmployee = (req, res) => {
  const emp = data.employees.find(
    (employee) => Number(employee.id) === Number(req.body.id)
  );

  if (!emp) {
    res.status(400).json({ message: 'Employee not found!' });
  }

  emp.firstName = req.body.firstName;
  emp.lastName = req.body.lastName;

  res.status(201).json(data.employees);
};

const deleteEmployee = (req, res) => {
  const emp = data.employees.find(
    (emp) => Number(emp.id) === Number(req.body.id)
  );

  if (!emp) {
    res.status(400).json({ message: 'Employee not found!' });
  }

  const newEmpoyees = data.employees.filter(
    (emp) => Number(emp.id) !== Number(req.body.id)
  );
  data.setEmployees(newEmpoyees);

  res.status(200).json(data.employees);
};

const getEmployee = (req, res) => {
  const emp = data.employees.find(
    (emp) => Number(emp.id) === Number(req.params.id)
  );

  if (!emp) {
    res.status(400).json({ message: 'Employee not found!' });
  }

  res.status(200).json(emp);
};

module.exports = {
  getAllEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployee,
};
