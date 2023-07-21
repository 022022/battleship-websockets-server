import { createGame } from './handlers/createGame';
import { v4 } from 'uuid';
import { joinGame } from './handlers/joinGame';
import { setUpShips } from './handlers/setUpShips';
import { startGame } from './handlers/startGame';
import { attack } from './handlers/attack';
import { error } from './handlers/error';
import { WebSocket } from 'ws';
import { db, wsToGames } from './inMemoryDB';
import { Player } from './types';

export function onConnect(wsClient: WebSocket) {
  const connectionId = v4();

  const initialConnection = JSON.stringify({
    type: 'initial_connection',
    data: JSON.stringify({}),
  });

  wsClient.send(initialConnection);

  wsClient.on('message', async (messageRaw: string) => {
    try {
        const message = JSON.parse(messageRaw);
        const data = JSON.parse(message.data);
        console.log(console.log('message from client - ', message));

        switch(message.type){
          case 'create_game': {
            const response = await createGame(data, wsClient, connectionId);
            wsClient.send(response);
            break;
          }
          case 'join_game': {
            const response = await joinGame(data, wsClient, connectionId);
            wsClient.send(response);
            break;
          }
          case 'set_up_ships': {
            const response = await setUpShips(data.gameId, connectionId);
            wsClient.send(response);
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
      const response = await error();
      wsClient.send(response);
    }
  });

  wsClient.on('close', () => {
    const gameId = wsToGames.get(wsClient);

    if(gameId !== undefined){
      const anotherPlayer = Array.from<Player>(db.get(gameId).players.values()).find((player) => player.ws !== wsClient);
      anotherPlayer?.ws.send(JSON.stringify({type: "another_player_disconnected", data: JSON.stringify({})}));
    }
  });
}