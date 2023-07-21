import { WebSocket } from 'ws';

export const db = new Map();

export const wsToGames = new Map<WebSocket, number>();