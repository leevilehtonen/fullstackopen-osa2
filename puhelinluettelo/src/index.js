import React from 'react';
import ReactDOM from 'react-dom'
import ContactService from './ContactService'
import AddForm from './AddForm';
import FilterForm from './FilterForm';
import ContactList from './ContactList';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
	  filter: '',	
    persons: [],
	  newName: '',
	  newNumber: ''
    }
  }

  componentDidMount = () => {
		ContactService.getAll().then(data => this.setState({persons: data}))
  }

  handleNewNameChange = (event) => this.setState({newName: event.target.value})
  handleNewNumberChange = (event) => this.setState({newNumber: event.target.value})
  handleFilterChange = (event) => this.setState({filter: event.target.value})

  addNewName = (event) => {
		event.preventDefault()
		if (this.state.persons.some((person) => person.name === this.state.newName)) {
			alert("Nimi on jo listassa")
			this.setState({
				newName: '',
				newNumber: ''
			})
			return;
		}
		const newPerson = {
			name: this.state.newName,
			number: this.state.newNumber
		}
		ContactService.create(newPerson).then(data => 
			this.setState({
				persons: this.state.persons.concat(data),
				newName: '',
				newNumber: ''
			})
		)
  }

  render() {
    return (
      <div>
		<h1>Puhelinluettelo</h1>
		<FilterForm 
			filter={this.state.filter}
			handleFilterChange={this.handleFilterChange}
		/>
        <h2>Lisää uusi</h2>
		<AddForm 
			newName={this.state.newName}
			newNumber={this.state.newNumber}
			handleNewNameChange={this.handleNewNameChange}
			handleNewNumberChange={this.handleNewNumberChange}
			addNewName={this.addNewName}
		/>
        <h2>Numerot</h2>
		<ContactList 
			persons={this.state.persons}
			filter={this.state.filter}
		/>
      </div>
    )
  }
}

export default App


ReactDOM.render(<App />, document.getElementById('root'))