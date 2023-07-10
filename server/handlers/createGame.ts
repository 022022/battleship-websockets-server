import { BOARD_SIZE } from '../constants';
import { db } from '../inMemoryDB';

export function createGame({initiatorPleerName}: {initiatorPleerName: string}, wsClientLink: WebSocket, connectionId: string){
  const gameId = db.size + 1;
  const accessCode = Math.floor(Math.random() * 1000000);

  const players = new Map();
  const ships = Array(BOARD_SIZE).fill(0).map(item => Array(BOARD_SIZE).fill(0));
  players.set(connectionId, {name: initiatorPleerName, ships, ws: wsClientLink})
  db.set(gameId, {players, turn: true, winner: null, accessCode})

  const toClient = JSON.stringify({
      type: "provide_access_code",
      data: JSON.stringify({
        accessCode: `${gameId}-${accessCode}`,
        gameId: gameId,
      })
  });
  return toClient;
}