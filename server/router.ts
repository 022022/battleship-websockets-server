import { createGame } from './handlers/createGame';
import { v4 } from 'uuid';
import { joinGame } from './handlers/joinGame';
import { setUpShips } from './handlers/setUpShips';
import { startGame } from './handlers/startGame';
import { attack } from './handlers/attack';
import { error } from './handlers/error';

export function onConnect(wsClient: WebSocket) {
  const connectionId = v4();

  const initialConnection = JSON.stringify({
    type: 'initial_connection',
    data: JSON.stringify({}),
  });

  wsClient.send(initialConnection);

  wsClient.onmessage = async (event: MessageEvent<string>) => {
    try {
        const message = JSON.parse(event.data);
        const data = JSON.parse(message.data);
        console.log(console.log('message from client - ', message));

        switch(message.type){
          case 'create_game': {
            const response = createGame(data, wsClient, connectionId);
            await wsClient.send(response);
            break;
          }
          case 'join_game': {
            const response = joinGame(data, wsClient, connectionId);
            await wsClient.send(response);
            break;
          }
          case 'set_up_ships': {
            const response = setUpShips(data.gameId, connectionId);
            await wsClient.send(response);
            break;
          }
          case 'start_game': {
            await startGame(data.gameId, data.startMarkedCells, connectionId);
            break;
          }
          case 'attack': {
            await attack(data.gameId, data.attackedCell, connectionId);
            break;
          }
        }

    } catch(e) {
      const response = error();
      await wsClient.send(response);
    }
  };
}