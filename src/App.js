import React, { Component } from 'react';
import cryptocurrencies from 'cryptocurrencies';
import './App.css';
import CryptoSymbol from './components/CryptoSymbol';
import ExchangeList from './components/ExchangeList';
import CryptoService from './CryptoService';
import CurrencyInput from './components/CurrencyInput';

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
    return (
      <div className="App">
        <h3 className="text-center">cryptocurrencies</h3>

        <h1 className="text-center"><span className="badge badge-pill badge-dark">$123.92</span></h1>

        <div className="container">
          <div className="row mt-4">
            <CryptoSymbol coinList={this.getCoinList.bind(this)}></CryptoSymbol>
            <CurrencyInput></CurrencyInput>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
