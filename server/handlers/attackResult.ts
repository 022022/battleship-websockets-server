import { db } from '../inMemoryDB';
import { Player } from '../types';

export async function attackResult(gameId: number, player1: Player, player2: Player){
    const player2Response = JSON.stringify({
      type: "attack_result",
      data: JSON.stringify({
        myTurn: false,
        myShipCells:  player2.myShipCells,
        myWoundedCells: player2.myWoundedCells,
        opponentsEmptyCells: player2.opponentsEmptyCells,
        opponentsWoundedCells: player2.opponentsWoundedCells
      })
    })
    player2.ws.send(player2Response);

    const player1Response = JSON.stringify({
      type: "attack_result",
      data: JSON.stringify({
        myTurn: true,
        myShipCells:  player1.myShipCells,
        myWoundedCells: player1.myWoundedCells,
        opponentsEmptyCells: player1.opponentsEmptyCells,
        opponentsWoundedCells: player1.opponentsWoundedCells
      })
    });

    player1.ws.send(player1Response);

    db.get(gameId).turn = player2.connectionId;

    return;
}