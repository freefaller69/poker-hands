import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CardsService {
  cardsPerHand = 5;
  values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
  suits = ['C', 'D', 'H', 'S'];
  deck = [];

  constructor() { }

  getDeck() {
    this.suits.forEach(suit => {
      this.values.map((cardId, index) => {
        let cardColor = 'black';
        if (suit === 'D' || suit === 'H') {
          cardColor = 'red';
        }
        const newCard = {
          cardName: cardId,
          cardSuit: suit,
          cardValue: index + 2,
          cardColor: cardColor,
          uniqueName: cardId + suit
        };
        this.deck.push(newCard);
      });
    });
    return this.deck;
  }

  shuffle = function (array) {
    let currentIndex = array.length;
    let temporaryValue, randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  };

  sortHand(a, b) {
    const cardA = a.cardValue;
    const cardB = b.cardValue;

    let comparison = 0;
    if (cardA > cardB) {
      comparison = 1;
    } else if (cardA < cardB) {
      comparison = -1;
    }
    return comparison;
  }

  rankHands(a, b) {
    const handA = a.handValue;
    const handB = b.handValue;

    let comparison = 0;
    if (handA > handB) {
      comparison = 1;
    } else if (handA < handB) {
      comparison = -1;
    }
    return comparison;
  }

  rankHighCard(a, b) {
    const handA = a.highCard;
    const handB = b.highCard;

    let comparison = 0;
    if (handA > handB) {
      comparison = 1;
    } else if (handA < handB) {
      comparison = -1;
    }
    return comparison;
  }

  evaluateHand(player) {
    const activeHand = player.hand.playerHand;
    const values = activeHand.map(card => card.cardValue);
    const suitCount = this.groupBy(activeHand, 'cardSuit');
    const valueCount = this.groupBy(activeHand, 'cardValue');
    const entries = Object.entries(valueCount);
    const highCard = this.getHighCard(activeHand);

    switch (entries.length) {
      case 5:
        let isStraight = false;
        let isFlush = false;

        // Check for straight
        if ((values[this.cardsPerHand - 1] - values[0] + 1 === this.cardsPerHand) && (values.length === this.cardsPerHand)) {
          isStraight = true;
        }
        // Check for flush
        if (Object.keys(suitCount).length === 1) {
          isFlush = true;
        }
        if (isStraight && isFlush) {
          // isStraightFlush = true;
          if (highCard === 14) {
            player.handName = 'Royal Flush';
            player.handValue = 100;
          } else {
            player.handName = 'Straight Flush';
            player.handValue = 80;
          }
        } else if (isFlush) {
          player.handName = 'Flush';
          player.handValue = 50;
          player.highCard = highCard;
        } else if (isStraight) {
          player.handName = 'Straight';
          player.handValue = 40;
          player.highCard = highCard;
        } else {
          player.highCard = highCard;
        }
        break;

      case 4:
        player.handName = 'Pair';
        player.handValue = 10;
        break;

      case 3:
        if (entries.find(item => item[1] === 3)) {
          player.handName = 'Three of a Kind';
          player.handValue = 30;
        } else if (entries.find(item => item[1] === 2)) {
          player.handName = 'Two Pair';
          player.handValue = 20;
        }
        break;

      case 2:
        if (entries.find(item => item[1] === 4)) {
          player.handName = 'Four of a Kind';
          player.handValue = 70;
        } else if (entries.find(item => item[1] === 3)) {
          player.handName = 'Full House';
          player.handValue = 60;
        }
        break;
      default:
        console.log('Something is not right');
    }
  }

  getHighCard(hand) {
    return hand[this.cardsPerHand - 1].cardValue;
  }

  groupBy(objectArray, property) {
    return objectArray.reduce(function (acc, obj) {
      const key = obj[property];
      if (!acc[key]) {
        acc[key] = 0;
      }
      acc[key]++;
      return acc;
    }, {});
  }
}
