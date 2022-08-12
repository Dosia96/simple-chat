const WebSocket = require('ws');
const readline = require('readline');  
const colors = require('colors');

// global
const HELP = "/help"

let ws = new WebSocket('ws://1.117.115.72:3445/chat');

// 打开WebSocket连接后立刻发送一条消息:
ws.on('open', function () {
    console.log(`linked to simple-chat server`);
    console.log("first use '/create <username>' to create a user, and then send your msg".bgBlue)
    console.log(" * * You can use '/help' for more commands * *".rainbow)
});

const rl = readline.createInterface({  
    input: process.stdin,  
    output: process.stdout  
}); 

rl.on('line', function (input) {  
    if(input == HELP) {
        console.log("/create <username>".blue, " to create a user.")
        console.log("waiting for more commands...")
    } else {
        ws.send(input);
    }
});  

// 响应收到的消息:
ws.on('message', function (message) {
    console.log(`${message}`);
})