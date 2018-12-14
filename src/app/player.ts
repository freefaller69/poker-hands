// export interface Player {
//   playerName: string;
//   hand: Hand;
//   handName: string;
//   handValue: number;
//   highCard: number;
// }

export interface Hand {
  playerHand: Card[];
}

export interface Card {
  cardName: string;
  cardSuit: string;
  cardValue: number;
}

export class Player {
  playerName: string;
  hand: Hand;
  handName: string;
  handValue: number;
  highCard: number;

  constructor(playerName, hand = []) {
    this.playerName = playerName;
    this.handName = '';
    this.handValue = 0;
    this.highCard = 0;
  }
}
