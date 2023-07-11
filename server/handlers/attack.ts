import { db } from '../inMemoryDB';
import { Player } from '../types';
import { attackResult } from './attackResult';

export function attack(gameId: number, attackedCell: string, connectionId: string){
  const anotherPlayer = Array.from<Player>(db.get(gameId).players.values()).find((player) => player.connectionId !== connectionId)
  const thisPlayer: Player = db.get(gameId).players.get(connectionId);

  if(anotherPlayer){
    if(anotherPlayer?.myShipCells.includes(attackedCell)){
      anotherPlayer.myWoundedCells.push(attackedCell);
      thisPlayer.opponentsWoundedCells.push(attackedCell);
    } else {
      thisPlayer.opponentsEmptyCells.push(attackedCell)
    }

    attackResult(gameId, anotherPlayer, thisPlayer);
  }

}