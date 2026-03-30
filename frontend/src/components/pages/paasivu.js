import React, { useState, Component  } from "react";

const Paasivu = ({}) => {

    const kirjautunutKayttaja = JSON.parse(window.localStorage.getItem('kayttaja'))

    return(
        <div className="tervetulodivi">
            <h1 className="tervetuloIlmoitus">Tervetuloa käyttämään sovellusta, {kirjautunutKayttaja.nimi}</h1>
        </div>
    )
}

export default Paasivu;