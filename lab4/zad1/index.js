const Mod = require('./module.js');

const myArgs = process.argv.slice(2);
// eslint-disable-next-line radix
const operation = new Mod(parseInt(myArgs[0]), parseInt(myArgs[1]));
console.log(operation.sum());
console.log('halko');
