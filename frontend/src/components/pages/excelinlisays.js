import React, { useState, Component  } from "react";
import excelMalli from './excelmalli.PNG';
import excelOhje from './lisaysohje.xlsx';
import XLSX from "xlsx";

const Excelinlisays = ({addDataHandler, deletedata, osallistujat}) => {
    const [newEtunimi, setNewEtunimi] = useState("")
    const [newSukunimi, setNewSukunimi] = useState("")
    const [newSyntymavuosi, setNewSyntymavuosi] = useState("")
    const [newSukupuoli, setNewSukupuoli] = useState("")
    const [newOsoite, setNewOsoite] = useState("")
    const [newPostinumero, setNewPostinumero] = useState("")
    const [newPostitoimipaikka, setNewPostitoimipaikka] = useState("")
    const [newSahkoposti, setNewSahkoposti] = useState("")
    const [newPuhelinnumero, setNewPuhelinnumero] = useState("")
    const [newHuoltajanimi, setNewHuoltajanimi] = useState("")
    const [newHuoltajanpuhelin, setNewHuoltajanpuhelin] = useState("")
    const [newLipputyyppi, setNewLipputyyppi] = useState("")
    const [newYhteensa, setNewYhteensa] = useState("")
    const [newMajoitus, setNewMajoitus] = useState("")
    const [newHiljainenhuone, setNewHiljainenhuone] = useState("")
    const [newKotiseurakunta, setNewKotiseurakunta] = useState("")
    const [newAllergiat, setNewAllergiat] = useState("")
    const [newMajoitusluokka, setNewMajoitusluokka] = useState("")
    const [newTunnisteID, setNewTunnisteID] = useState("")
    const [newMuuta, setNewMuuta] = useState("")
    const [newSaapunut, setNewSaapunut] = useState(false)
    const [newMajoituksessa, setNewMajoituksessa] = useState(false)

    const [excelOhjeetNakyvyys, setExcelOhjeetNakyvyys] = useState(false)

    const tyhjennaformi = () => {
        setNewEtunimi("")
        setNewSukunimi("")
        setNewSyntymavuosi("")
        setNewSukupuoli("")
        setNewOsoite("")
        setNewPostinumero("")
        setNewPostitoimipaikka("")
        setNewSahkoposti("")
        setNewPuhelinnumero("")
        setNewHuoltajanimi("")
        setNewHuoltajanpuhelin("")
        setNewLipputyyppi("")
        setNewYhteensa("")
        setNewMajoitus("")
        setNewHiljainenhuone("")
        setNewKotiseurakunta("")
        setNewAllergiat("")
        setNewMajoitusluokka("")
        setNewTunnisteID("")
        setNewMuuta("")
        setNewSaapunut(false)
        setNewMajoituksessa(false)
    }

    const downloadExcel = (data) => {
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        //let buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });
        //XLSX.write(workbook, { bookType: "xlsx", type: "binary" });
        XLSX.writeFile(workbook, "DataSheet.xlsx");
      };
      

    const addpersonhandler = (e) => {
        // setSelectedData({});
        // deleteperson(selectedData.id)
        if (window.confirm("Haluatko varmasti lisätä osallistujan?")) {
            addDataHandler(e, newEtunimi, newSukunimi, newSyntymavuosi, newSukupuoli, newOsoite, newPostinumero, newPostitoimipaikka,
                newSahkoposti, newPuhelinnumero, newHuoltajanimi, newHuoltajanpuhelin, newLipputyyppi, newYhteensa, newMajoitus, newHiljainenhuone, newKotiseurakunta, newAllergiat,
               newMajoitusluokka, newTunnisteID, newMuuta, newSaapunut, newMajoituksessa);
            tyhjennaformi()
          }
      }

    return(
        <div className="wrapper">
            <div className="exceldiv">
                <h1>Lisää osallistujadataa Excelillä</h1>
                <form
                    id='uploadForm' 
                    action='/upload' 
                    method='post' 
                    encType="multipart/form-data">
                <input type="file" name="sampleFile" />
                <input type='submit' value='Lähetä' />
                </form>


                <div>
                    <button onClick={()=>setExcelOhjeetNakyvyys(!excelOhjeetNakyvyys)}>Ohjeet</button>
                    <div style={{display: excelOhjeetNakyvyys ? "block" : "none"}}>
                        <h2>Ohjeet excelin muotoiluun</h2>
                        <p>Ladattava ohjeistus kävijädatan lisäämisestä järjestelmään.</p>
                        <p>HUOM. On tärkeää muokata kävijädatatiedosto täsmälleen ohjeistuksen mukaisesti, jotta järjestelmä toimii oikein.</p>
                        <a href={excelOhje} download>
                            <button>Lataa malli</button>
                        </a><br/><br/>
                        <h2>Ohjeet verkko versiona</h2>
                        <p>Excelin tulee olla seuraavanlaista muotoa:</p><br/>
                        <p>Varmista, että kenttiä on tismalleen sama määrä. Poista kaikki kentät "On majoituksessa" kentän jälkeen.</p><br/>
                        <p>Varmista, että kentät ovat samassa järjestyksessä, kuin kuvassa</p>
                        <p>Excelin nimi pitää olla kavijadata, ja excelissä vasen ala kulmassa olevan taulun nimi myös kavijadata</p>
                        <img src={excelMalli}/>
                    </div>
                </div>
            </div>
            <div className="kayttajadataformi">
                <form className="formi" onSubmit={e=>addpersonhandler(e)} >

                <h1>Osallistujan lisääminen lomakkeella</h1>
                
                <span className="formiKentta">
                <label for="Etunimi" >Etunimi:</label>
                <input  onChange={e=>setNewEtunimi(e.target.value)} 
                    id="Etunimi"
                    name="Etunimi" 
                    value={newEtunimi} 
                    type="text" /><br/>
                </span>

                <span className="formiKentta">
                <label for="Sukunimi" >Sukunimi:</label>
                <input  onChange={e=>setNewSukunimi(e.target.value)} 
                    id="Sukunimi"
                    name="Sukunimi" 
                    value={newSukunimi} 
                    type="text" /><br/>
                </span>

                <span className="formiKentta">
                <label for="Syntymavuosi" >Syntymävuosi:</label>
                <input  onChange={e=>setNewSyntymavuosi(e.target.value)} 
                    id="Syntymavuosi"
                    name="Syntymavuosi" 
                    value={newSyntymavuosi} 
                    type="text" /><br/>
                </span>

                {/* <span className="formiKentta">
                <label for="Sukupuoli" >Sukupuoli:</label>
                <input  onChange={e=>setNewSukupuoli(e.target.value)} 
                    id="Sukupuoli"
                    name="Sukupuoli" 
                    value={newSukupuoli} 
                    type="text" /><br/>
                </span> */}

                <span className="formiKentta">
                <label for="Sukupuoli">Sukupuoli:</label>
                    <select name="Sukupuoli" onChange={e=>setNewSukupuoli(e.target.value)} id="Sukupuoli" value={newSukupuoli}>
                        <option value="Mies">Mies</option>
                        <option value="Nainen">Nainen</option>
                        <option value="Muu">Muu</option>
                </select>
                </span>

                <span className="formiKentta">
                <label for="Osoite" >Lähiosoite:</label>
                <input  onChange={e=>setNewOsoite(e.target.value)} 
                    id="Osoite"
                    name="Osoite" 
                    value={newOsoite} 
                    type="text" /><br/>
                </span>

                <span className="formiKentta">
                <label for="Postinumero" >Postinumero:</label>
                <input  onChange={e=>setNewPostinumero(e.target.value)} 
                    id="Postinumero"
                    name="Postinumero" 
                    value={newPostinumero} 
                    type="text" /><br/>
                </span>

                <span className="formiKentta">
                <label for="Postitoimipaikka" >Postitoimipaikka:</label>
                <input  onChange={e=>setNewPostitoimipaikka(e.target.value)} 
                    id="Postitoimipaikka"
                    name="Postitoimipaikka" 
                    value={newPostitoimipaikka} 
                    type="text" /><br/>
                </span>

                <span className="formiKentta">
                <label for="Sahkoposti" >Sähköposti:</label>
                <input  onChange={e=>setNewSahkoposti(e.target.value)} 
                    id="Sahkoposti"
                    name="Sahkoposti" 
                    value={newSahkoposti} 
                    type="text" /><br/>
                </span>

                <span className="formiKentta">
                <label for="Puhelinnumero" >Puhelinnumero:</label>
                <input  onChange={e=>setNewPuhelinnumero(e.target.value)} 
                    id="Puhelinnumero"
                    name="Puhelinnumero" 
                    value={newPuhelinnumero} 
                    type="text" /><br/>
                </span>

                <span className="formiKentta">
                <label for="Huoltajanimi" >Huoltajan nimi:</label>
                <input  onChange={e=>setNewHuoltajanimi(e.target.value)} 
                    id="Huoltajanimi"
                    name="Huoltajanimi" 
                    value={newHuoltajanimi} 
                    type="text" /><br/>
                </span>

                <span className="formiKentta">
                <label for="Huoltajanpuhelin" >Huoltajan puhelinnumero:</label>
                <input  onChange={e=>setNewHuoltajanpuhelin(e.target.value)} 
                    id="Huoltajanpuhelin"
                    name="Huoltajanpuhelin" 
                    value={newHuoltajanpuhelin} 
                    type="text" /><br/>
                </span>

                <span className="formiKentta">
                <label for="Lipputyyppi" >Lipputyyppi:</label>
                <input  onChange={e=>setNewLipputyyppi(e.target.value)} 
                    id="Lipputyyppi"
                    name="Lipputyyppi" 
                    value={newLipputyyppi} 
                    type="text" /><br/>
                </span>

                <span className="formiKentta">
                <label for="Yhteensa" >Hinta yhteensä:</label>
                <input  onChange={e=>setNewYhteensa(e.target.value)} 
                    id="Yhteensa"
                    name="Yhteensa" 
                    value={newYhteensa} 
                    type="text" /><br/>
                </span>

                {/* <span className="formiKentta">
                <label for="Majoitus" >Majoitus:</label>
                <input  onChange={e=>setNewMajoitus(e.target.value)} 
                    id="Majoitus"
                    name="Majoitus" 
                    value={newMajoitus} 
                    type="text" /><br/>
                </span> */}

                <span className="formiKentta">
                <label for="Majoitus">Majoitus:</label>
                    <select name="Majoitus" onChange={e=>setNewMajoitus(e.target.value)} id="Majoitus" value={newMajoitus}>
                        <option value="Kyllä">Kyllä</option>
                        <option value="Ei">Ei</option>
                </select>
                </span>

                {/* <span className="formiKentta">
                <label for="Hiljainenhuone" >Hiljainenhuone:</label>
                <input  onChange={e=>setNewHiljainenhuone(e.target.value)} 
                    id="Hiljainenhuone"
                    name="Hiljainenhuone" 
                    value={newHiljainenhuone} 
                    type="text" /><br/>
                </span> */}

                <span className="formiKentta">
                <label for="Hiljainenhuone">Hiljainenhuone:</label>
                    <select name="Hiljainenhuone" onChange={e=>setNewHiljainenhuone(e.target.value)} id="Hiljainenhuone" value={newHiljainenhuone}>
                        <option value="Ei">Ei</option>
                        <option value="Kyllä">Kyllä</option>
                </select>
                </span>

                <span className="formiKentta">
                <label for="Kotiseurakunta" >Kotiseurakunta:</label>
                <input  onChange={e=>setNewKotiseurakunta(e.target.value)} 
                    id="Kotiseurakunta"
                    name="Kotiseurakunta" 
                    value={newKotiseurakunta} 
                    type="text" /><br/>
                </span>

                <span className="formiKentta">
                <label for="Allergiat" >Allergiat:</label>
                <input  onChange={e=>setNewAllergiat(e.target.value)} 
                    id="Allergiat"
                    name="Allergiat" 
                    value={newAllergiat} 
                    type="text" /><br/>
                </span>

                <span className="formiKentta">
                <label for="Majoitusluokka" >Majoitusluokka:</label>
                <input  onChange={e=>setNewMajoitusluokka(e.target.value)} 
                    id="Majoitusluokka"
                    name="Majoitusluokka" 
                    value={newMajoitusluokka} 
                    type="text" /><br/>
                </span>

                <span className="formiKentta">
                <label for="TunnisteID" >Tunniste:</label>
                <input  onChange={e=>setNewTunnisteID(e.target.value)} 
                    id="TunnisteID"
                    name="TunnisteID" 
                    value={newTunnisteID} 
                    type="text" /><br/>
                </span>

                {/* <span className="formiKentta">
                <label for="Muuta" >Muuta:</label>
                <input  onChange={e=>setNewMuuta(e.target.value)} 
                    id="Muuta"
                    name="Muuta" 
                    value={newMuuta} 
                    type="text" /><br/>
                </span> */}

                <span className="formiKentta">
                <label for="Muuta" >Muuta:</label><br/>
                <textarea onChange={e=>setNewMuuta(e.target.value)} id="Muuta" name="Muuta" rows="1" cols="20" value={newMuuta}>
                </textarea>
                </span>

                <span className="formiKentta2">
                <label className="nelioLabel" for="Saapunut" >Saapunut:</label>
                <input onChange={e=>setNewSaapunut(!newSaapunut)} 
                    id="Saapunut"
                    name="Saapunut" 
                    checked={newSaapunut} 
                    type="checkbox" /><br/>
                </span>

                <span className="formiKentta2">
                <label className="nelioLabel" for="Majoituksessa" >Majoituksessa:</label>
                <input onChange={e=>setNewMajoituksessa(!newMajoituksessa)} 
                    id="Majoituksessa"
                    name="Majoituksessa" 
                    checked={newMajoituksessa} 
                    type="checkbox" /><br/>
                </span>
                <input type="submit" value="Tallenna" />
                </form>
            </div><br/><br/><br/><br/>
            <div>
                {/* <button onClick={()=>deletedata()}>Poista kaikki osallistujadata</button> */}
                <button className="poistaNappi" onClick={(e) => {
                    if (window.confirm("Haluatko varmasti poistaa kaiken osallistujadatan?")) {
                    deletedata(); 
              }}}>Poista kaikki osallistujadata</button>
            </div>
            <button onClick={()=>downloadExcel(osallistujat)}>
            Lataa osallistujadata excelinä
            </button>
        </div>
    )
}



export default Excelinlisays;