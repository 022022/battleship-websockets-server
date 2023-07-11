import { createGame } from './createGame';
import { v4 } from 'uuid';
import { joinGame } from './joinGame';
import { setUpShips } from './setUpShips';
import { startGame } from './startGame';
import { attack } from './attack';

export function onConnect(wsClient: WebSocket) {
  const connectionId = v4();

  const initialConnection = JSON.stringify({
    type: 'initial_connection',
    data: JSON.stringify({}),
  });

  wsClient.send(initialConnection);

  wsClient.onmessage = (event: MessageEvent<string>) => {
    const message = JSON.parse(event.data);
    const data = JSON.parse(message.data);
    console.log(console.log('message from client - ', message));

    switch(message.type){
      case 'create_game': {
        const response = createGame(data, wsClient, connectionId);
        wsClient.send(response);
        break;
      }
      case 'join_game': {
        const response = joinGame(data, wsClient, connectionId);
        wsClient.send(response);
        break;
      }
      case 'set_up_ships': {
        const response = setUpShips(data.gameId, connectionId);
        wsClient.send(response);
        break;
      }
      case 'start_game': {
        startGame(data.gameId, data.startMarkedCells, connectionId);
        break;
      }
      case 'attack': {
        attack(data.gameId, data.attackedCell, connectionId);
        break;
      }
    }

  };
}