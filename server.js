const express= require('express');
const connectDB = require('./config/dbConnection');
const errorHandler = require('./middleware/errorhandler');
const dotenv = require("dotenv").config();

connectDB();
const app= express();

const port= process.env.PORT || 5001;

app.use(express.json());
app.use("/api/state", require("./routes/stateRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use(errorHandler);

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});