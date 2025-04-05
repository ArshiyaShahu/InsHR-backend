const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://info:NFhEyTkF8djB0zt6@inshr.4mbdko3.mongodb.net/?retryWrites=true&w=majority&appName=insHR', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected'))
.catch((err) => console.log('MongoDB Connection Error:', err));
