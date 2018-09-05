import React from 'react'

export default ({addPerson, newName, newNumber, handleNewNameChange, handleNewNumberChange}) => {
  return (
    <form onSubmit={addPerson}>
        <div>
            nimi: <input value={newName} onChange={handleNewNameChange}/>
        </div>
        <div>
            numero: <input value={newNumber} onChange={handleNewNumberChange}/>
        </div>
        <div>
            <button type="submit">lisää</button>
        </div>
    </form>
  )
}
