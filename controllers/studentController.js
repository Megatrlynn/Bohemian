const Student = require('../models/student');

exports.createStudent = async (req, res) => {
  try {
    console.log('Request Body:', req.body); // Log the request body to debug
    const student = await Student.create(req.body);
    res.status(201).json({ message: 'Student created successfully' });
  } catch (error) {
    console.error('Error creating student:', error); // Log the actual error
    res.status(500).json({ error: 'An error occurred', details: error.message });
  }
};

exports.getStudents = async (req, res) => {
  try {
    const students = await Student.findAll();
    res.json(students);
  } catch (error) {
    console.error('Error fetching students:', error); // Log the detailed error
    res.status(500).json({ error: 'An error occurred while fetching students', details: error.message });
  }
};

exports.getStudentById = async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id);
    if (student) {
      res.json(student);
    } else {
      res.status(404).json({ error: 'Student not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
};

exports.updateStudent = async (req, res) => {
  try {
    // Attempt to update the student record
    const [updatedRowCount] = await Student.update(updatedStudent, {
      where: { regNo: regNo }
    });
  
    // Check if any rows were updated
    if (updatedRowCount > 0) {
      // If at least one row was updated, return success message
      res.json({ success: true, message: 'Student updated successfully' });
    } else {
      // If no rows were updated, return a not found error
      res.status(404).json({ error: 'Student not found' });
    }
  } catch (error) {
    // If a validation error occurs, return details about the validation errors
    if (error.name === 'SequelizeValidationError') {
      const validationErrors = error.errors.map(err => {
        return { field: err.path, message: err.message };
      });
      res.status(400).json({ error: 'Validation error', details: validationErrors });
    } else {
      // If an unexpected error occurs, return a server error response
      res.status(500).json({ error: 'An error occurred' });
    }
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id);
    if (student) {
      await student.destroy();
      res.json({ message: 'Student deleted successfully' });
    } else {
      res.status(404).json({ error: 'Student not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
};
