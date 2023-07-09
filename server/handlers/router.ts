export function onConnect(wsClient: WebSocket) {
  wsClient.send('message from server');
}