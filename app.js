const express = require('express');
const app = express();
const https = require('https');
app.use(express.json()); // for parsing application/json instead of body-parser
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


app.get("/joke", (req,res) => {
    res.sendFile(__dirname+"/index.html");
});



app.listen(3000,()=>{
    console.log("Server is running on http//localhost:3000 ");
});