export interface Player {
  playerName: string;
  hand: Hand;
  handName: string;
  handValue: number;
  highCard: number;
}

export interface Hand {
  playerHand: Card[];
}

export interface Card {
  cardName: string;
  cardSuit: string;
  cardValue: number;
}
