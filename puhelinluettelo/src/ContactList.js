import React from 'react'

export default ({persons, filter, deletePerson}) => {
  return (
    <table>
        <tbody>
            {persons.filter((person) => person.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())).map((person) => 
            <tr key={person.name}>
                <td>{person.name}</td>
                <td>{person.number}</td>
                <td>
                    <button onClick={deletePerson(person)}>poista</button>
                </td>
            </tr>)}
        </tbody>
	</table>
  )
}
