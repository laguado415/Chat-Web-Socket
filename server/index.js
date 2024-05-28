import express from "express";
import http from "http";
import { Server as SocketServer } from "socket.io";

// inicializacion del server
const app = express();

// se crea servidor http
const server = http.createServer(app);

// se establece en el server de scket.io
const io = new SocketServer(server);

io.on("connection", (socket) => {
  console.log("Client connected");
});

server.listen(3001);
console.log("server on port", 3001);
