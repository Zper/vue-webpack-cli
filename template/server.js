'use strict';
let http = require('http');

let WebSocketServer = require('ws').Server,
    wss = new WebSocketServer({port: 8181});
console.log('WebSocket开启,请保持开启状态！');
console.log('等待连接...')
wss.on('connection', (ws) => {
    console.log('连接成功！');
    ws.on('message', (message) => {

        console.log(message);
        let callback = {
            header: '',
            data: ''
        }
        let data = message ? JSON.parse(message) : {};

        let options = {
            hostname: 'www.weather.com.cn',
            path: '/data/sk/101280800.html',
            method: 'GET',
        };

        let req = http.request(options, (res) => {
            console.log('STATUS: ' + res.statusCode);
            console.log('HEADERS: ' + JSON.stringify(res.headers));
            res.setEncoding('utf8');
            res.on('data', (chunk) => {
                callback.header = res.headers;
                callback.data = chunk;
                // console.log('BODY: ' + chunk);
                ws.send(JSON.stringify(callback));
            });
        });

        req.on('error', (e) => {
            console.log('problem with request: ' + e.message);
        });

        req.end();
    });
    ws.on('close', () => {
        console.log('连接断开');
    });
});