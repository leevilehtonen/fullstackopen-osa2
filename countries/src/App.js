import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      serach: '',
      countries:[]
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
    console.log(this.state.countries)
    const results = this.state.countries.filter(country => country.name.toLowerCase().includes(this.state.serach.toLocaleLowerCase()))
    return (
      <div>
        <SearchField search={this.state.serach} handleSearchChange={this.handleSearchChange}/>
        <ContentArea countries={results}/>
      </div>
    );
  }
  handleSearchChange = (event) => this.setState({serach: event.target.value})

}

const SearchField = ({serach, handleSearchChange}) => (
  <div>
    find countries <input value={serach} onChange={handleSearchChange} />
  </div>
)

const ContentArea = ({countries}) => {
  if(countries.length > 10) {
    return <Notification text={"too much matches, specify another filter"}/>
  } else if (countries.length > 1) {
    return <ResultsList countries={countries} />
  } else if (countries.length === 1){
    console.log(countries)
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

const ResultsList = ({countries}) => (
  <div>
    {countries.map((country, id) => <p className="country" key={id}>{country.name}</p>)}
  </div>
)

const CountryView = ({country}) => (
  <div>
    <h2>{country.name} ({country.nativeName})</h2>
    <p><b>Capital: </b>{country.capital}</p>
    <p><b>Population: </b>{country.population}</p>
    <p><b>Flag:</b></p>
    <img src={country.flag} width={400}/>
  </div>
)
export default App;
