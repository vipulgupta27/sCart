import React, { Component } from 'react';
import { BrowserRouter as Router, Switch,  Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';

import './App.css';
import configStore from './config/store';
import Auth from './screens/Login';
import Product from './screens/Product';
import ErrorPage from './screens/ErrorPage';


export default class extends Component {
  constructor(props) {
    super(props);

    const { store, persist } = configStore();
    this.state = {
      store,
      persist,
    };
  }

  render () {
    return (
      <div className="App">
        <Provider store={this.state.store}>
          <PersistGate persistor={this.state.persist}>
              <Router>
                <Switch>
                  <Route path='/' exact component={Auth} />
                  <Route path='/product' exact component={Product} />
                  <Route path='*' component={ErrorPage} />
                </Switch>
              </Router>
          </PersistGate>
        </Provider>
        
      </div>
    );
  }
}
