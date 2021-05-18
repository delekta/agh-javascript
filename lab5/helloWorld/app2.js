// Application using the 'Pug' template system
var express = require('express'),
    logger = require('morgan');
var fs = require('fs');
var app = express();
var x = 3;
var y = 2;

var arithmetic_funcs = {
    "+": (x, y) => parseInt(x) + parseInt(y),
    "-": (x, y) => x - y,
    "*": (x, y) => x * y,
    "/": (x, y) => x / y,
}

// Configuring the application
app.set('views', __dirname + '/views'); // Files with views can be found in the 'views' directory
app.set('view engine', 'pug');          // Use the 'Pug' template system

// Determining the contents of the middleware stack
app.use(logger('dev'));                         // Add an HTTP request recorder to the stack — every request will be logged in the console in the 'dev' format
// app.use(express.static(__dirname + '/public')); // Place the built-in middleware 'express.static' — static content (files .css, .js, .jpg, etc.) will be provided from the 'public' directory

// Route definitions
app.get('/', function (req, res) {      // The first route
    res.render('index', {pretty:true, result: `${x} + ${y} = ${x + y}`}); // Render the 'index' view in 'pretty' mode — the resulting HTML code will be indented — the 'pretty' option has the 'deprecated' status — in the future it will not be supported
    //res.render('index '); // Render the 'index' view; because the 'pretty' mode is, by default, turned off so the resulting HTML will be without indentation
});

// The application is to listen on port number 3000
app.listen(3000, function () {
    console.log('The application is available on port 3000');
});

app.get('/json/:name', function(req, res){
    fs.readFile(`./json/${req.params.name}`, (err, res2)=>{
        if (err){
            console.log(err);
            // res.status(404).send("404 not found")
        }else{
            let all_operations = JSON.parse(res2).operations
            oprs = []
            for([i, o] of all_operations.entries()){
               oprs.push({})
               oprs[oprs.length - 1].x = o.x
               oprs[oprs.length - 1].y = o.y
               oprs[oprs.length - 1].operation = o.operation
               oprs[oprs.length - 1].result = arithmetic_funcs[o.operation](o.x, o.y)
            }
            style  = `table, td, th, tr{border: 1px solid black; border-collapse:collapse; padding: 10px}`
            res.render('index', {style: style, oprs:oprs});
        }
    })
})

app.get('/calculate/:operation/:x/:y', function(req, res){
    if(req.params.operation in arithmetic_funcs){
        let result = arithmetic_funcs[req.params.operation](req.params.x, req.params.y)
        let opr = `${req.params.x} ${req.params.operation} ${req.params.y} = ${result}`
        res.render('mongo', {result: opr})
        let MongoClient = require("mongodb").MongoClient;
        let url = "mongodb://localhost:27017";
        MongoClient.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }, (err, client) => {
            if (err) {
                return console.log(err);
            }
            const db = client.db('jsmongo');
            // console.log(db.collection('operations').find());
            db.collection('operations').insertOne({operation: req.params.operation, x: req.params.x, y: req.params.y})
        });
    }else{
        console.log("Nie ma takiej opercaji");
    }
})

app.get('/result', function(req, res){
    let MongoClient = require("mongodb").MongoClient;
    let url = "mongodb://localhost:27017";
    MongoClient.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, (err, client) => {
        if (err) {
            return console.log(err);
        }
        const db = client.db('jsmongo');
        // console.log(db.collection('operations').find());
        db.collection('operations').find().toArray((err, all_operations) => {
            oprs = []
            for([i, o] of all_operations.entries()){
               oprs.push({})
               oprs[oprs.length - 1].x = o.x
               oprs[oprs.length - 1].y = o.y
               oprs[oprs.length - 1].operation = o.operation
               oprs[oprs.length - 1].result = arithmetic_funcs[o.operation](o.x, o.y)
            }
            style  = `table, td, th, tr{border: 1px solid black; border-collapse:collapse; padding: 10px}`
            res.render('index', {style: style, oprs:oprs});
        })
    });
})