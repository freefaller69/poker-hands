import { CardsService } from '../shared/cards.service';
import { Component, OnInit } from '@angular/core';
import { Player } from '../player';
import { PlayerService } from '../shared/player.service';

@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.scss']
})
export class DeckComponent implements OnInit {
  deck = [];
  shuffledDeck = [];
  cardsPerHand = 5;
  players: Player[] = [];
  ranks = [];
  winner = '';

  constructor(
    private cardsService: CardsService,
    private playersService: PlayerService
  ) { }

  ngOnInit() {
    this.players = this.playersService.initPlayers();
    this.deck = this.cardsService.getDeck();
    this.shuffledDeck = [...this.deck];
    const deckCheck = this.cardsService.groupBy(this.shuffledDeck, 'uniqueName');
  }

  shuffleCards() {
    this.playersService.clearHand();
    this.ranks = [];
    this.winner = '';
    this.shuffledDeck = this.cardsService.shuffle([...this.deck]);
  }

  dealCards() {
    let currentHandSize = this.cardsPerHand;
    while (currentHandSize > 0) {
      this.players.forEach(player => {
        player.hand.playerHand.push(this.shuffledDeck.shift());
      });
      currentHandSize--;
    }

    this.players.forEach(player => {
      player.hand.playerHand.sort(this.cardsService.compareValues('cardValue'));
      this.cardsService.evaluateHand(player.hand.playerHand);
      this.ranks.push(player);
    });
    const tieCheck = this.cardsService.groupBy(this.ranks, 'handValue');
    if (Object.keys(tieCheck).length === 1) {
      this.ranks.sort(this.cardsService.compareValues('highCard'));
    } else {
      this.ranks.sort(this.cardsService.compareValues('handValue', 'desc'));
    }
    this.winner = this.ranks[this.ranks.length - 1].playerName;
  }
}
