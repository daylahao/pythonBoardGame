import gameManager from '../Asset/GameManager.js';
import{Player}  from '../Player/Player.js';
let ws = null;
let clientId = null;
function connect() {
    ws = new WebSocket('ws://localhost:9090');
    ws.onmessage = message => {
        const response = JSON.parse(message.data);
        if(response.method === 'connect') {
            clientId = response.clientId;
            console.log(`Connected to server. Client ID: ${clientId}`);
        }else if( response.method === 'create'){
            console.log(response);
        }
        else if (response.method === 'join'){
            const gameId = response.game.roomId;
            const players = response.game.players;
            // console.log(gameId)
            const color =  {"1": "Red", "2": "Green", "3": "Blue", "4" : "Gray"}[players.length]
            // let player = new Player(clientId, 'Player', 0, 0);
            // player.setColor(color);
            // gameManager.addPlayer(player);
            // console.log(player.colorPlayer);
        }
        console.log(response);
    }
}

function getWebSocket() {
    if (!ws) {
        connect();
    }
    return ws;
}

export default getWebSocket;