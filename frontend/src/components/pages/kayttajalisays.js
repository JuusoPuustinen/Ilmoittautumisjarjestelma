import React, { useState, Component, useEffect  } from "react";

const RegisterForm = ({registerHandler, kayttajat, deleteHandler, changePasswordHandler}) => {
    const [newUsr, setNewUsr] = useState("");
    const [newPass, setNewPass] = useState("");
    const [newUsrChange, setNewUsrChange] = useState("");
    const [newPassChange, setNewPassChange] = useState("");
    const [newPassChange2, setNewPassChange2] = useState("");

if (kayttajat.id === 1) {
    // If it is, return null to not display the component
    return null;
  }
//mappaa käyttäjät ja näyttää nimen sekä ID, piilottaa poisto napin jos ID on 1 (eli pääkäyttäjä/admin), varmistaa window confirmilla jos haluat poistaa käyttäjän.   Siiri 27.3.2023
    return(
        <div className="megaisoDiv">
        <div className="kokokayttajaDiv">

        <form autoComplete="off" className="form-style-10" onSubmit={e=> changePasswordHandler(e, newUsrChange, newPassChange, newPassChange2)}>

        <h1>Salasanan vaihtaminen</h1>

          <label for="kayttajatunnus" >Käyttäjätunnus:</label>
          <input onChange={e=>setNewUsrChange(e.target.value)} 
                  id="kayttajatunnus"
                name="username" 
                value={newUsrChange} 
                type="text" /><br/>

          <label for="salasana">Uusi salasana:</label>
          <input autoComplete="new-password" onChange={e=>setNewPassChange(e.target.value)}
                  id="salasanavaihto"
                type="passwordvaihto" 
                name="passwordvaihto" 
                value={newPassChange}/><br/><br/>

          <label for="salasana2">Uusi salasana uudelleen:</label>
          <input autoComplete="new-password" onChange={e=>setNewPassChange2(e.target.value)}
                  id="salasanavaihto2"
                type="passwordvaihto2" 
                name="passwordvaihto2" 
                value={newPassChange2}/><br/>
                        
          <input type="submit" value="tallenna" />
        </form>

        <form autoComplete="off" className="form-style-10" onSubmit={e=> registerHandler(e, newUsr, newPass)}>

            <h1>Käyttäjän lisääminen</h1>

            <label for="kayttajatunnus" >Käyttäjätunnus:</label>
            <input onChange={e=>setNewUsr(e.target.value)} 
                    id="kayttajatunnus"
                   name="username" 
                   value={newUsr} 
                   type="text" /><br/>

            <label for="salasana">Salasana:</label>
            <input autoComplete="new-password" onChange={e=>setNewPass(e.target.value)}
                    id="salasana"
                   type="password" 
                   name="password" 
                   value={newPass}/><br/>
                           
            <input type="submit" value="tallenna" />
        </form>

        <div className="kayttajatWrapper">
            <ul>
      {kayttajat.map((kayttaja, index) => (
        <div className="kayttajaDiv">
        <li key={index} >Käyttäjänimi: {kayttaja.nimi} ID: {kayttaja.id}</li> 
        {kayttaja.id === 1 ?  <span><h3>Pääkäyttäjä</h3></span> : <button className="poistaNappi" onClick={(e) => {
            if (window.confirm("Haluatko varmasti poistaa käyttäjän?")) {
              deleteHandler(e, kayttaja.id); 
              }}}> Poista käyttäjä</button> } <br/>
        </div>

      ))}
    </ul>
   
        </div>
 </div>
 </div>
    )
}


export default RegisterForm;