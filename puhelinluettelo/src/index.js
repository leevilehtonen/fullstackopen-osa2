import React from 'react';
import ReactDOM from 'react-dom'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas' }
      ],
      newName: ''
    }
  }

  handleNewNameChange = (event) => this.setState({newName: event.target.value})
  addNewName = (event) => {
	event.preventDefault()
	if (this.state.persons.some((person) => person.name === this.state.newName)) {
		alert("Nimi on jo listassa")
		this.setState({newName: ''})
		return;
	}
	const newPersons = this.state.persons.concat({name: this.state.newName})
	this.setState({persons: newPersons, newName: ''})
  }

  render() {
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <form onSubmit={this.addNewName}>
          <div>
            nimi: <input value={this.state.newName} onChange={this.handleNewNameChange}/>
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>
		{this.state.persons.map((person) => <p key={person.name}>{person.name}</p>)}
      </div>
    )
  }
}

export default App


ReactDOM.render(<App />, document.getElementById('root'))