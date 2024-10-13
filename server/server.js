const jsonServer = require("json-server");
const middleware = jsonServer.defaults();

const server = jsonServer.create();

server.use(middleware);
server.use(jsonServer.bodyParser);

const lms = require("../server/data/lms");

server.get("/api/courses", (req, res, next) => {
  res.status(200).send(lms.fetchCourses);
});

server.listen(3000, () => {
  console.log("server listening on port 3000");
});
