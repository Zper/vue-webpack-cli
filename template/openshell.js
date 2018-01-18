const fs = require('fs');
const spawn = require('child_process').spawn;

const ls = spawn('node', ['./server.js'], {
    detached: true,
    shell: true,
    stdio: 'ignore'
});

ls.unref();

ls.on('close', (code) => {
    console.log('child exists with code: ' + code);
});

ls.on('error', (err) => {
    console.log('启动子进程失败。');
});