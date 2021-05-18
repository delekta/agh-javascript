// No use of any template system
var express = require('express'),
    logger = require('morgan');
var fs = require('fs');
var app = express();
var x = 1;
var y = 2;
var result = `<h1>${x} + ${y} = ${x + y}</h1>`

var arithmetic_funcs = {
    "+": (x, y) => parseInt(x) + parseInt(y),
    "-": (x, y) => x - y,
    "*": (x, y) => x * y,
    "/": (x, y) => x / y,
}
// Determining the contents of the middleware stack
app.use(logger('dev'));                         // Place an HTTP request recorder on the stack — each request will be logged in the console in 'dev' format
// app.use(express.static(__dirname + '/public')); // Place the built-in middleware 'express.static' — static content (files .css, .js, .jpg, etc.) will be provided from the 'public' directory

// Route definitions
app.get('/', function (req, res) {     // The first route
    res.send(result); // Send a response to the browser
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
            let table = `<table>
                            <tr> 
                                <th>x</th>
                                <th>Operation</th>
                                <th>y</th>
                                <th>Result</th>
                            </tr>`;
            for(o of all_operations){
                table += `<tr>
                            <td>${o.x}</td>
                            <td>${o.operation}</td>
                            <td>${o.y}</td>
                            <td>${arithmetic_funcs[o.operation](o.x, o.y)}</td>
                          </tr>`
            }
            table += `</table>`
            style  = `<style>table, td, th, tr{border: 1px solid black; border-collapse:collapse; padding: 5px} </style>`
            res.send(`${style}${table}`);
        }
    })
})

app.get('/calculate/:operation/:x/:y', function(req, res){
    if(req.params.operation in arithmetic_funcs){
        let result = arithmetic_funcs[req.params.operation](req.params.x, req.params.y)
        res.send(`${req.params.x} ${req.params.operation} ${req.params.y} = ${result}`)
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
                let table = `<table>
                            <tr> 
                                <th>x</th>
                                <th>Operation</th>
                                <th>y</th>
                                <th>Result</th>
                            </tr>`;
            for(o of all_operations){
                table += `<tr>
                            <td>${o.x}</td>
                            <td>${o.operation}</td>
                            <td>${o.y}</td>
                            <td>${arithmetic_funcs[o.operation](o.x, o.y)}</td>
                          </tr>`
            }
            table += `</table>`
            style  = `<style>table, td, th, tr{border: 1px solid black; border-collapse:collapse; padding: 5px} </style>`
            res.send(`${style}${table}`);
            })
        });
})