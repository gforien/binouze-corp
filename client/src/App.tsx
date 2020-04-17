import React from 'react';
import Beer from './components/Beer/Beer';
import './App.css';

function App() {

  let listOfBeers = beers.map((ele) =>
    <li key={ele.name}>
      <Beer type={ele.name} />
    </li>
  );

  return (
    <div className="App">
      <h1>Binouze Corp.</h1>
      <ul>
        {listOfBeers}
      </ul>
    </div>
  );
}

let beers = [
  {name: "Blanche", isOpen: true},
  {name: "Blonde", isOpen: true},
  {name: "Ambrée", isOpen: true},
  {name: "de Noël", isOpen: false},
  {name: "de Printemps", isOpen: false},
];

export default App;
