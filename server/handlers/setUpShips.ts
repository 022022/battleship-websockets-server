import { db } from '../inMemoryDB';

export function setUpShips(gameId: number, wsClientLink: WebSocket, connectionId: string){

  const toClient = JSON.stringify({
    type: "start_setup_ships",
    data: JSON.stringify({
      gameId,
      connectionId,
      emptyMatrix: db.get(gameId).players.get(connectionId).ships
    })
  });

  return toClient;
}