import { PLAYER_STATUS } from '../constants';
import { db } from '../inMemoryDB';
import { Player } from '../types';
import { attackResult } from './attackResult';

export function startGame(gameId: number, startMarkedCells: string[], connectionId: string){
  const anotherPlayer = Array.from<Player>(db.get(gameId).players.values()).find((player) => player.connectionId !== connectionId)
  const thisPlayer = db.get(gameId).players.get(connectionId);

  thisPlayer.myShipCells = [...startMarkedCells];

  if(anotherPlayer?.status === PLAYER_STATUS.SETTING_UP){
    thisPlayer.status = PLAYER_STATUS.WAITING;

    anotherPlayer.ws.send(JSON.stringify({type: "another_player_started", data: JSON.stringify({})}));

    const toThisPlayer = JSON.stringify({
      type: "another_player_not_started",
      data: JSON.stringify({anotherPlayerName: anotherPlayer.name})
    });

    thisPlayer.ws.send(toThisPlayer);
  }

  else if(anotherPlayer?.status === PLAYER_STATUS.WAITING){

    thisPlayer.status = PLAYER_STATUS.STARTED_GAME;
    anotherPlayer.status = PLAYER_STATUS.STARTED_GAME;

    db.get(gameId).turn = connectionId;

    attackResult(gameId, thisPlayer, anotherPlayer);
    return;
  }

  return;
}