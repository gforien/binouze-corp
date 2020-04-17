import React from 'react';
import ReactDOM from 'react-dom';
import Beer from './Beer';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Beer />, div);
  ReactDOM.unmountComponentAtNode(div);
});