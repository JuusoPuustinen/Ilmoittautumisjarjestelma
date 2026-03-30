import React from "react";
import { Nav, NavLink, NavMenu } from "./NavbarElements";

const logout = () => {
  window.localStorage.removeItem('kayttaja')
  window.location.reload()
}

const NavbarAdmin = () => {
  return (
    <>
      <Nav className="navBar">
        <NavMenu className="navMenu">
          <NavLink to="/lisaaosallistuja" className="navLink">
          Osallistujat
          </NavLink>
          <NavLink to="/majoitus" className="navLink">
          Majoitus
          </NavLink>
          <NavLink to="/kayttajalisays" className="navLink">
          Käyttäjän lisääminen
          </NavLink>
          <NavLink to="/excel" className="navLink">
          Lisää osallistuja
          </NavLink>
          <NavLink onClick={logout} className="navLink">
          Kirjaudu ulos
          </NavLink>
        </NavMenu>
      </Nav>
    </>
  );
};

const NavbarUser = () => {
  return (
    <>
      <Nav className="navBar">
        <NavMenu className="navMenu">
          <NavLink to="/lisaaosallistuja" className="navLink">
          Osallistujat
          </NavLink>
          <NavLink to="/majoitus" className="navLink">
          Majoitus
          </NavLink>
          <NavLink to="/excel" className="navLink">
          Lisää osallistuja
          </NavLink>
          <NavLink onClick={logout} className="navLink">
          Kirjaudu ulos
          </NavLink>
        </NavMenu>
      </Nav>
    </>
  );
};
   
export default {
  NavbarAdmin: NavbarAdmin,
  NavbarUser: NavbarUser
}