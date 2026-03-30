/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('osallistujat').del()
  await knex('osallistujat').insert([
    {id: 1, etunimi: 'testi', sukunimi: 'testi', syntymavuosi: '2000', sukupuoli: 'nainen', osoite: 'Testikatu 1', postinumero: '12345', postitoimipaikka: 'Testi', sahkoposti: 'testi@testi.fi', puhelinnumero: '0123456789', huoltajanimi: 'äiti', huoltajanpuhelin: '0123456789', lipputyyppi: 'Osallistuja-X', yhteensa: '55,00€', majoitus: 'Kyllä', hiljainenhuone: 'Kyllä', kotiseurakunta: 'testi', allergiat: 'ei ole', majoitusluokka: 'A1', tunnisteID: '125523', muuta: 'tähän mitä vain', saapunut: true, majoituksessa: true},
    {id: 2, etunimi: 'Tauno', sukunimi: 'testi', syntymavuosi: '2005', sukupuoli: 'mies', osoite: 'Katu 5', postinumero: '80500', postitoimipaikka: 'Pohjoinen', sahkoposti: 'tauno.makkonen@posti.fi', puhelinnumero: '05262365346', huoltajanimi: 'isä', huoltajanpuhelin: '1245233451', lipputyyppi: 'Osallistuja-Y', yhteensa: '40,00€', majoitus: 'Kyllä', hiljainenhuone: 'Ei', kotiseurakunta: 'Joku', allergiat: 'ei ole', majoitusluokka: 'A1', tunnisteID: '4124', muuta: 'uwu', saapunut: true, majoituksessa: false},
    {id: 3, etunimi: 'Mörkö', sukunimi: 'Pöllänen', syntymavuosi: '1998', sukupuoli: 'Muu', osoite: 'Muumilaakso 34', postinumero: '33100', postitoimipaikka: 'Tampere', sahkoposti: 'morko.pol@gmail.com', puhelinnumero: '0447789669', huoltajanimi: 'Muumi Pappa', huoltajanpuhelin: '0412523553', lipputyyppi: 'Artisti', yhteensa: '55,00€', majoitus: 'Kyllä', hiljainenhuone: 'Ei', kotiseurakunta: 'Kajaani SRK', allergiat: 'äyriäiset', majoitusluokka: 'B4', tunnisteID: '254125', muuta: 'tekstiä', saapunut: false, majoituksessa: false},
    {id: 4, etunimi: 'Saara-Susanna', sukunimi: 'Ala-Kulju', syntymavuosi: '2004', sukupuoli: 'Nainen', osoite: 'Suorakuja 4 A 5', postinumero: '60100', postitoimipaikka: 'Seinäjoki', sahkoposti: 'sassu.sussu@hotmail.com', puhelinnumero: '05012554353', huoltajanimi: 'Heli Ala-Kulju', huoltajanpuhelin: '0502151234', lipputyyppi: 'Talkoolainen', yhteensa: '45,00€', majoitus: 'Ei', hiljainenhuone: 'Ei', kotiseurakunta: 'Helsinki Vapis', allergiat: 'ei ole', majoitusluokka: 'C5', tunnisteID: '123', muuta: 'testi dataa', saapunut: true, majoituksessa: false}
  ]);
};
