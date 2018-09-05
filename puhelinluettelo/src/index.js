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

  addPerson = (event) => {
		event.preventDefault()
		const existingPerson = this.state.persons.find(person => person.name === this.state.newName);

		if (existingPerson) {
			if(window.confirm(`${existingPerson.name} on jo luettelossa, korvataanko vanha numero uudella?`)) {
				ContactService.updateOne(existingPerson.id, { ...existingPerson, number: this.state.newNumber})
				.then(data => this.setState({
					persons: this.state.persons.map(person => person.id === existingPerson.id ? data : person)
				}))
			} 
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
		ContactService.createOne(newPerson).then(data => 
			this.setState({
				persons: this.state.persons.concat(data),
				newName: '',
				newNumber: ''
			})
		)
	}
	
	deletePerson = (person) => () => {
		if(window.confirm(`Poistetaanko ${person.name}`)) {
			ContactService.deleteOne(person.id)
				.then(() => ContactService.getAll())
				.then((data) => this.setState({persons: data}))
		}
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
					addPerson={this.addPerson}
				/>
				<h2>Numerot</h2>
				<ContactList 
					persons={this.state.persons}
					filter={this.state.filter}
					deletePerson={this.deletePerson}
				/>
      </div>
    )
  }
}

export default App


ReactDOM.render(<App />, document.getElementById('root'))