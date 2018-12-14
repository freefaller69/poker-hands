import { Injectable } from '@angular/core';
import { Player } from './player';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  players: Player[] = [];

  constructor() { }

  initPlayers() {
    // const michael: Player = {
    //   playerName: 'Michael',
    //   handName: '',
    //   handValue: 0,
    //   highCard: 0,
    //   hand: {
    //     playerHand: []
    //   }
    // };
    // const michelle: Player = {
    //   playerName: 'Michelle',
    //   handName: '',
    //   handValue: 0,
    //   highCard: 0,
    //   hand: {
    //     playerHand: []
    //   }
    // };
    const michael = new Player('Michael');
    const michelle = new Player('Michelle');

    this.players.push(michael);
    this.players.push(michelle);
    return this.players;
  }

  clearHand() {
    this.players.forEach(player => {
      player.hand.playerHand = [];
      player.handName = '';
      player.handValue = 0;
      player.highCard = 0;
    });
  }
}
