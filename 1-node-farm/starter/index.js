const fs = require("fs").promises;
const http = require("http");
const url = require("url");

// 1. Read and Write syncrhonouly

// // read from input.txt
// let data = fs.readFileSync("./txt/input.txt", "utf-8");
// // update the data
// data = `This is what we know about the avocado: ${data}.\nCreated on ${Date.now()}`;
// console.log(data);
// // write the data
// fs.writeFileSync("./txt/output.txt", data, "utf-8");

// 2. Read and write using asyn way . also use try and catch block
// async function read_write() {
//   try {
//     let data = await fs.readFile("./txt/input.txt", "utf-8");
//     data = `This is updated by Vivek \n\n\n\n${data}`;
//     await fs.writeFile("./txt/output.txt", data, "utf-8");
//     console.log(data);
//   } catch (error) {
//     console.log(error.message);
//   }
// }
// read_write();

// console.log("this will log first!");

// 3. Create a server
const server = http.createServer((request, response) => {
  console.log(request.url);
  const { pathname } = url.parse(request.url, true);
  if (pathname === "/" || pathname === "/home") {
    response.writeHead(200, {
      "content-type": "text/html",
    });
    response.end("<h1>This is home page</h1>");
  } else if (pathname === "/contact") {
    response.writeHead(200, {
      "content-type": "text/html",
    });
    response.end("<h1>This is contact page</h1>");
  } else if (pathname === "/blogs") {
    response.writeHead(200, {
      "content-type": "text/html",
    });
    response.end("<h1>This is blogs page</h1>");
  } else {
    //404 page
    response.writeHead(404, {
      "content-type": "application/json",
    });
    response.end("<h1>404 page not found!😂</h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("server is running");
});
