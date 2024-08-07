const fs = require("fs");
const server = require("http").createServer();

server.on("request", (req, res) => {
  // Solutin 1
  // fs.readFile("test-file.txt", (err, data) => {
  //   if (err) {
  //     console.log(err);
  //   }
  //   res.end(data);
  // });

  // Solution 2 : cause back pressure problem
  // const readable = fs.createReadStream("test-file1.txt");
  // readable.on("data", (chunk) => {
  //   res.write(chunk);
  // });
  // readable.on("end", () => {
  //   res.end();
  // });
  // readable.on("error", (error) => {
  //   console.log(error);
  //   res.statusCode = 500;
  //   res.end("File not found!");
  // });

  // Solution 3
  const readable = fs.createReadStream("test-file.txt");
  readable.pipe(res);
  // readableSource.pipe(writeableDestinatin)
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening...");
});
