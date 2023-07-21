import { WebSocket } from 'ws';
import { PLAYER_STATUS } from '../constants';
import { db, wsToGames } from '../inMemoryDB';
import { setUpShips } from './setUpShips';

export async function joinGame({secondPlayerName, accessCode}: {secondPlayerName: string, accessCode: string}, wsClientLink: WebSocket, connectionId: string){

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

  const myShipCells:  string[] = [];
  const myWoundedCells: string[] = [];
  const opponentsEmptyCells: string[] = [];
  const opponentsWoundedCells: string[] = [];

  db.get(gameId).players.set(connectionId, {
    name: secondPlayerName,
    myShipCells,
    myWoundedCells,
    opponentsEmptyCells,
    opponentsWoundedCells,
    ws: wsClientLink,
    status: PLAYER_STATUS.SETTING_UP,
    connectionId: connectionId,
  });

  wsToGames.set(wsClientLink, gameId);

  const toClient = setUpShips(gameId, connectionId);

  return toClient;
}