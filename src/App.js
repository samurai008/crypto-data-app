import React, { Component } from 'react';
import cryptocurrencies from 'cryptocurrencies';
import './App.css';
import CryptoSymbol from './components/CryptoSymbol';
import ExchangeList from './components/ExchangeList';
import CryptoService from './CryptoService';

class App extends Component {
  constructor() {
    super();
    this.state = {
      coinList: []
    }
  }

  getCoinList() {
    let cryptoService = new CryptoService();
    return cryptoService.getCoinList();
  }

  render() {
    console.log(cryptocurrencies.symbols());
    return (
      <div className="App">
        <h3 className="text-center">cryptocurrencies</h3>

        <div className="container">
          <div className="row mt-4">
            <CryptoSymbol coinList={this.getCoinList.bind(this)}></CryptoSymbol>
            <ExchangeList></ExchangeList>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
