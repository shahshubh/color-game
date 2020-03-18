import React, { Component } from 'react';
import shuffle from 'shuffle-array'
import Navbar from './Navbar'
import Card from './Card'


const CardState = {
  HIDING: 0,
  SHOWING: 1,
  MATCHING: 2
}

var counter = 0;


class MemoryGame extends Component {
  constructor(props){
    super(props)


    let cards = [
      {id: 0, CardState: CardState.HIDING, backgroundColor: 'red'},
      {id: 1, CardState: CardState.HIDING, backgroundColor: 'red'},
      {id: 2, CardState: CardState.HIDING, backgroundColor: 'navy'},
      {id: 3, CardState: CardState.HIDING, backgroundColor: 'navy'},
      {id: 4, CardState: CardState.HIDING, backgroundColor: 'green'},
      {id: 5, CardState: CardState.HIDING, backgroundColor: 'green'},
      {id: 6, CardState: CardState.HIDING, backgroundColor: 'yellow'},
      {id: 7, CardState: CardState.HIDING, backgroundColor: 'yellow'},
      {id: 8, CardState: CardState.HIDING, backgroundColor: 'black'},
      {id: 9, CardState: CardState.HIDING, backgroundColor: 'black'},
      {id: 10, CardState: CardState.HIDING, backgroundColor: 'purple'},
      {id: 11, CardState: CardState.HIDING, backgroundColor: 'purple'},
      {id: 12, CardState: CardState.HIDING, backgroundColor: 'pink'},
      {id: 13, CardState: CardState.HIDING, backgroundColor: 'pink'},
      {id: 14, CardState: CardState.HIDING, backgroundColor: 'lightskyblue'},
      {id: 15, CardState: CardState.HIDING, backgroundColor: 'lightskyblue'}
    ];
    cards = shuffle(cards);
    this.state = {cards, noClick: false};
    this.handleClick = this.handleClick.bind(this);
    this.handleNewGame = this.handleNewGame.bind(this);
  }

  handleNewGame(){
    let cards = this.state.cards.map(c => ({
      ...c,
      CardState: CardState.HIDING
    }));
    cards = shuffle(cards);
    this.setState({cards});
    counter = 0;
  }

  handleClick(id){
    const mapCardState = (cards, idsToChange, newCardState) => {
      return cards.map(c => {
        if(idsToChange.includes(c.id)){
          return {
            ...c,
            CardState: newCardState
          };  
        }
        return c;
      });
    }

    const foundCard = this.state.cards.find(c => c.id === id);

    if(this.state.noClick || foundCard.CardState !== CardState.HIDING){
      return; 
    }

    let noClick = false;

    let cards = mapCardState(this.state.cards, [id],CardState.SHOWING);

    const showingCards = cards.filter((c) => c.CardState === CardState.SHOWING);

    const ids = showingCards.map(c => c.id);

    if(showingCards.length === 2 && showingCards[0].backgroundColor === showingCards[1].backgroundColor){
      cards = mapCardState(cards, ids, CardState.MATCHING);
      counter = counter+2;
    } 
    else if(showingCards.length === 2) {
      let hidingCards = mapCardState(cards,ids, CardState.HIDING);

      noClick = true;

      this.setState({cards, noClick}, () => {
        setTimeout(() => {
          this.setState({cards: hidingCards, noClick: false});
        }, 1500);
      });
      return;
    }
    
    if(counter===16){
      console.log("GAME OVER");
    }
    this.setState({cards, noClick});
    
  }

  render(){
    const cards = this.state.cards.map((card) => (
      <Card 
        key={card.id} 
        showing={card.CardState !== CardState.HIDING} 
        backgroundColor={card.backgroundColor} 
        onClick= {() => this.handleClick(card.id)}  
      />
    ));
      
    if(counter===16){
      var style= {
        color: 'black',
        textAlign: 'center'
      }
      return(
        <div>
          <Navbar onNewGame={this.handleNewGame} />
          <h1 style={style}>Game Over !!</h1>
          {cards}
        </div>
      )
    } else {
      return(
        <div>
          <Navbar onNewGame={this.handleNewGame} />
          {cards}
        </div>
      );
    }
    
  }
}

export default MemoryGame;

