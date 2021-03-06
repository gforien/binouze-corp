import React from 'react';
import Beer from './components/Beer/Beer';
import './App.css';
import $ from 'jquery';

interface AppProps {}

interface AppState {
  beers: [];
}

/**
 * App
 *
 * It renders a list of Beers elements + the special newBeer element which allows to insert a new entry into the database
 * All Beers are stored in an array, in the App state.
 * Upon updateListOfBeers(), the App GETs all beers from the API, updates its state, and renders them.
 *
 * @props   none
 * @state   beers: []   the array of Beer elements (i.e. {id, ouflow} elements)
 * @see     Beer.tsx
 */
class App extends React.Component<AppProps, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = { beers: [] };
  }

  /**
   * componentDidMount
   */
  componentDidMount(): void {
    this.updateListOfBeers = this.updateListOfBeers.bind(this);
    this.updateListOfBeers();
  }

  /**
   * updateListOfBeers
   * GETs all beers from the API and refreshes the App's state on success, also triggering render().
   * This method is passed as a callback to every <Beer /> so that they can trigger the App render() method.
   */
  updateListOfBeers(): void {
    $.ajax({
      type: 'GET',
      url: '/api/beers',
      success: (data) => {
        this.setState({
          beers: data
        });
      },
      error: (err) => {
        console.log(JSON.stringify(err));
      },
    });
  }

  /**
   * render
   *
   * @return a <div> containing a title, a list of Beers, and a special newBeer element
   */
  render(): JSX.Element {
    // build up the list of Beers from the App state
    let listOfBeers = this.state.beers.map(
      (ele: { id: string; outflow: number }) => (
        <li key={ele.id}>
          <Beer
            name={ele.id}
            initialOutflow={ele.outflow}
            updateListOfBeers={this.updateListOfBeers}
            isNewBeer={false}
          />
        </li>
      )
    );

    return (
      /* Container */
      <div className="App">
        {/* Title */}
        <h1>Binouze Corp.</h1>

        {/* List of Beers */}
        <ul>
          {/* all Beers retrieved from the database */}
          {listOfBeers}

          {/* the special newBeer element which allows to insert a new beer into the database */}
          <li key="newBeer">
            <Beer
              name="newBeer"
              initialOutflow={0}
              updateListOfBeers={this.updateListOfBeers}
              isNewBeer={true}
            />
          </li>
        </ul>
      </div>
    );
  }
}

export default App;
