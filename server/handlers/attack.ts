import { db } from '../inMemoryDB';
import { Player } from '../types';
import { attackResult } from './attackResult';
import { endGame } from './endGame';

export async function attack(gameId: number, attackedCell: string, connectionId: string){
  const anotherPlayer = Array.from<Player>(db.get(gameId).players.values()).find((player) => player.connectionId !== connectionId)
  if(!anotherPlayer) return;

  const thisPlayer: Player = db.get(gameId).players.get(connectionId);

  if(anotherPlayer?.myShipCells.includes(attackedCell)){
    anotherPlayer?.myWoundedCells.push(attackedCell);
    thisPlayer.opponentsWoundedCells.push(attackedCell);
  } else {
    thisPlayer.opponentsEmptyCells.push(attackedCell)
  }

  if(anotherPlayer?.myWoundedCells.length === anotherPlayer.myShipCells.length){
    endGame(gameId, thisPlayer, anotherPlayer);
  } else {
    attackResult(gameId, anotherPlayer, thisPlayer);
  }

}