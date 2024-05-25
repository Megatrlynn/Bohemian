const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const studentRoutes = require('./routes/studentRoutes');

const app = express();
const PORT = process.env.PORT || 3306;

// Middleware for parsing JSON bodies
app.use(bodyParser.json());

// Use the student routes
app.use('/api', studentRoutes);

// Synchronize the model with the database
(async () => {
  try {
    await sequelize.sync();
    console.log('Database synchronized');
  } catch (error) {
    console.error('Error synchronizing database:', error);
  }
})();

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
