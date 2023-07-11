import { BOARD_SIZE, SHIPS } from '../constants';

export function setUpShips(gameId: number, connectionId: string){

  const toClient = JSON.stringify({
    type: "start_setup_ships",
    data: JSON.stringify({
      gameId,
      connectionId,
      fieldSize: BOARD_SIZE,
      shipsAvailable: SHIPS
    })
  });

  return toClient;
}