//Source:  https://codeforgeek.com/unit-testing-nodejs-application-using-mocha/
var supertest = require("supertest");

// This agent refers to PORT where program is runninng.
var server = supertest.agent("http://localhost:8080");

// UNIT test begin
describe('GET /submit?name=server.j', function () {
      it('respond with "File DOES NOT exist"', function (done) {
            server
                  .get('/submit?name=server.j')
                  .expect('Content-Type', /text\/plain/)
                  .expect(200, 'File/Directory "server.j" DOES NOT exist', done);
      });
      it('respond with "Directory exist"', function (done) {
            server
                  .get('/submit?name=test')
                  .expect('Content-Type', /text\/plain/)
                  .expect(200, `Directory "test" exist\n`, done);
      });
      it('respond with "File exist"', function (done) {
            server
                  .get('/submit?name=server.js')
                  .expect('Content-Type', /text\/plain/)
                  .expect(200, `File "server.js" exist\n`, done);
      });
});