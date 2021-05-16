// No use of any template system
var express = require('express'),
    logger = require('morgan');
var fs = require('fs');
var app = express();
var x = 1;
var y = 2;
var result = `<h1>${x} + ${y} = ${x + y}</h1>`

var arithmetic_funcs = {
    "+": (x, y) => x + y,
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
    fs.readFile(`${__dirname}/json/${req.params.name}`, (err, res)=>{
        if (err){
            console.log(err);
            res.status(404).send("404 not found")
        }else{
            console.log("Jestem tu")
            let all_operations = JSON.parse(res).operations
            console.log(res);
            let table = `<table>
                        <tr> 
                        <td>x</td>
                        <td>Operation</td>
                        <td>y</td>
                        <td>Result</td>
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
            res.send(`${table}`);
        }
    })
})

