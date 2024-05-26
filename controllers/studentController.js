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
    res.status(500).json({ error: 'An error occurred', details: error.message });
  }
};

exports.updateStudent = async (req, res) => {
  try {
    const { regNo } = req.params;
    const updatedStudent = req.body;

    console.log('Received update request for regNo:', regNo);
    console.log('Updated student data:', updatedStudent);

    // Find the student by regNo and update its data
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
    // Log the actual error for debugging purposes
    console.error('Error updating student:', error);
    // If an error occurs, return a server error response
    res.status(500).json({ error: 'An error occurred', details: error.message });
  }
};

exports.patchStudent = async (req, res) => {
  try {
    const { regNo } = req.params;
    const updatedFields = req.body;

    console.log('Received patch request for regNo:', regNo);
    console.log('Updated student data:', updatedFields);

    // Find the student by regNo and update its data
    const [updatedRowCount] = await Student.update(updatedFields, {
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
    // Log the actual error for debugging purposes
    console.error('Error updating student:', error);
    // If an error occurs, return a server error response
    res.status(500).json({ error: 'An error occurred', details: error.message });
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
    res.status(500).json({ error: 'An error occurred', details: error.message });
  }
};
