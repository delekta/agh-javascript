//Source:  https://codeforgeek.com/unit-testing-nodejs-application-using-mocha/
var supertest = require("supertest");

// This agent refers to PORT where program is runninng.
var server = supertest.agent("http://localhost:3000");

// UNIT test begin
describe('GET METHOD', function() {
      it('/', function(done) {
         server
         .get('/')
         .expect('Content-Type', /html/)
         .expect(200, done);
      });
});
// describe('POST METHOD', function() {
//       it('/station 401', function(done) {
//          server
//          .post('/station')
//          .send({"stationId": 401})
//          .expect('Content-Type', /html/)
//          .expect(200, done)
//       });
// });

// describe('POST METHOD', function() {
//     it('/station 401', function(done) {
//        server
//        .post('/station')
//        .send({"stationId": 401})
//        .expect('Content-Type', /html/)
//        .expect(200, done)
//        .end(function(err, res){
//            if (err) done(err);
//            res.body.should.have.property
//        })
//     });
// });