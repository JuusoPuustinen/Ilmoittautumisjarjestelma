import axios from "axios"

const osallistujaURL = '/haeosallistujat'
const muutaURL = '/muutasaapunut'
const changeURL = '/changedata'
const declineURL = '/decline'
const majoitusURL = '/muutaMajoitus'
const deleteURL = '/deletedata'
const deletePersonURL = '/deleteperson'
const majoitusAlkuURL = '/muutaMajoitusAlussa'

let token = null;

const setOsallistujaTokenMiddle = newToken => {
  token = newToken
}

const makeHeader = () => {
        let header =  {headers: {Authorization: `bearer ${token}`}}
        return header;
}

const getAll = () => {
    const request = axios.get(osallistujaURL, makeHeader())
    return request.then(response => response.data)
}

const update = (id, vaihdos) => {
    const request = axios.put(`${muutaURL}/${id}`, vaihdos, makeHeader())
    return request.then(response => response.data)
}

const updateMajoitus = (tempOsallistujaPacket) => {
    const request = axios.put(majoitusURL, tempOsallistujaPacket, makeHeader())
    return request.then(response => response.data)
}

const change = (id, changedData) => {
    const request = axios.put(`${changeURL}/${id}`, changedData, makeHeader())
    return request.then(response => response.data)
}

const decline = (declineData) => {
    const request = axios.put(declineURL, declineData, makeHeader())
    return request.then(response => response.data)
}

const deletedata = () => {
    const request = axios.delete(deleteURL, makeHeader())
    return request.then(response => response.data)
}

// const deletePerson = (deleteid) => {
//     const request = axios.delete(deletePersonURL, deleteid)
//     return request.then(response => response.data)
// }

const deletePerson = (deleteid) => {
    const request = axios.delete(`${deletePersonURL}/${deleteid}`, makeHeader())
    return request.then(response => response.data)
}

const majoitusAlku = (id) => {
    const request = axios.put(`${majoitusAlkuURL}/${id}`, makeHeader())
    return request.then(response => response.data)
}

export default{
 getAll: getAll,
 update: update,
 change: change,
 decline: decline,
 updateMajoitus: updateMajoitus,
 deletedata: deletedata,
 deletePerson: deletePerson,
 majoitusAlku: majoitusAlku,
 setOsallistujaTokenMiddle: setOsallistujaTokenMiddle
}