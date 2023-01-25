const express = require('express');
const app = express();
const path = require('path');
const https = require('https');
const ejs = require('ejs');
const mongoose  = require('mongoose');
const Article = require('./models/Article');
const { error } = require('console');
app.use(express.json()); // for parsing application/json instead of body-parser
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static(path.join(__dirname,'public')))

app.set('view engine', 'ejs');

mongoose.set('strictQuery', true);
mongoose.connect("mongodb://localhost:27017/wikiDB");


app.get("/articles", (req,res) => {
    // res.sendFile(__dirname+"/index.html");
    Article.find((err, article) => {
        if (err) {console.log(err);
        } else {
            res.send(article);
           
        }
    })
});

//Get a particular article
app.route('/articles/:articleTitle')
.get((req, res) => {
    Article.findOne({title: req.params.articleTitle}, (err, artcl) => {
        if(err){console.log(err)}
        else if(artcl){
            console.log(artcl.con);
        } else {
            console.log("No article found")
        }

    })
})
.put((req, res) => { //update the entire article 
    Article.findOneAndUpdate({title: req.params.articleTitle},
        {title: req.body.title,
        content: req.body.content},
        {overwrite: true},
        (err) => {
            if(!err) {
                console.log("Article updated");
            } else {
                console.log(err);
            }
        })
})
.patch((req,res)=>{
    Article.updateOne({title: req.params.articleTitle}, 
        // updates the only the field that changed and leaves
        // the unchanged fields as it is
        {$set: req.body},
        {overwrite: true},
        (err) => {
            if(!err) {
                console.log("Article patched");
            } else {
                console.log(err);
            }
        })
})
.delete((req,res)=>{
    Article.deleteMany({title: req.params.articleTitle},
        {multi: true}, function(err) {
            if (err) {
              console.log(error)
            } else {
              console.log("successfully deleted")
            }
});
})
;


app.post("/articles", (req, res) => {
   const article = new Article({
    title: req.body.title,
    content: req.body.content
   });
   console.log(req.body.title);
   console.log(req.body.content);
   article.save((err) => {
    if (!err) {
        console.log("Article successfully added into the database!")
    } else {
        console.log(err)
    }
   });
});

//delete all the records in the Article collection(=table)
app.delete("/articles/del", (req, res) => {
    Article.deleteMany(err=> {
        if(!err){
            console.log("Article deleted successfully")
        } else {
            console.log(err)
        }
    })
})


app.listen(3000,()=>{
    console.log("Server is running on http//localhost:3000 ");
});