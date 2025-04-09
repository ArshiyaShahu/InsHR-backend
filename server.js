const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const taskRoutes = require('./routes/taskRoutes');
const companyRoute = require('./routes/companyRoutes');
const employeeRoute = require('./routes/employeeRoute'); 
const leaveRoutes = require('./routes/leaveRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Database connection
require('./config/db');

// Routes
app.use('/api/task', taskRoutes);
app.use('/api/company', companyRoute);
app.use("/api/employee", employeeRoute); 
app.use('/api/leave', leaveRoutes);

// Swagger API Docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
