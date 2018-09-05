import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      serach: '',
      countries:[],
      clicked: false
    }
  }
  componentDidMount() {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then(res => this.setState({
        countries: res.data
      })
    )
  }
  render() {
    const results = this.state.clicked ? 
      this.state.countries.filter(country => country.name === this.state.serach) :
      this.state.countries.filter(country => country.name.toLowerCase().includes(this.state.serach.toLocaleLowerCase()))
      
    return (
      <div>
        <SearchField search={this.state.serach} handleSearchChange={this.handleSearchChange}/>
        <ContentArea countries={results} handleCountryClick={this.handleCountryClick}/>
      </div>
    );
  }
  handleSearchChange = (event) => this.setState({serach: event.target.value, clicked: false})
  handleCountryClick = (target) => () => this.setState({serach: target.name, clicked: true})

}

const SearchField = ({serach, handleSearchChange}) => (
  <div>
    find countries <input value={serach} onChange={handleSearchChange} />
  </div>
)

const ContentArea = ({countries, handleCountryClick}) => {
  if(countries.length > 10) {
    return <Notification text={"too much matches, specify another filter"}/>
  } else if (countries.length > 1) {
    return <ResultsList countries={countries} handleCountryClick={handleCountryClick}/>
  } else if (countries.length === 1){
    return <CountryView country={countries[0]} />
  } else {
    return <Notification text={"no results"} />
  }
}
const Notification = ({text}) => (
  <div>
    <b>{text}</b>
  </div>
)

const ResultsList = ({countries, handleCountryClick}) => (
  <div>
    {countries.map((country, id) => <p className="country" onClick={handleCountryClick(country)} key={id}>{country.name}</p>)}
  </div>
)

const CountryView = ({country}) => (
  <div>
    <h2>{country.name} ({country.nativeName})</h2>
    <p><b>Capital: </b>{country.capital}</p>
    <p><b>Population: </b>{country.population}</p>
    <p><b>Flag:</b></p>
    <img src={country.flag} alt="" width={400}/>
  </div>
)
export default App;
