// crypto-compare
const baseOneUri = 'https://cors-anywhere.herokuapp.com/https://www.cryptocompare.com/';
const baseTwoUri = 'https://min-api.cryptocompare.com/';

export default class CryptoService {

	getCoinList() {
		const uri = baseOneUri + 'api/data/coinlist/';
		return fetch(uri);
	}

	// getExchangeList() {
	// 	const uri = baseApiUrl + 'exchanges?access_token=' + accessToken;
	// 	return fetch(uri, {mode: 'no-cors'});
	// }
}