import React from 'react';
import ReactDOM from 'react-dom'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
		{ 
			name: 'Arto Hellas',
			number: '044-123456'
		}
      ],
	  newName: '',
	  newNumber: ''
    }
  }

  handleNewNameChange = (event) => this.setState({newName: event.target.value})
  handleNewNumberChange = (event) => this.setState({newNumber: event.target.value})
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
        <h2>Puhelinluettelo</h2>
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
				{this.state.persons.map((person) => 
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