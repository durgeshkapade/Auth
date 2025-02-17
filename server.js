const express = require('express');
const app = express();

// for Setup Cookie
const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({extended:true}));


require('dotenv').config();
const PORT = process.env.PORT || 5000;


// routes  Mounting
const userRoute = require('./routes/user')
app.use('/api/v1',userRoute);


app.get('/',(req,res)=>{
    res.send("Hello World");
})


// DB Connection
const connectDB = require('./config/db');
connectDB();



app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})
