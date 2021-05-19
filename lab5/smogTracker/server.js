var express = require('express'),
    logger = require('morgan');
const http = require("http");
var app = express();

app.set('views', __dirname + '/views'); // Files with views can be found in the 'views' directory
app.set('view engine', 'pug');          // Use the 'Pug' template system

app.use(logger('dev')); 

// let stationId = 10123;
let stationsIds = [402, 401, 400, 10447, 10121, 10123, 11303]
// const url = `http://api.gios.gov.pl/pjp-api/rest/station/sensors/${stationId}`;

// http.get(url, res => {
//     res.setEncoding("utf8");
//     let body = "";
//     res.on("data", data => {
//       body += data;
//     });
//     res.on("end", () => {
//       body = JSON.parse(body);
//       console.log(body);
//     });
//   });

app.get('/getData', function(req, res){
    for(let stationId of stationsIds){
        const url = `http://api.gios.gov.pl/pjp-api/rest/station/sensors/${stationId}`;
        http.get(url, res2 => {
            res2.setEncoding("utf8");
            let body = "";
            res2.on("data", data => {
                // console.log(`${stationId} ${data}\n\n`)
                body += data;
            });
            res2.on("end", () => {
                body = JSON.parse(body);
                // console.log(body);
                var paramCodes = [];
                for(obj of body){
                    paramCodes.push(obj.param.paramCode)
                }
                let MongoClient = require("mongodb").MongoClient;
                let url = "mongodb://localhost:27017";
                MongoClient.connect(url, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true
                }, (err, client) => {
                    if (err) {
                        return console.log(err);
                    }
                    const db = client.db('smogtracker');
                    
                    // console.log(db.collection('operations').find());
                    db.collection('stations').insertOne({stationId: stationId, paramCodes: paramCodes})
                    });
            });
        });
    }
    res.render('index', {result: 'Dane uaktualnione!'})
});

app.listen(3000, function () {
    console.log('The application is available on port 3000');
});

app.get('/', function (req, res) {      // The first route
    let MongoClient = require("mongodb").MongoClient;
    let url = "mongodb://localhost:27017";
    MongoClient.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, (err, client) => {
        if (err) {
            return console.log(err);
        }
        const db = client.db('smogtracker');
        // console.log(db.collection('operations').find());
        db.collection('stations').find().toArray((err, all_stations) => {
            console.log(all_stations);
            res.render('form', {options:all_stations});
        })
    });
});

app.get('/station', function (req, res) {
    let stationId = parseInt(req.query.stationId);
    let MongoClient = require("mongodb").MongoClient;
    let url = "mongodb://localhost:27017";
    MongoClient.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, (err, res2) => {
        if (err) {
            return console.log(err);
        }
        const db = res2.db('smogtracker');
        db.collection('stations').findOne({stationId: stationId}).then((station, err) => {
            if (err) {
                return console.log(err);
            }
            console.log(station.paramCodes);
            res.render('index', {result: `Stacja ${stationId}, zarejstrowane zanieczyszenie ${station.paramCodes}`})
        })
        // res.render('index', {result: `Stacja ${stationId}`})


    });
    
});