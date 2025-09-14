import Employee from "../models/employee.models.js";

// insert user
export const createEmployee = async (req, res) => {
  try {
    const { name, jobRole, mobileNumber } = req.body;
    const employee = new Employee({ name, jobRole, mobileNumber });
    await employee.save();
    res.status(200).json(employee);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// display all
export const getAllUser = async (req, res) => {
  try {
    const employee = await Employee.find();
    res.json(employee);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//display by id
export const getUserById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    res.json(employee);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//update by id
export const updateUser = async (req, res) => {
  try {
    const { name, jobRole, mobileNumber } = req.body;
    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      { name, jobRole, mobileNumber },
      { new: true }
    );
    if (!employee)
      return res.status(400).json({ message: "employee not found" });
    res.json(employee);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete an employee by ID
export const deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee)
      return res.status(404).json({ message: "Employee not found" });
    res.json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
