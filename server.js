const http = require("http");
const express = require("express");
const app = express();
app.get("/", (req,res)=> res.sendFile(__dirname + "/index.html"))
app.use(express.static(__dirname + ""))
app.listen(9091, ()=>console.log("Listening on http port 9091"))
const websocketServer = require("websocket").server
const httpServer = http.createServer();
httpServer.listen(9090, () => console.log("Listening.. on 9090"))
//hashmap clients
const clients = {};
const games = {};
let game = {}
const db = require('./Config/index.db');
const room = require('./Model/Room');
db.connect()
//api server
app.get('/api/rooms', (req, res) => {
    room.find({})
    .then(room =>{
        res.json(room)
    }).catch(err => {
        res.status(500).send(err)
    })
});
const wsServer = new websocketServer({
    "httpServer": httpServer
})
wsServer.on("request", request => {
    //connect
    const connection = request.accept(null, request.origin);
    connection.on("open", () => console.log("opened!"))
    connection.on("close", () => console.log("closed!"))
    connection.on("message", message => {
        const result = JSON.parse(message.utf8Data)
        console.log('Received message:', result);
        // Check if the message is a 'create' or 'join' request
        if(result.method === "create") {
            const gameId = guid();
            games[gameId] = {
                "id": gameId,
                "name": result.name,
                "clients": []
            }
        
            games[gameId].clients.push(clientId);
            
            const payLoad = {
                "method": "create",
                "game": games[gameId],
                // "clientId": clientId
            }
            const Room = new room({ roomId: gameId, name: result.name, players: [clientId] });
            Room.save()
                .then(() => console.log('Room saved to database'))
                .catch(err => console.error('Error saving room to database:', err));
            clients[clientId].connection.send(JSON.stringify(payLoad));
            // console.log(JSON.stringify(payLoad))

        } else if(result.method === "join") {
            // const clientId = result.clientId;
            const gameId = result.gameId;
            room.findOne({"roomId": gameId})
                .then(room => {
                    if(room.players.length < 4 ){
                        room.players.push(clientId);
                        room.save()
                            .then(() => console.log('player joined'))
                            .catch(err => console.error('Error saving room to database:', err));
                        const payLoad = {
                            "method": "join",
                            "game": room
                        }
                            clients[clientId].connection.send(JSON.stringify(payLoad));
                            // console.log(JSON.stringify(payLoad))
                    } else {
                        const payLoad = {
                            "method": "full",
                            "game": room
                        }
                            clients[clientId].connection.send(JSON.stringify(payLoad));
                        // console.log(JSON.stringify(payLoad))
                    }
            })
                .catch(err => console.error('Error finding room:', err));
                
            //     clients[clientId].connection.send(JSON.stringify(payLoad));
            //     console.log(JSON.stringify(payLoad))
            } else if(result.method === "play") {
            }
    });

    
    const clientId = guid();
    clients[clientId] = {
        "connection":  connection
    }

    const payLoad = {
        "method": "connect",
        "clientId": clientId
    }
    //send back the client connect
    connection.send(JSON.stringify(payLoad))

})





function S4() {
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1); 
}
// then to call it, plus stitch in '4' in the third group
const guid = () => (S4() + S4() + "-" + S4() + "-4" + S4().substr(0,3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();