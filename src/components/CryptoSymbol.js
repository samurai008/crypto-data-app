import React from "react";

export default class CryptoSymbol extends React.Component {
	constructor() {
		super();
		this.state = {
			showSuggestion: false,
			coinList: [],
			filteredData: [],
			disabled: true,
			selectedCoinList: []
		}

		this._selectedCoinList = [];

		this.handleChange = this.handleChange.bind(this);
	}

	componentDidMount() {
		this.props.coinList()
		.then((res) => res.json())
		.then((res) => {
			this.setState({
				coinList: Object.keys(res.Data).map(val => res.Data[val]),
				disabled: false
			});
		})
		.catch(err => console.error(err));
	}

	handleChange(event) {
		if (this.state.showSuggestion === false) {
			this.setState({
				showSuggestion: true
			})
		}
		const target = event.target;

		if (this.state.coinList.length > 0) {
			let _val = {};
			let _filteredData = this.state.coinList.filter(
				(val, i) => {
					_val['CoinName'] = val['CoinName'].toLowerCase();
					_val['FullName'] = val['FullName'].toLowerCase();
					_val['Symbol'] = val['Symbol'].toLowerCase();
					return _val['CoinName'].includes(target.value.toLowerCase())
									|| _val['FullName'].includes(target.value.toLowerCase()) || _val['Symbol'].includes(target.value.toLowerCase());
				}
			);
			this.setState({
				filteredData: _filteredData.slice(0, 5)
			});
		}
	}

	addToInput(value) {
		let checkIfExitsInSelectedList = this.state.selectedCoinList.filter(
			(_value, index) => {
				return _value === value;
			}
		)

		if (checkIfExitsInSelectedList.length === 0) {
			this._selectedCoinList.push(value);
		}

		this.setState({
			showSuggestion: false,
			selectedCoinList: this._selectedCoinList
		});
	}

	renderSelectedCoins() {
		console.log(this.state.selectedCoinList);
		let selectedCoins = this.state.selectedCoinList.map((value, i) => {
			return (
				<li key={i} className="m-2 list-inline-item">
					<a href="#">{value.Symbol}</a>
				</li>
			);
		})

		return (
			<ul className="list-inline">
				{selectedCoins}
			</ul>
		);
	}

	renderSuggestionBox() {
		const loader = 'No result(s) found.'
		let listItems = <li className="list-group-item">{loader}</li>;

		if(this.state.filteredData.length > 0) {
			listItems = this.state.filteredData.map(
				(val, i) => {
					return (
						<li className="list-group-item" key={i}>
							<a href="#" onClick={this.addToInput.bind(this, val)}>{val.CoinName}</a>
						</li>
					)
				}
			);
		}

		return (
			<ul className="list-group w-100">
				{listItems}
			</ul>
		);
	}

	render() {
		let closeBtn = this.state.showSuggestion ? `` : `d-none`;

		return (
			<div className="form-group col-12 col-sm-6">
				<input type="text" id="cryptoDef" className="form-control" placeholder="Enter crypto symbol" onChange={this.handleChange} disabled={this.state.disabled}></input>

				<div className="row p-2">
					{this.state.showSuggestion ? this.renderSuggestionBox() :
					this.renderSelectedCoins()}
					{/* {this.renderSelectedCoins()} */}
				</div>

				<button className={`btn btn-secondary w-100 ${closeBtn}`} onClick={e => this.setState({showSuggestion: false})}>Close</button>
			</div>
		)
	}
}