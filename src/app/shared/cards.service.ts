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
          uniqueName: cardId + suit,
          cardInDeck: true
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

  compareValues(key, order = 'asc') {
    return function(a, b) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        // property doesn't exist on either object
        return 0;
      }

      const varA = (typeof a[key] === 'string') ?
        a[key].toUpperCase() : a[key];
      const varB = (typeof b[key] === 'string') ?
        b[key].toUpperCase() : b[key];

      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return (
        (order === 'desc') ? (comparison * -1) : comparison
      );
    };
  }

  evaluateHand(hand) {
    const activeHand = hand;
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
          if (highCard === 14) {
            activeHand.handName = 'Royal Flush';
            activeHand.handValue = 1000;
          } else {
            activeHand.handName = 'Straight Flush';
            activeHand.handValue = 800 + highCard;
          }
        } else if (isFlush) {
          activeHand.handName = 'Flush';
          activeHand.handValue = 500 + highCard;
        } else if (isStraight) {
          activeHand.handName = 'Straight';
          activeHand.handValue = 400 + highCard;
        } else {
          activeHand.handName = 'High Card';
          activeHand.handValue = 0 + highCard;
        }
        break;

      case 4:
        activeHand.handName = 'Pair';
        activeHand.handValue = 100 + highCard;
        break;

      case 3:
        if (entries.find(item => item[1] === 3)) {
          activeHand.handName = 'Three of a Kind';
          activeHand.highCard = parseInt(entries.find(item => item[1] === 3)[0]);
          activeHand.handValue = 300 + activeHand.highCard;
        } else if (entries.find(item => item[1] === 2)) {
          activeHand.handName = 'Two Pair';
          activeHand.handValue = 200 + highCard;
        }
        break;

      case 2:
        if (entries.find(item => item[1] === 4)) {
          activeHand.handName = 'Four of a Kind';
          activeHand.highCard = parseInt(entries.find(item => item[1] === 4)[0]);
          activeHand.handValue = 700 + activeHand.highCard;
        } else if (entries.find(item => item[1] === 3)) {
          activeHand.handName = 'Full House';
          activeHand.highCard = parseInt(entries.find(item => item[1] === 3)[0]);
          activeHand.handValue = 600 + activeHand.highCard;
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
