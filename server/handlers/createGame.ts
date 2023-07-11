import { PLAYER_STATUS } from '../constants';
import { db } from '../inMemoryDB';

export function createGame({initiatorPleerName}: {initiatorPleerName: string}, wsClientLink: WebSocket, connectionId: string){
  const gameId = db.size + 1;
  const accessCode = Math.floor(Math.random() * 1000000);


  //const ships = Array(BOARD_SIZE).fill(0).map(item => Array(BOARD_SIZE).fill(0));


  const players = new Map();

  const myShipCells:  string[] = [];
  const myWoundedCells: string[] = [];
  const opponentsEmptyCells: string[] = [];
  const opponentsWoundedCells: string[] = [];

  players.set(connectionId, {
    name: initiatorPleerName,
    myShipCells,
    myWoundedCells,
    opponentsEmptyCells,
    opponentsWoundedCells,
    ws: wsClientLink,
    status: PLAYER_STATUS.SETTING_UP,
    connectionId: connectionId
  })
  db.set(gameId, {players, turn: connectionId, winner: null, accessCode})

  const toClient = JSON.stringify({
      type: "provide_access_code",
      data: JSON.stringify({
        accessCode: `${gameId}-${accessCode}`,
        gameId: gameId,
      })
  });
  return toClient;
}