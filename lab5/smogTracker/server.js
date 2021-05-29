var express = require('express'),
    logger = require('morgan');
const http = require("http");
var app = express();

app.set('views', __dirname + '/views'); // Files with views can be found in the 'views' directory
app.set('view engine', 'pug');          // Use the 'Pug' template system

app.use(logger('dev'));

// wazne zeby miec dostep do req.body w metodzie post
app.use(express.urlencoded());
app.use(express.json()); 

// let stationId = 10123;
let stationsAddresses = {
    402: "Kraków, ul. Bulwarowa",
    401: "Kraków ul. Bujaka",
    400: "Kraków, Aleja Krasińskiego", 
    10447: "Kraków, os. Wadów", 
    10121: "Kraków, ul. Dietla", 
    10123: "Kraków, ul. Złoty Róg", 
    11303: "Kraków, os. Swoszowice"
}
// const url = `http://api.gios.gov.pl/pjp-api/rest/station/sensors/${stationId}`;

app.get('/getData', function(req, res){
    let MongoClient = require("mongodb").MongoClient;
    let mongourl = "mongodb://localhost:27017";

    // add currrent values
    for(let stationId of Object.keys(stationsAddresses)){
        console.log(stationId)
        let apiurl = `http://api.gios.gov.pl/pjp-api/rest/station/sensors/${stationId}`;
        http.get(apiurl, res2 => {
            res2.setEncoding("utf8");
            let body = "";
            res2.on("data", data => {
                // console.log(`${stationId} ${data}\n\n`)
                body += data;
            });
            res2.on("end", () => {
                body = JSON.parse(body);
                console.log(body);
                var paramCodes = [];
                for(obj of body){
                    paramCodes.push(obj.param.paramCode)
                }
                MongoClient.connect(mongourl, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true
                }, (err, client) => {
                    if (err) {
                        return console.log(err);
                    }
                    const db = client.db('smogtracker');
                    db.collection("stations").deleteOne({stationId: stationId})
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
            stations_objs = []
            for(station of all_stations){
                stations_objs.push({
                    stationId: station.stationId,
                    address: stationsAddresses[station.stationId]
                })
            }
            console.log(all_stations);
            res.render('form', {options: stations_objs});
        })
    });
});

app.post('/station', function (req, res) {
    let stationId = parseInt(req.body.stationId);
    // console.log(req.body);
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
        db.collection('stations').findOne({stationId: stationId.toString()}).then((station, err) => {
            if (err) {
                return console.log(err);
            }
            console.log(station.paramCodes);
            res.render('station', {station: `Stacja ${stationId}`, pollutions: station.paramCodes})
        })
    });
});