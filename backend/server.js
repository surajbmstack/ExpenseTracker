require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const expensesRoute = require('./routes/expenses');
const authRoute = require('./routes/auth');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
    origin: 'http://localhost:3000', // Allow requests from this origin
    // For legacy browser support
};

// Use CORS with options
app.use(cors(corsOptions));
app.use(express.json());

app.use(bodyParser.json())
app.use('/api/expenses', expensesRoute);
app.use('/api/auth', authRoute);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log("MongoDB connection error:", err));


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
