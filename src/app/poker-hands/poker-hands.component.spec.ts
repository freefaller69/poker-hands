import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PokerHandsComponent } from './poker-hands.component';

describe('PokerHandsComponent', () => {
  let component: PokerHandsComponent;
  let fixture: ComponentFixture<PokerHandsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PokerHandsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokerHandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
