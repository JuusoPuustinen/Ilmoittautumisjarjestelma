import React, { useState, Component, useEffect } from 'react';
import Html5QrcodePlugin from '../Html5QrcodePlugin.jsx';
 
const Majoitus = ({majoitusHandler, osallistujat, edellinenMuutettu}) => {

  // const [keyMajoitukselle, setKeyMajoitukselle] = useState(1);
  const [testiUsestate, setTestiUsestate] = useState("");
  const [newKoodi, setNewKoodi] = useState("");
  const [majoituksessaPaikalla, setMajoituksessaPaikalla] = useState(0)

  useEffect(() => {
    const majoituksessaOlijatArray = osallistujat.map(element => element.majoituksessa);
    const majoituksessaolijat = majoituksessaOlijatArray.reduce((previousNumber, currentNumber, index)=>previousNumber+currentNumber, 0);
    setMajoituksessaPaikalla(majoituksessaolijat)
  }, [osallistujat])

  useEffect(() => {
    if (testiUsestate === "") {
    } else {
      const timer = setTimeout(() => {setTestiUsestate("")}, 5000);
      return () => clearTimeout(timer);
    }
  }, [testiUsestate]);

  const majoitusScanHandler = (e, koodi) => {
    if (koodi === testiUsestate) {
    } else if(koodi === "alakoske") {
      //tähän tyhjää, qrkoodi lukija lisäosa oli tyhmä nii oli pakko tehä tämmöne ratkasu
    } else {
      majoitusHandler(e, koodi)
    }
  }

  const onNewScanResult = (decodedText, decodedResult) => {
    setTestiUsestate(decodedText)

    let inputFieldi = document.getElementsByClassName('lisaaMajoitukseenKentta')[0];
  
    const prototype = Object.getPrototypeOf(inputFieldi);
    const prototypeValueSetter = Object.getOwnPropertyDescriptor(prototype, 'value').set;
  
    prototypeValueSetter.call(inputFieldi, "alakoske"); 
    inputFieldi.dispatchEvent(new Event('input', { bubbles: true }));

    prototypeValueSetter.call(inputFieldi, decodedText); 
    
    inputFieldi.dispatchEvent(new Event('input', { bubbles: true }));

    // prototypeValueSetter.call(inputFieldi, "tyhja");

    // inputFieldi.dispatchEvent(new Event('input', { bubbles: true }));
    // setKeyMajoitukselle(keyMajoitukselle + 1)
  };

  return (
    <div>
      <span><h1>Osallistujia majoituksessa yhteensä: {majoituksessaPaikalla}</h1></span>
      <h2>Edellinen sisään tai ulos kirjattu osallistuja: {edellinenMuutettu.etunimi} {edellinenMuutettu.sukunimi}</h2>
      {/* <button onClick={()=>console.log(testiUsestate)}>Testi</button> */}
      <input className={"lisaaMajoitukseenKentta"} style={{}} defaultValue={""} onChange={e=>majoitusScanHandler(e, e.target.value)}></input>
      
      <form onSubmit={e=>{majoitusHandler(e, newKoodi); setNewKoodi("")}}>
        <label for="Koodi">Syötä koodi käsin</label>
        <input  onChange={e=>setNewKoodi(e.target.value)} 
                    id="Koodi"
                    name="Koodi" 
                    value={newKoodi} 
                    type="text" /><br/><br/>
        <input type="submit" value="Syötä" />
      </form>

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
      <div className='edellinenmuutettudiv'>
        <span><span className='edellinenmuutettuOtsikko'>Nimi: </span>{edellinenMuutettu.etunimi} {edellinenMuutettu.sukunimi}</span><br/>
        <span><span className='edellinenmuutettuOtsikko'>Sukupuoli: </span>{edellinenMuutettu.sukupuoli}</span><br/>
        <span><span className='edellinenmuutettuOtsikko'>Syntymävuosi: </span>{edellinenMuutettu.syntymavuosi}</span><br/>
        <span><span className='edellinenmuutettuOtsikko'>Lipputyyppi: </span>{edellinenMuutettu.lipputyyppi}</span><br/>
        <span><span className='edellinenmuutettuOtsikko'>Majoitusluokka: </span>{edellinenMuutettu.majoitusluokka}</span><br/>
      </div>
    </div>
  );
};


  
export default Majoitus;