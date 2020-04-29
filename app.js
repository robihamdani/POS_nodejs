const express = require('express');
const app = express();
const connectDB = require('./config/db');

// connect db
connectDB();

// parse data
app.use(express.urlencoded({ extended: true }));

app.use('/api/admin', require('./routers/Admin'));
app.use('/api/login', require('./routers/Login'));

const PORT = process.env.PORT || 4500;

app.listen(PORT, () => console.log(`port berjalan di ${PORT}`));
