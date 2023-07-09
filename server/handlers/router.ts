export function onConnect(wsClient: WebSocket) {
  const initialConnection = JSON.stringify({
    type: 'initial_connection',
    data: JSON.stringify({}),
  });

  wsClient.send(initialConnection);

  wsClient.onmessage = (event: MessageEvent<string>) => {
    const message = JSON.parse(event.data);
    console.log(console.log('message from client - ', message));
  };
}