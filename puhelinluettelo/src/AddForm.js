import React from 'react'

export default ({addNewName, newName, newNumber, handleNewNameChange, handleNewNumberChange}) => {
  return (
    <form onSubmit={addNewName}>
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
