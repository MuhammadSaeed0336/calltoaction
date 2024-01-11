// In your Node.js project, create a server file (e.g., server.js) and add the following code:

const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors"); // Import the cors package
const app = express();
const server = http.createServer(app);

app.use(cors());
const io = socketIo(server, {
  cors: {
    origin: "*", // Replace with your client's origin
  },
});

const port = 3000;

app.use(bodyParser.json());
app.use(express.static("public"));

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

app.post("/addData", async (req, res) => {
  const { title, desc } = req.body;

  try {
    io.emit("dataAdded", { title, desc });
  } catch (error) {}
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
