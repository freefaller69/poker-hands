import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DeckComponent } from './deck/deck.component';
import { PokerHandsComponent } from './poker-hands/poker-hands.component';
import { CardComponent } from './poker-hands/card/card.component';

@NgModule({
  declarations: [
    AppComponent,
    DeckComponent,
    PokerHandsComponent,
    CardComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
