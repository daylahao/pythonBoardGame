let ws = null;

function connect() {
    ws = new WebSocket('ws://localhost:9090');
    ws.onmessage = message => {
        const response = JSON.parse(message.data);
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