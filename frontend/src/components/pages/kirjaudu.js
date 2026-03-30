import { useState } from "react";
import React from "react";

//simppeli form loginille
const LoginForm = ({loginHandler}) => {

const [nimi, setNimi] = useState("");
const [salasana, setSalasana] = useState("");

return (
    <form className="form-style-10" onSubmit={e=>loginHandler(e, {nimi: nimi, salasana: salasana})}>

        <h1>Kirjaudu</h1>

        <br/>

        <label>Käyttäjänimi:</label>
        <input onChange={e=>setNimi(e.target.value)} type="text" value={nimi} />
        <br/><br/>
        <label>Salasana:</label>
        <input onChange={e=>setSalasana(e.target.value)} type="password" value={salasana} />
        <br/><br/>

        <input type="submit" value="lähetä" />
    </form>
)
}

export default LoginForm;