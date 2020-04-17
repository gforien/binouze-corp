import React from 'react';
import './Beer.css';


interface BeerProps {
  type: string,
}

interface BeerState {
  outflow: number,
}


/**
 * Beer 
 * @props scale:       string   celsius/fahrenheit
 * @state temperature: number
 */
class Beer extends React.Component< BeerProps, BeerState > {

  constructor(props: any) {
    super(props);
    this.state = {
      outflow: 0,
    }

    this.handleIncrease = this.handleIncrease.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  
  handleIncrease(increase:number) {
    // we return a handler as an arrow function to keep 'this' lexically scoped
    let handler = () => {
      this.setState(
        (state: BeerState) => {
          let newOutflow = +state.outflow +increase;
          if (newOutflow < 0) newOutflow = 0;
          newOutflow = Math.round(newOutflow*100) / 100;

          return {outflow: newOutflow};
        }
      );
    }

    return handler;
  }
  
  handleChange(event: any) {
    let newOutflow: number = event.target.value;
    if (newOutflow < 0) newOutflow = 0;
    newOutflow = Math.round(newOutflow*100) / 100;

    this.setState({outflow: newOutflow});
  }

  render() {
    return (
      <div className="Beer">
          <p>{this.props.type}</p>
          <button onClick={this.handleIncrease(-0.5)} >-</button>
          <input type="number" value={this.state.outflow} onChange={this.handleChange} />
          <button onClick={this.handleIncrease(+0.5)} >+</button>
      </div>
    );
  }
}



export default Beer;
