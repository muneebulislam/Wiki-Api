const express = require('express');
const app = express();
const path = require('path');
const https = require('https');
const ejs = require('ejs');
const mongoose  = require('mongoose');
app.use(express.json()); // for parsing application/json instead of body-parser
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static(path.join(__dirname,'public')))

app.set('view engine', 'ejs');

mongoose.set('strictQuery', true);
mongoose.connect("mongodb://localhost:27017/wikiDB");

const articleSchema = {
    title: String,
    constent: String
}

const Article = mongoose.model('Article', articleSchema)

app.get("/articles", (req,res) => {
    // res.sendFile(__dirname+"/index.html");
    Article.find((err, article) => {
        if (err) {console.log(err);
        } else {
            res.send(article);
           
        }
    })
});



app.listen(3000,()=>{
    console.log("Server is running on http//localhost:3000 ");
});