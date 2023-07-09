import { WebSocketServer } from 'ws';
import { onConnect } from './handlers/router';

export const wsServer = new WebSocketServer({port: 4000});
wsServer.on('connection', onConnect);