// console.log(arguments);
// console.log(require("module").wrapper);

// module.exports
console.log("example of module.exports");
const Calculator = require("./test-module-1");
const calculator1 = new Calculator();
console.log(calculator1.add(2, 3));
console.log(calculator1.multiply(2, 3));

console.log("example of exports");
//exports
// const calc2 = require("./test-module-2");
const { add, multiply } = require("./test-module-2");
console.log(add(2, 3));
console.log(multiply(2, 3));

// caching
require("./test-module-3")();
require("./test-module-3")();
require("./test-module-3")();
require("./test-module-3")();
