import React from 'react';
import './Beer.css';
import $ from 'jquery';

interface BeerProps {
  name: string;
  outflow: number;
  refreshCb: () => void;
  isNewBeer: boolean;
}

interface BeerState {}

/**
 * Beer
 *
 * @props   name      : string
 * @props   outflow   : number       floating-point positive number, first set to 0
 * @props   refreshCb : () => void   callback to refresh App's list of Beers
 * @props   isNewBeer : boolean      if true, this Beer lets the user submit a new name and add it to the database
 * @state   none
 */
class Beer extends React.Component<BeerProps, BeerState> {
  constructor(props: BeerProps) {
    super(props);

    this.handleIncrease = this.handleIncrease.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.updateBeerOutflow = this.updateBeerOutflow.bind(this);
    this.insertNewBeer = this.insertNewBeer.bind(this);
  }

  /**
   * handleIncrease
   *
   * @param  a number
   * @return a handler increasing this Beer outflow by this number
   */
  handleIncrease(increase: number): (event: any) => void {
    // we return a handler as an arrow function to keep 'this' lexically scoped
    let handler = (event: any) => {
      let newOutflow = +this.props.outflow + increase;
      if (newOutflow < 0) newOutflow = 0;
      newOutflow = Math.round(newOutflow * 100) / 100;

      this.updateBeerOutflow(event.target.id, newOutflow);
    };

    return handler;
  }

  /**
   * handleChange
   *
   * @param  an event
   * @return void
   */
  handleChange(event: any): void {
    let newOutflow: number = event.target.value;
    if (newOutflow < 0) newOutflow = 0;
    newOutflow = Math.round(newOutflow * 100) / 100;

    this.updateBeerOutflow(event.target.id, newOutflow);
  }

  /**
   * updateBeerOutflow
   * PUTs an async request to update this Beer's outflow in the database, then re-render the App
   *
   * @param  beerName
   * @param  newOutflow
   */
  updateBeerOutflow(beerName: string, newOutflow: number): void {
    $.ajax({
      url: '/api/beers/' + beerName,
      type: 'PUT',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify({
        outflow: newOutflow,
      }),
      success: () => {
        this.props.refreshCb();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  /**
   * insertNewBeer
   */
  insertNewBeer(): void{
    let newBeer: any = $('#newBeer').val();
    $('#newBeer').val('');

    $.ajax({
      url: '/api/beers/',
      type: 'POST',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify({
        id: newBeer,
        outflow: 0,
      }),
      success: () => {
        this.props.refreshCb();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  /**
   * render
   * If the Beer has prop 'isNewBeer', renders an input field to insert a new Beer
   * Else renders a Beer
   */
  render(): JSX.Element {
    if (this.props.isNewBeer) {
      return (
        <div className="newBeer">
          <p>Nouvelle bière ?</p>
          <input id="newBeer" type="text" placeholder="Bière de printemps" />
          <button onClick={this.insertNewBeer}>Ajouter</button>
        </div>
      );
    } else {
      return (
        <div className="Beer">
          <p>{this.props.name}</p>
          <p>Débit (L/s)</p>
          <button id={this.props.name} onClick={this.handleIncrease(-0.5)}>
            -
          </button>
          <input
            id={this.props.name}
            onChange={this.handleChange}
            type="number"
            value={this.props.outflow}
          />
          <button id={this.props.name} onClick={this.handleIncrease(+0.5)}>
            +
          </button>
        </div>
      );
    }
  }
}

export default Beer;
