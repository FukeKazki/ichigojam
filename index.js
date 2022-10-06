"use strict";
exports.__esModule = true;
var serialport_1 = require("serialport");
var parser_readline_1 = require("@serialport/parser-readline");
var readline_1 = require("readline");
var port = new serialport_1.SerialPort({
    path: '/dev/tty.usbserial-A50285BI',
    baudRate: 115200
});
var parser = new parser_readline_1.ReadlineParser();
port.open(function () {
    console.log('=== 接続しました ===');
});
port.close(function () {
    console.log('=== 切断しました ===');
});
port.pipe(parser);
parser.on('data', function (data) { return console.log(data); });
var reader = (0, readline_1.createInterface)({
    input: process.stdin
});
reader.on('line', function (line) {
    port.write(Buffer.from(line + '\n'));
});
