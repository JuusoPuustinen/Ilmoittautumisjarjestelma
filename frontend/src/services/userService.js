import axios from 'axios';

const loginURL = "/login";
const registerURL = "/register";
const addParticipantURL = "/addParticipant";
const kayttajaURL = '/haekayttajat'
const deleteuserURL ='/users'
const changePassURL ='/VaihdaAdminSalasana'

let token = null;

const setUserTokenMiddle = newToken => {
  token = newToken
}

const makeHeader = () => {
        let header =  {headers: {Authorization: `bearer ${token}`}}
        return header;
}

const login = (userdata) => {
    const request = axios.post(loginURL, userdata)
    return request.then(response => response.data)
}

const register = (newUser) => {
    const request = axios.post(registerURL, newUser)
    return request.then(response => response.data)
}

const addData = (participantData) => {
    const request = axios.post(addParticipantURL, participantData, makeHeader())
    return request.then(response => response.data)
}

const getAllUser = () => {
    const request = axios.get(kayttajaURL, makeHeader())
    return request.then(response => response.data)
}

const remove = (id) => {
    const request = axios.delete(`${deleteuserURL}/${id}`, makeHeader())
    return request.then(response => response.data)
}

const changePass = (changePassData) => {
    const request = axios.post(changePassURL, changePassData)
    return request.then(response => response.data)
}

export default {
    login:login,
    register:register,
    addData:addData,
    getAllUser:getAllUser,
    remove:remove,
    changePass:changePass,
    setUserTokenMiddle:setUserTokenMiddle
}