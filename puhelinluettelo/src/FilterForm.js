import React from 'react'

export default ({filter, handleFilterChange}) => {
  return (
    <div>
        rajaa näytettäviä: <input value={filter} onChange={handleFilterChange}/>
    </div>
  )
}
