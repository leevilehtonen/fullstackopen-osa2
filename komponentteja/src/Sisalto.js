import React from 'react'

import Osa from './Osa'

const Sisalto = ({kurssi}) => {
    return (
        <div>
            {kurssi.osat.map((osa, id) => <Osa key={id} osa={osa.nimi} tehtavia={osa.tehtavia} />)}
        </div>
    )
}

export default Sisalto
