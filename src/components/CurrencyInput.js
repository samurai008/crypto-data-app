import React from "react";
import currencies from "iso-currencies";

export default class CurrencyInput extends React.Component {
	constructor() {
		super();
		
		let tempCurrencyList = Object.keys(currencies.list()).map(
			(value, i) => {
				return {
					currencyName: value,
					countries: currencies.list()[value].countries.join(' '),
					name: currencies.list()[value].name
				}
			}
		);

		this.state = {
			currencyList: tempCurrencyList,
			filteredList: [],
			selectedCountries: [],
			showFilteredList: false
		};

		this.selectedList = []
	}

	handleChange(event) {
		if(event.target.value.length > 0) {
			this.showCurrencyList();
		} else {
			this.hideCurrencyList();
		}
	}

	hideCurrencyList() {
		this.setState({
			showFilteredList: false
		})
	}

	showCurrencyList() {
		let currencyInput = document.querySelector("#currency").value;

		if (this.filterCountryList(currencyInput).length > 0) {
			this.setState({
				filteredList: this.filterCountryList(currencyInput),
				showFilteredList: true
			});
		} else {
			this.hideCurrencyList();
		}
	}

	filterCountryList(value) {
		return this.state.currencyList
						.filter((_value, index) => {
							return _value.countries
											.toLowerCase().includes(value.toLowerCase())
											|| _value.currencyName.toLowerCase()
													.includes(value)
											|| _value.name.toLowerCase()
													.includes(value)
						});
	}

	addToSelectedList(value) {
		let checkIfExistsInList = this.selectedList.filter(
			(_value, i) => {
				return value === _value
			}
		)

		if(checkIfExistsInList.length === 0) {
			this.selectedList.push(value);
		}

		this.setState({
			selectedCountries: this.selectedList,
			showFilteredList: false
		});
	}

	renderListItems(list) {
		return list.map((value, index) => {
			return (
				<li key={index}><a href="#" onClick={this.addToSelectedList.bind(this, value.currencyName)}>{value.currencyName}</a> <span className="bd-highlight">{value.name}</span></li>
			)
		})
	}

	render() {
		let closeBtn = this.state.showFilteredList ? `` : `d-none`;

		return (
			<div className="form-group col-12 col-sm-6 currency-container">
				<input type="text" className="form-control" placeholder="Currency" id="currency" onChange={this.handleChange.bind(this)}></input>

				<ul className={this.showFilteredList ? 'list-unstyled p-2' : 'list-inline p-2'}>
					{this.state.showFilteredList ? this.renderListItems(this.state.filteredList) : this.state.selectedCountries.map((value, i) => <li key={i} className="list-inline-item m-2"><a href="#">{value}</a></li>)}
				</ul>

				<button className={`btn btn-secondary btn-sm close-btn ${closeBtn}`} onClick={this.hideCurrencyList.bind(this)}>Close</button>
			</div>
		)
	}
}