import React from "react";

export default class CryptoSymbol extends React.Component {
	constructor() {
		super();
		this.state = {
			showSuggestion: false,
			coinList: [],
			filteredData: []
		}

		this.handleChange = this.handleChange.bind(this);
	}

	componentDidMount() {
		this.props.coinList()
		.then((res) => res.json())
		.then((res) => {
			this.setState({
				coinList: Object.keys(res.Data).map(val => res.Data[val]),
			});
			console.log(this.state.coinList);
		})
		.catch(err => console.error(err));
	}

	handleChange(event) {
		// console.log(this.state.showSuggestion);
		if (this.state.showSuggestion === false) {
			this.setState({
				showSuggestion: true
			})
		}
		const target = event.target;

		if (this.state.coinList.length > 0) {
			let _val;
			let _filteredData = this.state.coinList.filter(
				(val, i) => {
					_val = val['CoinName'].toLowerCase();
					return _val.includes(target.value.toLowerCase());
				}
			);
			console.log(_filteredData.slice(1, 5));
		}

		// let _filteredData = this.state.coinList.filter(
		// 	(val, i) => {
		// 		return val['CoinName'].includes(target) || val['FullName'].includes(target) || val['Symbol'].includes(target);
		// 	}
		// );

		// this.setState({
		// 	filteredData: _filteredData
		// });

		// console.log(this.state.filteredData.slice(0, 4));
	}

	renderSuggestionBox() {
		const loader = 'Loading coins...'
		let listItems = <li className="list-group-item">{loader}</li>;

		if(this.state.coinList.length > 0) {
			listItems = this.state.coinList.map(
				(val, i) => {
					return (
						<li className="list-group-item" key={i}>{val.CoinName}</li>
					)
				}
			);
		}

		return (
			<ul className="list-group">
				{listItems}
			</ul>
		);
	}

	render() {

		return (
			<div className="form-group col-12 col-sm-6">
				<input type="text" className="form-control" placeholder="Enter crypto symbol" onChange={this.handleChange}></input>

				<div className="row p-2">
					{this.state.showSuggestion ? this.renderSuggestionBox() :
					'Search for the coin you\'re looking for'}
				</div>
			</div>
		)
	}
}