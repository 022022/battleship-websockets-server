export const BOARD_SIZE = 10;

export const SHIPS = [
  {type: 1, quantity: 4},
  {type: 2, quantity: 3},
  {type: 3, quantity: 2},
  {type: 4, quantity: 1}
]

export enum PLAYER_STATUS {
  'SETTING_UP' = 'settingUp',
  'WAITING' = 'startedGame',
  'STARTED_GAME' = 'startedGame'
}