import React from 'react';
import ReactDOM from 'react-dom'
import ContactService from './ContactService'
import AddForm from './AddForm';
import FilterForm from './FilterForm';
import ContactList from './ContactList';
import './index.css';


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
			filter: '',	
			persons: [],
			newName: '',
			newNumber: '',
			message: null
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
		ContactService.getAll()
			.then(data => data.find(person => person.name === this.state.newName))
			.then(existingPerson => {
				if (existingPerson) {
					if(window.confirm(`${existingPerson.name} on jo luettelossa, korvataanko vanha numero uudella?`)) {
						 ContactService.updateOne(existingPerson.id, { ...existingPerson, number: this.state.newNumber})
						 	.then(data => {
								this.setState({
									persons: this.state.persons.map(person => person.id === data.id ? data : person),
									newName: '',
									newNumber: '',
									message: `Henkilön ${data.name} numero vaihdettiin onnistuneesti.`
								})
								setTimeout(()=> this.setState({message: null}), 5000);
						})
					} 
				} else {
						const newPerson = {
							name: this.state.newName,
							number: this.state.newNumber
						}
						ContactService.createOne(newPerson)
							.then(data => {
								this.setState({
									newName: '',
									newNumber: '',
									message: `Henkilö ${data.name} luotiin onnistuneesti.`
								})
								setTimeout(()=> this.setState({message: null}), 5000);
								return ContactService.getAll()
							})
							.then(data => this.setState({persons: data}))
					} 
			})
			
		

		
	}
	
	deletePerson = (person) => () => {
		if(window.confirm(`Poistetaanko ${person.name}`)) {
			ContactService.deleteOne(person.id)
				.then(() => {
					this.setState({
						message: `Henkilö ${person.name} poistettiin onnistuneesti.`
					})
					setTimeout(()=> this.setState({message: null}), 5000);
					return ContactService.getAll()
				})
				.then((data) => this.setState({persons: data}))
				.catch(() => {
					alert("Person was already deleted")
					this.setState({persons: this.state.persons.filter( val=> val.id !== person.id) });
				})
		}
	}

  render() {
    return (
      <div>
				<h1>Puhelinluettelo</h1>
				<Notification message={this.state.message}/>
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


const Notification = ({message}) => {
	if(message === null) {
		return null
	} else {
		return (
			<div className="success">
				<b>{message}</b>
			</div>
		)
	}
}

ReactDOM.render(<App />, document.getElementById('root'))