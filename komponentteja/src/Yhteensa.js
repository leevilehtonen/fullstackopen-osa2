import React from 'react'

const Yhteensa = (props) => {
    const [osa1, osa2, osa3] = props.kurssi.osat
    
    return (
        <p>yhteensä {osa1.tehtavia + osa2.tehtavia + osa3.tehtavia} tehtävää</p>
    )
}

export default Yhteensa