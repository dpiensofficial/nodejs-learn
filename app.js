const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;
  //   const {method, headers, url} = req;
  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>Enter meassage</title></head>");
    res.write(
      '<body><form action="/message" method="POST"><input type="text"><button type="submit">submit</button></form></body>'
    );
    res.write("</html>");

    return res.end();
  }
  if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });
    console.log(body);
    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];
      fs.writeFileSync("message.txt", message);

      res.statusCode = 302;
      res.setHeader("Location", "/");
      return res.end();
    });
  }
});

server.listen(3000);
