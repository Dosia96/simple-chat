const WebSocket = require('ws');

const WebSocketServer = WebSocket.Server;

// settings
const port = 3445;

// global
const CREATEUSER = "/create"

let chatGroup = [];
let tempGroup = [];

// new server
const wss = new WebSocketServer({
    port: port
});
console.log("Start server, listen port on: ", port);

wss.on('connection', function (ws) {
    ws.on('message', function (message) {
        console.log(`[SERVER] Received from ${ws.name}: ${message}`);
        let input = `${message}`;
        
        console.log('input:', input);
        
        // handle command
        if (input.startsWith('/')) { // command line
            console.log('recv cmd');
            let cmd = input.split(' ')[0]
            let value = input.split(' ')[1]
            if (cmd === CREATEUSER) {
                ws.name = value;
                chatGroup.push(ws)
                ws.send(`create user '${value}' success!`);
                console.log('[SERVER] add new member');
            }
        } else { // only chat
            chatGroup.forEach((member) => {
                member.send(`${ws.name} : ${message}`, (err) => {
                    if (err) {
                        console.log(`[SERVER] error: ${err}`);
                    }
                });
            })
        }

    })
});