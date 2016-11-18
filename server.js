var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;

var config = {
    user: 'giri1992',
    database: 'giri1992',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: process.env.DB_PASSWORD
};


var app = express();
app.use(morgan('combined'));


var articles = {
    'article-one':{
    title: 'Article One | Giri',
    heading: 'Article One',
    date: 'nov 9,2016',
    content: `
                 <p>
                    This is my first article.This is my first article.This is my first article.This is my first article.This is my first article.This is my first article.This is my first article.This is my first article.This is my first article.
                </p>
                <p>
                    This is my first article.This is my first article.This is my first article.This is my first article.This is my first article.This is my first article.This is my first article.This is my first article.This is my first article.
                </p>
                <p>
                    This is my first article.This is my first article.This is my first article.This is my first article.This is my first article.This is my first article.This is my first article.This is my first article.This is my first article.
                </p>
            `
    },
    'article-two':{
    title: 'Article Two | Giri',
    heading: 'Article Two',
    date: 'nov 23,2016',
    content: `
                 
                <p>
                    This is my Second article.
                </p>
            `
    },
    'article-three':{
    title: 'Article Three | Giri',
    heading: 'Article Three',
    date: 'nov 29,2016',
    content: `
                 
                <p>
                    This is my Third article.
                </p>
            `
    },
    
};


var pool = new Pool(config);
app.get('/test-db', function(req,res) {
    pool.query('SELECT * FROM test', function (err,result) {
        if(err){
            res.status(500).send(err.toString());
        }else{
            res.send(JSON.stringify(result));
        }
    });
});




function createTemplate(data) {
    var title = data.title;
    var heading =data.heading;
    var date = data.date;
    var content = data.content;
        var htmlTemplate = ` 
        <html>
            <head>
                <title> 
                ${title}
                </title>
                <link href="/ui/style.css" rel="stylesheet" />
            </head>
            <body>
                <div class="container">
                    <div>
                        <a href="/">Home</a>
                    </div>
                    <hr/>
                    <h3>
                        ${heading}
                    </h3>
                    <div>
                        ${date}
                    </div>
                    <div>
                        ${content}
                    </div>
                </div>  
            </body>
        </html>

`;
return htmlTemplate;
    }

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/:articleName', function (req, res) {
   var articleName = req.params.articleName;
    res.send(createTemplate(articles[articleName]));
});


app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
