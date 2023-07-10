import { BOARD_SIZE } from '../constants';
import { db } from '../inMemoryDB';
import { setUpShips } from './setUpShips';

export function joinGame({secondPlayerName, accessCode}: {secondPlayerName: string, accessCode: string}, wsClientLink: WebSocket, connectionId: string){

  const [gameId, code] = accessCode.split('-').map(Number);

  if(!db.get(gameId)) {
    const toClient = JSON.stringify({
      type: "error_no_game", data: {}
    });
    return toClient;
  }

  if(db.get(gameId).players.size === 2) {
    const toClient = JSON.stringify({
      type: "error_game_full", data: {}
    });
    return toClient;
  }

  if(db.get(gameId).accessCode !== code) {
    const toClient = JSON.stringify({
      type: "error_wrong_code", data: {}
    });
    return toClient;
  }

  const ships = Array(BOARD_SIZE).fill(0).map(item => Array(BOARD_SIZE).fill(0));
  db.get(gameId).players.set(connectionId, {name: secondPlayerName, ships, ws: wsClientLink})

  const toClient = setUpShips(gameId, wsClientLink, connectionId);

  return toClient;
}