const fs = require("fs");
const http = require("http");
const url = require("url");
const slugify = require("slugify");
const replaceTemplate = require("./modules/replaceTemplate");

// FILES

// 1. SYNC WAY
// const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
// // console.log(textIn);
// const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`;
// fs.writeFileSync("./txt/output.txt", textOut);
// const readTextOut = fs.readFileSync("./txt/output.txt", "utf-8");
// console.log(readTextOut);

// 2. Async Way
// fs.readFile("./txt/start.txt", "utf-8", (error, data1) => {
//   if (error) {
//     console.log(error.message + " Problem in reading start.txt");
//   }
//   fs.readFile(`./txt/${data1}.txt`, "utf-8", (error, data2) => {
//     console.log(data2);
//     fs.readFile("./txt/append.txt", "utf-8", (error, data3) => {
//       console.log(data3);

//       fs.writeFile(
//         "./txt/final.txt",
//         `${data2}\n${data3}`,
//         "utf-8",
//         (error) => {
//           console.log(" your file has been written");
//         }
//       );
//     });
//   });
// });

//  Using async await
// async function readAsyn() {
//   try {
//     const data1 = await fs.readFile("./txt/start.txt", "utf-8");
//     const data2 = await fs.readFile(`./txt/${data1}.txt`, "utf-8");
//     const data3 = await fs.readFile("./txt/append.txt", "utf-8");
//     await fs.writeFile("./txt/final.txt", `${data2}\n\n${data3}`, "utf-8");
//     console.log("File written successfully");
//   } catch (error) {
//     console.error(error);
//   }
// }
// readAsyn();
// console.log("will read file");

// /////////////////// Server
const data = fs.readFileSync("./dev-data/data.json", "utf-8");
console.log(data);
// 2. create server

const server = http.createServer((request, response) => {
  const { pathname } = url.parse(request.url, true);

  //   overview page
  if (pathname === "/" || pathname === "/overview") {
    response.writeHead(200, {
      "Content-type": "application/json",
    });
    response.end(data);
  } else {
    // handle not found
    response.writeHead(404, { "Content-type": "text/html" });
    response.end("<h1>404 not found page</h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to requests on the port 8000");
});
