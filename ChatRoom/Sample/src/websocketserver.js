const express = require("express");
const http = require("http");
const websocket = require("ws");
const config = require('../config.json');

const port = config.wsSetting.wsPort;
const server = http.createServer(express);
const websocketserver = new websocket.Server({ server });

websocketserver.on("connection", (ws) => {
    ws.on("message", (data) => {
        websocketserver.clients.forEach((client) => {
            if (client !== ws && client.readyState == websocket.OPEN) {
                client.send(data);
            }
        })
    })
})

server.listen(port, () => {
    console.log(`Server is listening on ${port}!`);
});