import { db } from '../inMemoryDB';
import { Player } from '../types';

export async function endGame(gameId: number, winner: Player, player2: Player){
      db.get(gameId).winner = winner.connectionId;

      const winnerResponse = JSON.stringify({
        type: "end_game",
        data: JSON.stringify({
          isWinner: true,
          winnerName: winner.name,
          myShipCells:  winner.myShipCells,
          myWoundedCells: winner.myWoundedCells,
          opponentsWoundedCells: player2.myWoundedCells,
          opponentsShipCells: player2.myShipCells,
        })
      });

      winner.ws.send(winnerResponse);

      const player2Response = JSON.stringify({
        type: "end_game",
        data: JSON.stringify({
          isWinner: false,
          winnerName: winner.name,
          myShipCells:  player2.myShipCells,
          myWoundedCells: player2.myWoundedCells,
          opponentsWoundedCells: winner.myWoundedCells,
          opponentsShipCells: winner.myShipCells,
        })
      })
      player2.ws.send(player2Response);

      return;
  }