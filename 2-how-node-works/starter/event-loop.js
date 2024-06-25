const fs = require("fs");

setTimeout(() => console.log("Timer 1 finised"), 0);
setImmediate(() => console.log("Immediate  1 finished"));

fs.readFile("test-file.txt", () => {
  setTimeout(() => console.log("Timer 2 finised"), 0);
  setTimeout(() => console.log("Timer 3 finised"), 3000);
  setImmediate(() => console.log("Immediate  2 finished"));
  console.log("I/O finished");

  process.nextTick(() => console.log("Process.nextTick"));
});

console.log("hello from the top-level code:");
