import React from 'react'

import Osa from './Osa'

const Sisalto = (props) => {
    const [osa1, osa2, osa3] = props.kurssi.osat
    return (
        <div>
            <Osa osa={osa1.nimi} tehtavia={osa1.tehtavia} />
            <Osa osa={osa2.nimi} tehtavia={osa2.tehtavia} />
            <Osa osa={osa3.nimi} tehtavia={osa3.tehtavia} />
        </div>
    )
}

export default Sisalto
