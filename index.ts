import { SerialPort } from "serialport";
import { ReadlineParser } from "@serialport/parser-readline";
import { createInterface } from "readline";

const port = new SerialPort({
  path: '/dev/tty.usbserial-A50285BI',
  baudRate: 115200
});

const parser = new ReadlineParser();

port.open(() => {
  console.log('=== 接続しました ===')
})

port.pipe(parser);
parser.on('data', (data) => console.log(data))

const reader = createInterface({
  input: process.stdin
});

reader.on('line', function (line) {
  port.write(Buffer.from(line + '\n'));
});