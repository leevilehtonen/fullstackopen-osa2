import React from 'react'

const Yhteensa = ({kurssi}) => {    
    return (
        <p>yhteensä {kurssi.osat.reduce((acc, osa) => acc + osa.tehtavia, 0)} tehtävää</p>
    )
}

export default Yhteensa