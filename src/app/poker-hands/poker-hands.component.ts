import { CardsService } from '../shared/cards.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-poker-hands',
  templateUrl: './poker-hands.component.html',
  styleUrls: ['./poker-hands.component.scss']
})
export class PokerHandsComponent implements OnInit {
  deck = [];
  shuffledDeck = [];
  cardsPerHand = 5;
  hand = [];
  ranks = [];
  winner = '';

  constructor(
    private cardsService: CardsService,
  ) { }

  ngOnInit() {
    this.deck = this.cardsService.getDeck();
  }

  drawCard(card) {
    if (card.cardInDeck === true && this.hand.length < 5) {
      card.cardInDeck = false;
      this.hand.push(card);
    }
    if (this.hand.length === 5) {
      this.cardsService.evaluateHand(this.hand);
    }
  }

  dropCard(i) {
    const currentCard = this.hand[i].uniqueName;
    const inDeck = this.deck.find( card => card.uniqueName === currentCard );
    inDeck.cardInDeck = true;
    this.hand.splice(i, 1);
  }

  onSaveHand() {
    this.hand.sort(this.cardsService.sortHand);
    this.cardsService.evaluateHand(this.hand);
    this.ranks.push(this.hand);
    this.ranks[this.ranks.length - 1].playerNum = this.ranks.length;
    this.hand = [];
    const tieCheck = this.cardsService.groupBy(this.ranks, 'handValue');
    if (Object.keys(tieCheck).length === 1) {
      this.ranks.sort(this.cardsService.rankHighCard);
    } else {
      this.ranks.sort(this.cardsService.rankHands);
    }
  }

}
