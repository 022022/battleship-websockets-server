import { WebSocket } from 'ws';
import { PLAYER_STATUS } from './constants';

export interface Player {
  name: string,
  myShipCells: string[],
  myWoundedCells: string[],
  opponentsEmptyCells: string[],
  opponentsWoundedCells: string[],
  ws: WebSocket,
  status: PLAYER_STATUS
  connectionId: string;
}


