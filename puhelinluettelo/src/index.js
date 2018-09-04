import React from 'react';
import ReactDOM from 'react-dom'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
	  filter: '',	
      persons: [
		{ name: 'Arto Hellas', number: '040-123456' },
		{ name: 'Martti Tienari', number: '040-123456' },
		{ name: 'Arto Järvinen', number: '040-123456' },
		{ name: 'Lea Kutvonen', number: '040-123456' }
	  ],
	  newName: '',
	  newNumber: ''
    }
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
	const newPersons = this.state.persons.concat({
		name: this.state.newName,
		number: this.state.newNumber
	})
	this.setState({
		persons: newPersons, 
		newName: '',
		newNumber: ''
	})
  }

  render() {
    return (
      <div>
		<h1>Puhelinluettelo</h1>
		<div>
            rajaa näytettäviä: <input value={this.state.filter} onChange={this.handleFilterChange}/>
        </div>
        <h2>Lisää uusi</h2>
        <form onSubmit={this.addNewName}>
          <div>
            nimi: <input value={this.state.newName} onChange={this.handleNewNameChange}/>
          </div>
          <div>
            numero: <input value={this.state.newNumber} onChange={this.handleNewNumberChange}/>
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>
		<table>
			<tbody>
				{this.state.persons.filter((person) => person.name.toLocaleLowerCase().includes(this.state.filter.toLocaleLowerCase())).map((person) => 
				<tr key={person.name}>
					<td>{person.name}</td>
					<td>{person.number}</td>
				</tr>)}
			</tbody>
		</table>
      </div>
    )
  }
}

export default App


ReactDOM.render(<App />, document.getElementById('root'))