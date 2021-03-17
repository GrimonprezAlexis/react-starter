import React, { Component } from 'react';
import './App.scss';

import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './components/home/home';
import PhotographerDetail from './components/photographer/photographerDetail';



class App extends Component {
  render(){
    return (
      <>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/:id" component={PhotographerDetail} />
          </Switch>
        </Router>
      </>
    );
  }
};

export default App;
