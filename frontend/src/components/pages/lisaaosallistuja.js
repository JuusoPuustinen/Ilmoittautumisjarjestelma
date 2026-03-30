import React, {useState, useEffect, useRef} from 'react';
import Html5QrcodePlugin from '../Html5QrcodePlugin.jsx';
import menuLogo from './menulogo.svg';

const Lisaaosallistuja = ({osallistujat, changeArrived, changeUserData, acceptChanges, declineChanges, haeKaikkiOsallistujat, deleteperson, setKirjaaAutomaattisesti, kirjaaAutomaattisesti}) => {

const [filteredData, setFilteredData] = useState(osallistujat);

const [searchData, setSearchData] = useState("");

const [hakuData, setHakuData] = useState([]);

const [selectedData, setSelectedData] = useState({});

const [asetukset, setAsetukset] = useState([])

const [valittuAsetus, setValittuAsetus] = useState("")

const [valittuLajittelu, setValittuLajittelu] = useState("")

const [nakyvyys, setNakyvyys] = useState(false)

const [osallistujiaPaikalla, setOsallistujiaPaikalla] = useState(0)

const [majoituksessaPaikalla, setMajoituksessaPaikalla] = useState(0)

// useEffect(() => {
//   const interval = setInterval(() => haeKaikkiOsallistujat(), 5000);
//   return () => {
//     clearInterval(interval);
//   };
// }, []);

useEffect(() => {
  setFilteredData(osallistujat)
  if (selectedData.id > 0) {
    setSelectedData(osallistujat.filter((item) => item.id == selectedData.id)[0])
  }else{
  }

  if (valittuAsetus === "MajoituksessaOlijat") {
    const tempArray = osallistujat.filter(osallistuja => osallistuja.majoituksessa === 1)
    if (valittuLajittelu === "etunimi") {
      setHakuData([...tempArray].sort((a,b) => (a.etunimi > b.etunimi) ? 1 : ((b.etunimi > a.etunimi) ? -1 : 0)))
    } else if (valittuLajittelu === "sukunimi") {
      setHakuData([...tempArray].sort((a,b) => (a.sukunimi > b.sukunimi) ? 1 : ((b.sukunimi > a.sukunimi) ? -1 : 0)))
    } else {
      setHakuData(tempArray)
    }
  } else if(valittuAsetus === "MajoituksessaOlemattomat") {
    const tempArray = osallistujat.filter(osallistuja => osallistuja.majoituksessa === 0)
    if (valittuLajittelu === "etunimi") {
      setHakuData([...tempArray].sort((a,b) => (a.etunimi > b.etunimi) ? 1 : ((b.etunimi > a.etunimi) ? -1 : 0)))
    } else if (valittuLajittelu === "sukunimi") {
      setHakuData([...tempArray].sort((a,b) => (a.sukunimi > b.sukunimi) ? 1 : ((b.sukunimi > a.sukunimi) ? -1 : 0)))
    } else {
      setHakuData(tempArray)
    }
  } else {
    if (valittuLajittelu === "etunimi") {
      setHakuData([...osallistujat].sort((a,b) => (a.etunimi > b.etunimi) ? 1 : ((b.etunimi > a.etunimi) ? -1 : 0)))
    } else if (valittuLajittelu === "sukunimi") {
      setHakuData([...osallistujat].sort((a,b) => (a.sukunimi > b.sukunimi) ? 1 : ((b.sukunimi > a.sukunimi) ? -1 : 0)))
    } else {
      setHakuData(osallistujat)
    }
  }
}, [osallistujat]);

useEffect(() => {
  setFilteredData(hakuData)
}, [hakuData]);

const lajitteleEtunimenMukaan = () => {
  // setHakuData([...osallistujat].sort((a,b) => (a.etunimi > b.etunimi) ? 1 : ((b.etunimi > a.etunimi) ? -1 : 0)))
  // setValittuLajittelu("etunimi")
  if (valittuAsetus === "MajoituksessaOlijat") {
    const tempArray = osallistujat.filter(osallistuja => osallistuja.majoituksessa === 1)
    setHakuData([...tempArray].sort((a,b) => (a.etunimi > b.etunimi) ? 1 : ((b.etunimi > a.etunimi) ? -1 : 0)))
    setValittuLajittelu("etunimi")
  } else if(valittuAsetus === "MajoituksessaOlemattomat"){
    const tempArray = osallistujat.filter(osallistuja => osallistuja.majoituksessa === 0)
    setHakuData([...tempArray].sort((a,b) => (a.etunimi > b.etunimi) ? 1 : ((b.etunimi > a.etunimi) ? -1 : 0)))
    setValittuLajittelu("etunimi")
  } else {
    setHakuData([...osallistujat].sort((a,b) => (a.etunimi > b.etunimi) ? 1 : ((b.etunimi > a.etunimi) ? -1 : 0)))
    setValittuLajittelu("etunimi")
  }
}

const lajitteleSukunimenMukaan = () => {
  setHakuData([...osallistujat].sort((a,b) => (a.sukunimi > b.sukunimi) ? 1 : ((b.sukunimi > a.sukunimi) ? -1 : 0)))

  if (valittuAsetus === "MajoituksessaOlijat") {
    const tempArray = osallistujat.filter(osallistuja => osallistuja.majoituksessa === 1)
    setHakuData([...tempArray].sort((a,b) => (a.sukunimi > b.sukunimi) ? 1 : ((b.sukunimi > a.sukunimi) ? -1 : 0)))
    setValittuLajittelu("sukunimi")
  } else if(valittuAsetus === "MajoituksessaOlemattomat"){
    const tempArray = osallistujat.filter(osallistuja => osallistuja.majoituksessa === 0)
    setHakuData([...tempArray].sort((a,b) => (a.sukunimi > b.sukunimi) ? 1 : ((b.sukunimi > a.sukunimi) ? -1 : 0)))
    setValittuLajittelu("sukunimi")
  } else {
    setHakuData([...osallistujat].sort((a,b) => (a.sukunimi > b.sukunimi) ? 1 : ((b.sukunimi > a.sukunimi) ? -1 : 0)))
    setValittuLajittelu("sukunimi")
  }
}

const lajitteleMajoituksessaOlijat = () => {
  const tempArray = osallistujat.filter(osallistuja => osallistuja.majoituksessa === 1)
    if (valittuLajittelu === "etunimi") {
      setHakuData([...tempArray].sort((a,b) => (a.etunimi > b.etunimi) ? 1 : ((b.etunimi > a.etunimi) ? -1 : 0)))
    } else if (valittuLajittelu === "lipputyyppi") {
      setHakuData([...tempArray].sort((a,b) => (a.lipputyyppi > b.lipputyyppi) ? 1 : ((b.lipputyyppi > a.lipputyyppi) ? -1 : 0)))
    } else {
      setHakuData(tempArray)
    }
}

const lajitteleMajoituksessaOlemattomat = () => {
  const tempArray = osallistujat.filter(osallistuja => osallistuja.majoituksessa === 0)
    if (valittuLajittelu === "etunimi") {
      setHakuData([...tempArray].sort((a,b) => (a.etunimi > b.etunimi) ? 1 : ((b.etunimi > a.etunimi) ? -1 : 0)))
    } else if (valittuLajittelu === "lipputyyppi") {
      setHakuData([...tempArray].sort((a,b) => (a.lipputyyppi > b.lipputyyppi) ? 1 : ((b.lipputyyppi > a.lipputyyppi) ? -1 : 0)))
    } else {
      setHakuData(tempArray)
    }
}

const lajitteleMajoituksessaKaikki = () => {
  if (valittuLajittelu === "etunimi") {
    setHakuData([...osallistujat].sort((a,b) => (a.etunimi > b.etunimi) ? 1 : ((b.etunimi > a.etunimi) ? -1 : 0)))
  } else if (valittuLajittelu === "lipputyyppi") {
    setHakuData([...osallistujat].sort((a,b) => (a.lipputyyppi > b.lipputyyppi) ? 1 : ((b.lipputyyppi > a.lipputyyppi) ? -1 : 0)))
  } else {
    setHakuData(osallistujat)
  }
}

// useEffect(() => {
//   haeKaikkiOsallistujat()
// },[])

//voisi tehdä myöhemmin sillain, että ei näytä dataa jos käyttäjä ei ole hakenut mitään

//Filtteri, joka etsii kirjoitetun tiedon (nimien) mukaan sopivia henkilöitä. Isot ja pienet kirjaimet toimii Siiri ja Juuso 21.2.2023
// const data = osallistujat;

const data_1 = hakuData.map((object,i) => {
  return {...object, kokonimi: hakuData[i]["etunimi"]+' '+hakuData[i]["sukunimi"]+' '+hakuData[i]["sukupuoli"]+' '+hakuData[i]["syntymavuosi"]+' '+hakuData[i]["lipputyyppi"]+' '+hakuData[i]["majoitusluokka"]} ;
});

useEffect(() => {
  setFilteredData(data_1.filter((item) => item.kokonimi.toLowerCase().includes(searchData.toLowerCase())))
}, [hakuData]);

const mouseDownHandler = ( event, classnameForSettings ) => {
  if( event.button === 1 ) {
    setAsetukset(asetukset => [...asetukset, classnameForSettings])
  } else if (event.button === 2){
    setAsetukset(asetukset => [...asetukset, classnameForSettings])
  }
}

const muutosdivNakyvyys = (nakyvyysAsetus) => {
  Array.from(document.getElementsByClassName("muutoskohta"))
      .forEach((item, index) => {
        if (nakyvyysAsetus === "nayta") {
          item.dataset.nakyvyys = 1
        } else {
          item.dataset.nakyvyys = 0
        }
      });
}

const alustaAsetukset = (testiprop) => {
  Array.from(document.getElementsByClassName(testiprop))
      .forEach((item, index) => {
        item.dataset.piilotettu = 0
      });
}

const alustaNakyma = (aktivoi) => {
  Array.from(document.getElementsByClassName("nakyma"))
      .forEach((item, index) => {
        item.dataset.aktiivinen = aktivoi
      });
}

const piilotaSarake = (aktivoi) => {
  Array.from(document.getElementsByClassName("piilotettavaSarake"))
      .forEach((item, index) => {
        item.dataset.aktiivinen = aktivoi
      });
}

useEffect(() => {
  piilotaSarake(0);

}, [osallistujat]);

const deletepersonhandler = (deletepersonid) => {
  // setSelectedData({});
  // deleteperson(selectedData.id)
  if (window.confirm("Haluatko varmasti poistaa osallistujan? VAROITUS: Poistaa edellisen valitun osallistujan, vaikka näkymä ei olisi auki")) {
      setSelectedData({});
      deleteperson(deletepersonid)
    }
}

const onNewScanResult = (decodedText, decodedResult) => {
  let inputFieldi = document.getElementsByClassName('tunnisteID')[0];

  const prototype = Object.getPrototypeOf(inputFieldi);
  const prototypeValueSetter = Object.getOwnPropertyDescriptor(prototype, 'value').set;

  prototypeValueSetter.call(inputFieldi, decodedText); 
  
  inputFieldi.dispatchEvent(new Event('input', { bubbles: true }));
};

const Input = (inputfieldData) => {
  const [content, setContent] = useState(inputfieldData.inputfieldData.selectedDataField + 'a');
  const [width, setWidth] = useState(0);
  const span = useRef();

  useEffect(() => {
    setWidth(span.current.offsetWidth);
  }, [content]);

  const changeHandler = evt => {
    setContent(evt.target.value + 'a');
  };
  return (
    <wrapper is="custom">
      <span id="hide" ref={span}>{content}</span>
      {/* <input type="text" style={{ width }} autoFocus onChange={changeHandler} defaultValue={inputfieldData.inputfieldData} /> */}
      <input key={inputfieldData.inputfieldData.targetDataToChange} className={`muokattavaKentta ${inputfieldData.inputfieldData.targetDataToChange}`} style={{ width }} defaultValue={inputfieldData.inputfieldData.selectedDataField} onChange={e=>{changeUserData(e, inputfieldData.inputfieldData.targetID, `${inputfieldData.inputfieldData.targetDataToChange}`, e.target.value); muutosdivNakyvyys("nayta"); changeHandler(e)}}></input>
    </wrapper>
  );
};

const search = (e) =>
  {setFilteredData(data_1.filter((item) => item.kokonimi.toLowerCase().includes(e.target.value.toLowerCase())));setSearchData(e.target.value);};

  useEffect(() => {
    muutosdivNakyvyys();
    alustaNakyma(0);
  }, [filteredData])
  
  useEffect(() => {
    
    asetukset.forEach(asetus => {
      Array.from(document.getElementsByClassName(`${asetus}`))
      .forEach((item, index) => {
        item.dataset.piilotettu = 1
      });
    })
  }, [asetukset])

  useEffect(() => {
    const paikallaOlijatArray = osallistujat.map(element => element.saapunut);
    const paikallaolijat = paikallaOlijatArray.reduce((previousNumber, currentNumber, index)=>previousNumber+currentNumber, 0);
    setOsallistujiaPaikalla(paikallaolijat)

    const majoituksessaOlijatArray = osallistujat.map(element => element.majoituksessa);
    const majoituksessaolijat = majoituksessaOlijatArray.reduce((previousNumber, currentNumber, index)=>previousNumber+currentNumber, 0);
    setMajoituksessaPaikalla(majoituksessaolijat)
  }, [osallistujat])
  
  //hakupalkki joka löytää nimen ja majoitusluokan mukaan Siiri 27.3.2023
  return (
  <div className='osallistujatWrapper'>
    <div className='asetusmenuDiv'>
      <button className='asetusmenuNappi' onClick={()=>setNakyvyys(!nakyvyys)}><img src={menuLogo}/></button>
      <div className='asetusmenu' style={{display: nakyvyys ? "flex" : "none"}}>
      <button className='nappicss' onClick={e=>{lajitteleMajoituksessaOlijat(); setValittuAsetus("MajoituksessaOlijat"); piilotaSarake(0)}}>Näytä vain majoituksessa olevat</button>
      <button className='nappicss' onClick={e=>{lajitteleMajoituksessaOlemattomat(); setValittuAsetus("MajoituksessaOlemattomat"); piilotaSarake(0)}}>Näytä vain ei majoituksessa olevat</button>
      <button className='nappicss' onClick={e=>{lajitteleMajoituksessaKaikki(); setValittuAsetus(""); piilotaSarake(0)}}>Näytä kaikki</button>
      <button className='nappicss' onClick={e=>deletepersonhandler(selectedData.id)}>Poista valittu osallistuja</button>
      {kirjaaAutomaattisesti ? <button className='nappicss' onClick={e=>setKirjaaAutomaattisesti(0)}>Automaattinen kirjaus päällä</button> : <button className='nappicss' onClick={e=>setKirjaaAutomaattisesti(1)}>Automaattinen kirjaus poissa</button>}
        {
          asetukset.map(function(asetus, i){
            // return (<button onClick={()=>setAsetukset(tempArray.splice(asetus, 1))}>{asetus}</button>);
            return (<button onClick={()=>{setAsetukset((current) => current.filter((element) => {return element !== asetus;})); alustaAsetukset(asetus)}}>{asetus}</button>);
          })
        }
      </div>
    </div>
      {/* tämä nappi laittaa asetukset useStateen kyseisen <span> elementin classnamessa olevan idn mukaan. Asetukset käydään sitten läpi useEffectissä ja piilotetaan jokainen asetuksista löytyvä elementti */}
      {/* <button className='nappicss' onClick={e=>console.log(valittuLajittelu)}>Testinappi</button>
      <button onClick={e=>console.log([...osallistujat].sort((a,b) => (a.sukunimi > b.sukunimi) ? 1 : ((b.sukunimi > a.sukunimi) ? -1 : 0)))}>testinappi2</button> */}
      
      <span><h1>Osallistujia paikalla yhteensä: {osallistujiaPaikalla}</h1></span>
      <span><h1>Osallistujia majoituksessa yhteensä: {majoituksessaPaikalla}</h1></span>
      
    <div className='osallistujatSisempi'>
      <div className='haku'>
        <span><input className='hakukentta' type="text" placeholder="Hae osallistujia nimen tai majoitusluokan mukaan" onKeyUp={search}/></span>
        <table>
          <thead>
            <tr>
              <th onClick={()=>lajitteleEtunimenMukaan()}>Etunimi</th>
              <th onClick={()=>lajitteleSukunimenMukaan()}>Sukunimi</th>
              <th className='piilotettavaSarake'>Sukupuoli</th>
              <th className='piilotettavaSarake'>Syntymävuosi</th>
              <th>Lipputyyppi</th>
              <th>Majoitusluokka</th>
              <th>Sisäänkirjaus</th>
            </tr>
          </thead>
          <tbody className='scrollSection'>
          {filteredData.map((osallistujat) => (
            <tr>
              <td onClick={()=>{setSelectedData(osallistujat); alustaNakyma(1); piilotaSarake(1);}}>{osallistujat.etunimi}</td>
              <td onClick={()=>{setSelectedData(osallistujat); alustaNakyma(1); piilotaSarake(1);}}>{osallistujat.sukunimi}</td>
              <td className='piilotettavaSarake' onClick={()=>{setSelectedData(osallistujat); alustaNakyma(1); piilotaSarake(1);}}>{osallistujat.sukupuoli}</td>
              <td className='piilotettavaSarake' onClick={()=>{setSelectedData(osallistujat); alustaNakyma(1); piilotaSarake(1);}}>{osallistujat.syntymavuosi}</td>
              <td onClick={()=>{setSelectedData(osallistujat); alustaNakyma(1); piilotaSarake(1);}}>{osallistujat.lipputyyppi}</td>
              <td onClick={()=>{setSelectedData(osallistujat); alustaNakyma(1); piilotaSarake(1);}}>{osallistujat.majoitusluokka}</td>
              <td><input type="checkbox" checked={osallistujat.saapunut} onChange={e=>{changeArrived(e, osallistujat.id);}}/></td>
            </tr>
          ))}
          </tbody>
        </table>
          </div>
            <div className='nakyma'>
              <button className='ruksinappi' onClick={e=>{alustaNakyma(0); piilotaSarake(0);}}>Sulje</button>
              <div className='contentDiv'><span className='kentta'><span className="Kokonimi"><h1><Input inputfieldData={{selectedDataField: selectedData.etunimi, targetID: selectedData.id, targetDataToChange: "etunimi"}}/> <Input inputfieldData={{selectedDataField: selectedData.sukunimi, targetID: selectedData.id, targetDataToChange: "sukunimi"}}/></h1></span></span></div>
              <div className='contentDiv affected Yleistiedot(kategoria)'><h2 className='kategoria'><span onMouseDown={e=>mouseDownHandler(e, "Yleistiedot(kategoria)")}>Yleistiedot:</span></h2><span className='kentta'><span className="affected Sukupuoli"><span onMouseDown={e=>mouseDownHandler(e, "Sukupuoli")}>Sukupuoli: </span><Input inputfieldData={{selectedDataField: selectedData.sukupuoli, targetID: selectedData.id, targetDataToChange: "sukupuoli"}}/></span><span className="affected Syntymävuosi"><span onMouseDown={e=>mouseDownHandler(e, "Syntymävuosi")}>Syntymävuosi: </span><Input inputfieldData={{selectedDataField: selectedData.syntymavuosi, targetID: selectedData.id, targetDataToChange: "syntymavuosi"}}/></span></span></div>
              <div className="contentDiv affected Yhteystiedot(kategoria)"><h2 className='kategoria'><span onMouseDown={e=>mouseDownHandler(e, "Yhteystiedot(kategoria)")}>Yhteystiedot:</span></h2><span className='kentta'><span className="affected Puhelinnumero"><span onMouseDown={e=>mouseDownHandler(e, "Puhelinnumero")}>Puhelin: </span><Input inputfieldData={{selectedDataField: selectedData.puhelinnumero, targetID: selectedData.id, targetDataToChange: "puhelinnumero"}}/></span><span className='affected Sähköposti'><span onMouseDown={e=>mouseDownHandler(e, "Sähköposti")}>Sähköposti: </span><Input inputfieldData={{selectedDataField: selectedData.sahkoposti, targetID: selectedData.id, targetDataToChange: "sahkoposti"}}/></span></span></div>
              <div className='contentDiv affected Huoltaja(kategoria)'><h2 className='kategoria'><span onMouseDown={e=>mouseDownHandler(e, "Huoltaja(kategoria)")}>Huoltaja:</span></h2><span className='kentta'><span className='affected HuoltajanNimi'><span onMouseDown={e=>mouseDownHandler(e, "HuoltajanNimi")}>Nimi: </span><Input inputfieldData={{selectedDataField: selectedData.huoltajanimi, targetID: selectedData.id, targetDataToChange: "huoltajanimi"}}/></span><span className='affected HuoltajanPuhelinnumero'><span onMouseDown={e=>mouseDownHandler(e, "HuoltajanPuhelinnumero")}>Puhelin: </span><Input inputfieldData={{selectedDataField: selectedData.huoltajanpuhelin, targetID: selectedData.id, targetDataToChange: "huoltajanpuhelin"}}/></span></span></div>
              <div className='contentDiv affected Osoitetiedot(kategoria)'><h2 className='kategoria'><span onMouseDown={e=>mouseDownHandler(e, "Osoitetiedot(kategoria)")}>Osoitetiedot:</span></h2><span className='kentta'><span className='affected Osoite'><span onMouseDown={e=>mouseDownHandler(e, "Osoite")}>Koko osoite: </span><Input inputfieldData={{selectedDataField: selectedData.osoite, targetID: selectedData.id, targetDataToChange: "osoite"}}/> <Input inputfieldData={{selectedDataField: selectedData.postinumero, targetID: selectedData.id, targetDataToChange: "postinumero"}}/> <Input inputfieldData={{selectedDataField: selectedData.postitoimipaikka, targetID: selectedData.id, targetDataToChange: "postitoimipaikka"}}/></span></span></div>
              <div className='contentDiv affected Majoitus(kategoria)'><h2 className='kategoria'><span onMouseDown={e=>mouseDownHandler(e, "Majoitus(kategoria)")}>Majoitus:</span></h2><span className='kentta'><span className='affected MajoitusVarattu'><span onMouseDown={e=>mouseDownHandler(e, "MajoitusVarattu")}>Majoitus varattuna: </span><Input inputfieldData={{selectedDataField: selectedData.majoitus, targetID: selectedData.id, targetDataToChange: "majoitus"}}/></span><span className='affected Hiljainenhuone'><span onMouseDown={e=>mouseDownHandler(e, "Hiljainenhuone")}>Hiljainenhuone: </span><Input inputfieldData={{selectedDataField: selectedData.hiljainenhuone, targetID: selectedData.id, targetDataToChange: "hiljainenhuone"}}/></span></span></div>
              <div className='contentDiv affected Muuta(kategoria)'><h2 className='kategoria'><span onMouseDown={e=>mouseDownHandler(e, "Muuta(kategoria)")}>Muuta:</span></h2><span className='kentta'><span className='affected id10'><span style={{display: "flex", flexDirection: "column"}}><span className='affected Allergiat'><span onMouseDown={e=>mouseDownHandler(e, "Allergiat")}>Allergiat: </span><Input inputfieldData={{selectedDataField: selectedData.allergiat, targetID: selectedData.id, targetDataToChange: "allergiat"}}/></span><span className='affected Kotiseurakunta'><span onMouseDown={e=>mouseDownHandler(e, "Kotiseurakunta")}>Kotiseurakunta: </span><Input inputfieldData={{selectedDataField: selectedData.kotiseurakunta, targetID: selectedData.id, targetDataToChange: "kotiseurakunta"}}/></span></span></span><span style={{display: "flex", flexDirection: "column"}}><span className='affected Yhteensa'><span onMouseDown={e=>mouseDownHandler(e, "Yhteensa")}>Hinta: </span><Input inputfieldData={{selectedDataField: selectedData.yhteensa, targetID: selectedData.id, targetDataToChange: "yhteensa"}}/>€</span><span className='affected Tunniste'><span onMouseDown={e=>mouseDownHandler(e, "Tunniste")}>Tunniste: </span><Input className="tunnisteFieldi" inputfieldData={{selectedDataField: selectedData.tunnisteID, targetID: selectedData.id, targetDataToChange: "tunnisteID"}}/></span></span><span className='affected Muuta'><span onMouseDown={e=>mouseDownHandler(e, "Muuta")}>Muuta: </span><textarea onChange={e=>{changeUserData(e, selectedData.id, "muuta", e.target.value); muutosdivNakyvyys("nayta");}} key={selectedData.id} defaultValue={selectedData.muuta}></textarea></span></span></div>
              
              <div className='contentDiv muutoskohta'><span className='kentta'><span><button className='peruutaNappi' onClick={()=>{declineChanges(selectedData.id); muutosdivNakyvyys()}}>PERUUTA MUUTOKSET</button></span><span><button className='hyvaksyNappi' onClick={()=>{acceptChanges(); muutosdivNakyvyys();}}>HYVÄKSY MUUTOKSET</button></span></span></div>
            </div>
    </div>
      <div className='skanneriWrapper'>
        <div className="skanneri">
          <Html5QrcodePlugin
              fps={10}
              qrbox={4000}
              disableFlip={false}
              qrCodeSuccessCallback={onNewScanResult}
          />
        </div>
      </div>
  </div>
  )
 }

 export default Lisaaosallistuja;