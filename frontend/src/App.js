import React, { useState, useEffect, Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { HashRouter } from 'react-router-dom'
import Navbar from './components/Navbar';
import Majoitus from './components/pages/majoitus';
import LoginForm from './components/pages/kirjaudu';
import userService from './services/userService';
import osallistujaService from './services/osallistujaService';
import Lisaaosallistuja from './components/pages/lisaaosallistuja';
import Kayttajalisays from './components/pages/kayttajalisays';
import Excelinlisays from './components/pages/excelinlisays';
import NormiExcelinlisays from './components/pages/normiexcelinlisays';
import Paasivu from './components/pages/paasivu'

const serviceurl = "/notes";
const loginURL = "/login";

function App() {
  const [token, setToken] = useState(null);
  const [islogged, setIsLogged] = useState(false);
  const [rooli, setRooli] = useState("");
  const [osallistujadata, setOsallistuja] = useState ([]);
  const [kayttajadata, setKayttaja] = useState ([]);
  const [edellinenMuutettu, setEdellinenMuutettu] = useState ([]);
  const [kirjaaAutomaattisesti, setKirjaaAutomaattisesti] = useState (1);

  const [message, setMessage] = useState("");
  const [errormessage, setError] = useState("");
  const [messageVisibility, setMessageVisibility] = useState(false);

  useEffect(() => {
    const tokenInLocal = JSON.parse(window.localStorage.getItem('kayttaja'))
  if (tokenInLocal) {
    setToken(tokenInLocal.token);
    setIsLogged(true);
    setRooli(tokenInLocal.rooli)
    userService.setUserTokenMiddle(tokenInLocal.token);
    osallistujaService.setOsallistujaTokenMiddle(tokenInLocal.token);
    // userService.selectUser(tokenInLocal).then(res => {
    //   setStudent(res.data)
    // }).catch(err => {
    // })
  } else {
    return;
  }

    haeKaikkiOsallistujat()
    haeKaikkiKayttajat()
  },[])

//login, laittaa käyttäjän datan tokeniin ja ilmoittaa sivulle onnistuneesta kirjautumisesta -juuso 21.2.2023
const loginHandler = (e, userdata) => {
  e.preventDefault();
  userService.login(userdata)
  .then(response => {
    setRooli(response.rooli)
    console.log(response.token)
    userService.setUserTokenMiddle(response.token);
    osallistujaService.setOsallistujaTokenMiddle(response.token);
  osallistujaService.getAll()
  .then(response => {
    setOsallistuja(response)  
  })
  userService.getAllUser()
      .then(response => {
        setKayttaja(response);
      }).catch(e => {
      })
      // userService.setTokenMiddle(response.token);
      // console.log(response.token)
    setToken(response.token);
    setIsLogged(true);
    window.localStorage.setItem('kayttaja', JSON.stringify(response));
}).catch(error => {
  setError("Käyttäjänimi tai salasana väärin")
})
} 

useEffect(() => {
  // -----------------------------------------------
  // Set token from localStorage if it exists
  // const tokenInLocal = JSON.parse(window.localStorage.getItem('kayttaja'))
  // if (tokenInLocal) {
  //   setToken(tokenInLocal.token);
  //   setIsLogged(true);
  //   setRooli(tokenInLocal.rooli)
  //   userService.setUserTokenMiddle(tokenInLocal.token);
  //   osallistujaService.setOsallistujaTokenMiddle(tokenInLocal.token);
  //   // userService.selectUser(tokenInLocal).then(res => {
  //   //   setStudent(res.data)
  //   // }).catch(err => {
  //   // })
  // } else {
  //   return;
  // }
}, [])

const haeKaikkiOsallistujat = () => {
  osallistujaService.getAll()
  .then(response => {
    setOsallistuja([...response])  
  }).catch(e => {
    setError("Virhe päivittämisessä");
  })
}

const haeKaikkiKayttajat = () => {
  userService.getAllUser()
  .then(response => {
    setKayttaja([...response])  
  }).catch(e => {
    setError("Virhe päivittämisessä");
  })
}

const deleteHandler = (e, id) => {
  e.preventDefault();
  userService.remove(id)
  .then(response => {
    setKayttaja(kayttajadata.filter(user => user.id !== id))
    setMessage("käyttäjän poistaminen onnistui")
    setMessageVisibility(true)

  }).catch(error => {
    setError("ei toimi läpällä")
    setMessageVisibility(true)
  })
}

//rekisteröityminen, salasana hashataan backendissä -juuso 21.2.2023
const registerHandler = (e, username, password, email) => {
  // setToken(null);
  e.preventDefault();
  const userData = { username: username, password: password, email: email};
  userService.register(userData)
    .then(response => {
      setMessage("Käyttäjän lisääminen onnistui");
      setMessageVisibility(true)
      userService.getAllUser()
      .then(response => {
        setKayttaja(response);
      }).catch(e => {
        setError("Käyttäjän lisääminen epäonnistui. Tarkasta syöttämäsi tiedot. Mikäli tiedoissa ei ole vikaa, on kyse palvelinvirheestä");
        setMessageVisibility(true)
      })
    }).catch(e => {
      setError("Käyttäjän lisääminen epäonnistui. Tarkasta syöttämäsi tiedot. Mikäli tiedoissa ei ole vikaa, on kyse palvelinvirheestä");
      setMessageVisibility(true)
    })
}

const changePasswordHandler = (e, newUsrChange, newPassChange, newPassChange2) => {
  e.preventDefault();
  const changeData = { newUsrChange: newUsrChange, newPassChange: newPassChange};
  if(newPassChange === newPassChange2){
    userService.changePass(changeData)
    .then(response => {
      setMessage("Salasanan vaihto onnistui")
    }).catch(e => {
      setError("Virhe salasanan vaihdossa");
    })
  }
  
}

const changeUserData = (e, id, targetData, changedValue ) => {
  if (targetData === "tunnisteID") {
    if (changedValue === "") {
      changedValue = null
    }
  }
  e.preventDefault();
  const changedData = {
    target: targetData,
    changed: changedValue,
    muokkaaja: JSON.parse(window.localStorage.getItem('kayttaja')).nimi
  }
  osallistujaService.change(id, changedData)
  .then(response => {
    if (targetData === "tunnisteID") {
      if (changedValue !== null) {
        if (kirjaaAutomaattisesti === 1) {
          osallistujaService.majoitusAlku(id).then(response => {
          setMessage("Osallistujalle tunniste lisätty ja kirjattu sisään")
          haeKaikkiOsallistujat()
          }).catch(e => {
          setError("Tunnisteen lisäys epäonnistui");
          })
        }
      }
    }
  }).catch(e => {
    setError("Käyttäjädatan muokkaaminen epäonnistui. Tarkasta syöttämäsi tiedot. Mikäli tiedoissa ei ole vikaa, on kyse palvelinvirheestä");
    // setMessageVisibility(true)
  })
}

const addDataHandler = (e, Etunimi, Sukunimi, Syntymavuosi, Sukupuoli, Osoite,
  Postinumero, Postitoimipaikka, Sahkoposti, Puhelinnumero, Huoltajanimi, Huoltajanpuhelin,
  Lipputyyppi, Yhteensa, Majoitus, Hiljainenhuone, Kotiseurakunta, Allergiat, Majoitusluokka,
  TunnisteID, Muuta, Saapunut, Majoituksessa) => {

  e.preventDefault();

  const participantData = { etunimi: Etunimi, sukunimi: Sukunimi, syntymavuosi: Syntymavuosi, sukupuoli: Sukupuoli, osoite: Osoite, postinumero: Postinumero,
  postitoimipaikka: Postitoimipaikka, sahkoposti: Sahkoposti, puhelinnumero: Puhelinnumero, huoltajanimi: Huoltajanimi, huoltajanpuhelin: Huoltajanpuhelin, lipputyyppi: Lipputyyppi,
  yhteensa: Yhteensa, majoitus: Majoitus, hiljainenhuone: Hiljainenhuone, kotiseurakunta: Kotiseurakunta, allergiat: Allergiat, majoitusluokka: Majoitusluokka,
  tunnisteID: TunnisteID, muuta: Muuta, saapunut: Saapunut, majoituksessa: Majoituksessa};

  userService.addData(participantData)
    .then(response => {
      setMessage("Käyttäjä lisätty onnistuneesti")
      setMessageVisibility(true)
      haeKaikkiOsallistujat()
      // setErrorMessage("");
    }).catch(e => {
      setError("Käyttäjän lisäämisessä virhe. Tarkasta syöttämäsi tiedot. Mikäli tiedoissa ei ole vikaa, on kyse palvelinvirheestä");
      setMessageVisibility(true)
    })
}

const changeArrived = (e, id) => {
  // etsitään id:n perusteella oikea osallistuja:
  const tempOsallistuja = osallistujadata.find(osallistuja => osallistuja.id === id)
  // muutetaan sen paikallaolo päinvastaiseksi:
  tempOsallistuja.saapunut = !tempOsallistuja.saapunut
  // tallennetaan axioksen kautta backendille:
  osallistujaService.update(id, tempOsallistuja)
    .then(response => {
      // muutetaan paikallaolo:
      const tempOsallistujat = osallistujadata.map(osallistuja => {
        if (osallistuja.id === id)
          osallistuja = tempOsallistuja
        return osallistuja
      })
      // tallennetaan muutokset tilamuuttujaan:
      setOsallistuja(tempOsallistujat)
      setMessage("Käyttäjä kirjattu sisään tai ulos")
      setMessageVisibility(true)
      // setErrorMessage("Ei pystytty muuttamaan paikalla olleeksi!")
    }).catch(e => {
      setError("Ei onnistunut")
      setMessageVisibility(true)
    })
}

const majoitusHandler = (e, tunnisteID) => {
  e.preventDefault();

  const tempOsallistuja = osallistujadata.find(osallistuja => osallistuja.tunnisteID === tunnisteID)

  if (tempOsallistuja === undefined) {
    setError("Ei ole kyseistä tunnistetta")
  } else {

  tempOsallistuja.majoituksessa = !tempOsallistuja.majoituksessa

  setEdellinenMuutettu(tempOsallistuja)

  if (tempOsallistuja.majoituksessa === true) {
    setMessage("Osallistuja kirjattu sisään")
  } else {
    setMessage("Osallistuja kirjattu ulos")
  }

  const tempOsallistujaPacket = {
    tempOsallistuja: tempOsallistuja,
    tunnisteID: tunnisteID
  }

  osallistujaService.updateMajoitus(tempOsallistujaPacket)
    .then(response => {
      // const tempOsallistujat = osallistujadata.map(osallistuja => {
      //   if (osallistuja.tunnisteID === tunnisteID)
      //     osallistuja = tempOsallistuja
      //   return osallistuja
      // })
      // setOsallistuja(tempOsallistujat)
      haeKaikkiOsallistujat()
      // setMessage("Onnistui")
      // setErrorMessage("Ei pystytty muuttamaan paikalla olleeksi!")
    }).catch(e => {
      setError("Ei onnistunut")
    })
  }
}

const acceptChanges = () => {
  setMessage("Muokkaaminen onnistui")
  haeKaikkiOsallistujat()
}

const declineChanges = (declineID) => {
  const vanhadata = osallistujadata.find(osallistuja => osallistuja.id === declineID)
  osallistujaService.decline(vanhadata).then(response => {
    // haeKaikkiOsallistujat()
    setMessage("Peruutettu")
    setMessageVisibility(true)
  }).catch(e => {
    setError("Virhe");
    setMessageVisibility(true)
  })
}

const deletedata = () => {
  osallistujaService.deletedata().then(response => {
    setMessage("Kaikki data poistettu")
    setMessageVisibility(true)
    haeKaikkiOsallistujat()
  }).catch(e => {
    setError("Virhe poistossa");
    setMessageVisibility(true)
  })
}

const deleteperson = (deleteID) => {
  osallistujaService.deletePerson(deleteID).then(response => {
    setMessage("Osallistuja poistettu")
    // setMessageVisibility(true)
    haeKaikkiOsallistujat()
  }).catch(e => {
    setError("Virhe poistossa");
    // setMessageVisibility(true)
  })
}

const messageHook = () => {
  if(message !== ""){
    const timer = setTimeout(()=>{setMessage(""); setMessageVisibility(false)}, 5000);
    return () => clearTimeout(timer);
  }
}

const errorHook = () => {
  if(errormessage !== ""){
    const timer = setTimeout(()=>{setError(""); setMessageVisibility(false)}, 5000);
    return () => clearTimeout(timer);
  }
}

useEffect(messageHook, [message]);

useEffect(errorHook, [errormessage]);


return ( 
    <div className="App">
      <link href='http://fonts.googleapis.com/css?family=Bitter' rel='stylesheet' type='text/css'></link>
      {/* <header className="App-header">
      </header> */}
      {
      rooli === "admin" ?   
      //jos on kirjautunut
      <HashRouter>
        <div className="navDiv">
          <Navbar.NavbarAdmin className="navBar"/>
          {/* <button onClick={()=>console.log(JSON.parse(window.localStorage.getItem('kayttaja')).nimi)}>testinappi</button> */}
        </div>
        <div className="userSuccess">{message}</div>
        <div className="userFailure">{errormessage}</div>
        <Routes>
          <Route path="/lisaaosallistuja" element={<Lisaaosallistuja osallistujat={osallistujadata} changeArrived={changeArrived} changeUserData={changeUserData} acceptChanges={acceptChanges} declineChanges={declineChanges} haeKaikkiOsallistujat={haeKaikkiOsallistujat} deleteperson={deleteperson} setKirjaaAutomaattisesti={setKirjaaAutomaattisesti} kirjaaAutomaattisesti={kirjaaAutomaattisesti}/>} />
          <Route path="/majoitus" element={<Majoitus majoitusHandler={majoitusHandler} osallistujat={osallistujadata} edellinenMuutettu={edellinenMuutettu}/>} />
          <Route path="/kayttajalisays" element={<Kayttajalisays registerHandler={registerHandler} kayttajat={kayttajadata}  deleteHandler={deleteHandler} changePasswordHandler={changePasswordHandler} />} />
          <Route path="/excel" element={<Excelinlisays addDataHandler={addDataHandler} deletedata={deletedata} osallistujat={osallistujadata}/>} />
          <Route path="/" element={<Paasivu />} />
        </Routes>
      </HashRouter>

      : rooli === "user" ?
      <HashRouter>
      <div className="navDiv">
        <Navbar.NavbarUser className="navBar"/>
      </div>
      <div className="userSuccess">{message}</div>
      <div className="userFailure">{errormessage}</div>
      <Routes>
        <Route path="/lisaaosallistuja" element={<Lisaaosallistuja osallistujat={osallistujadata} changeArrived={changeArrived} changeUserData={changeUserData} acceptChanges={acceptChanges} declineChanges={declineChanges} haeKaikkiOsallistujat={haeKaikkiOsallistujat} deleteperson={deleteperson} setKirjaaAutomaattisesti={setKirjaaAutomaattisesti} kirjaaAutomaattisesti={kirjaaAutomaattisesti}/>} />
        <Route path="/majoitus" element={<Majoitus majoitusHandler={majoitusHandler} osallistujat={osallistujadata} edellinenMuutettu={edellinenMuutettu}/>} />
        <Route path="/excel" element={<NormiExcelinlisays addDataHandler={addDataHandler} deletedata={deletedata}/>} />
        <Route path="/" element={<Paasivu/>} />
      </Routes>
    </HashRouter>

      : 
      // jos ei ole kirjautunut
      <div>
        <h1 className="kirjauduteksti">Kirjaudu sisään</h1>
        <div className="userFailure">{errormessage}</div>
        <LoginForm loginHandler={loginHandler}/>
      </div>
      }
    </div>
  );
}

export default App;
