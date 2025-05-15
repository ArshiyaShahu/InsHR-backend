const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const companyRoute = require('./routes/companyRoutes');
const employeeRoute = require('./routes/employeeRoutes');
const leaveRoutes = require('./routes/leaveRoutes');
const DailyTaskRoutes = require('./routes/dailytaskRoutes');
const salaryRoutes = require('./routes/salaryRoutes');
const checkincheckoutRoutes = require('./routes/checkincheckoutRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');
const assignTaskRoutes = require('./routes/assigntasksRoutes');
const punchRoutes = require('./routes/punchRoutes');
const profileRoutes = require('./routes/profileRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Database connection
require('./config/db');

// Routes
app.use('/v1/api/company', companyRoute);
app.use('/v1/api/employee', employeeRoute);
app.use('/v1/api/leave', leaveRoutes);
app.use('/v1/api/dailytask', DailyTaskRoutes);
app.use('/v1/api/salary', salaryRoutes);
app.use('/v1/api/checkincheckout', checkincheckoutRoutes);
app.use('/v1/api/attendance', attendanceRoutes);
app.use('/v1/api/assigntasks', assignTaskRoutes);
app.use('/v1/punch', punchRoutes);
app.use('/v1/profile', profileRoutes);

// Swagger API Docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
