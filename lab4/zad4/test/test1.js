var supertest = require("supertest");

// This agent refers to PORT where program is runninng.
var server = supertest.agent("http://localhost:8080");

// UNIT test begin
describe('GET /submit?name=server.j', function () {
      it('Directory Exist', function (done) {
            server
                  .get('/submit?name=katalog')
                  .expect('Content-Type', /text\/html/, done)
      });
      it('Html File Exist', function (done) {
            server
                  .get('/submit?name=index.html')
                  .expect('Content-Type', /text\/plain/, done)
      });
      it('Respond That Directory/File Exist', function (done) {
            server
                  .get('/submit?name=server.j')
                  .expect('Content-Type', /text\/plain/)
                  .expect(200, "File/Directory do not exists in this folder\n", done);
      });
});