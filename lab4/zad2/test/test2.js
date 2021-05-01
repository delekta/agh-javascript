var assert = require('assert');
var check = require('../module');

describe('The file/directory existing...', function () {
  it('Returns true for index.js', function () {
    var ans = check("index.js");
    assert.strictEqual(ans, true)
    // expect(op.sum()).to.equal(4);
  });
  it('Returns true for package.json', function () {
    var ans = check("package.json");
    assert.strictEqual(ans, true)
    // expect(op.sum()).to.equal(0);
  });
  it('Returns false for script.js', function () {
    var ans = check("script.js");
    assert.strictEqual(ans, false)
    // expect(op.sum()).to.equal(0);
  });
  it('Returns true for test', function () {
    var ans = check("test");
    assert.strictEqual(ans, true)
    // expect(op.sum()).to.equal(0);
  });
});