const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

// Root path message
router.get('/', (req, res) => {
    res.send('API is working!');
});

router.post('/students', studentController.createStudent);
router.get('/students', studentController.getStudents);
router.get('/students/:id', studentController.getStudentById);
router.put('/students/:regNo', studentController.updateStudent);
router.delete('/students/:id', studentController.deleteStudent);

module.exports = router;

