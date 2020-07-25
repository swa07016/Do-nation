import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import CList from './CList';
import Rbtns from './Rbtns';
ReactDOM.render(<App />, document.getElementById('donate-list'));
ReactDOM.render(<CList />, document.getElementById('covid-list'));
ReactDOM.render(<Rbtns/>, document.getElementById('register-btns'));