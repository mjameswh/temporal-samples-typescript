import WebSocket from 'ws';
import axios from 'axios';

export async function makeHTTPRequest(): Promise<string> {
  const res = await axios.get('http://httpbin.org/get?answer=42');

  return res.data.args.answer;
}

export async function makeWebsocketRequest(): Promise<string> {
  const ws = new WebSocket(`https://echo.websocket.org/.ws}`);
  let resolvePromise: (value: string) => void;
  const promise = new Promise<string>((resolve) => {
    resolvePromise = resolve;
  });

  ws.on('open', () => {
    console.log('Connected to server');
    ws.send('Hello, server!');
  });

  ws.on('message', (base64Message: Buffer) => {
    const message = base64Message.toString();
    // const message = Buffer.from(base64Message.toString(), 'base64').toString();
    console.log(`Received message: ${message}`);
    if (message.startsWith('Hello')) resolvePromise(message);
  });

  ws.on('close', () => {
    console.log('Disconnected from server');
  });

  return await promise;
}
