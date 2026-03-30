const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const express = require('express')
const fileUpload = require('express-fileupload');
const path = require('path')
const app = express()
const excelToJson = require('convert-excel-to-json');

app.use(express.json());
app.use(fileUpload());
app.use(express.static(path.join(__dirname, 'build')));

const config = require('./config')
const options = config.DATABASE_OPTIONS;

const knex = require('knex')(options);

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

const getTokenFrom = req => {
    const authorization = req.get('authorization');
    // console.log(authorization);
    if(authorization && authorization.toLowerCase().startsWith('bearer ')){
        return authorization.substring(7)
    } else {
        return null
    }
}

//tokenin validointi -Juuso 21.2.2023
const validateToken = (req, res) =>{
  const token = getTokenFrom(req);

  if(!token){
      return res.status(401).json(
          { error: "auth token missing" }
      )
  }

  let decodedToken = null;

  try{
      decodedToken = jwt.verify(token, config.SECRET);
      return decodedToken;
  }
  catch(error){
  }
  
  if(!decodedToken || !decodedToken.id){
      return res.status(401).json(
          { error: "invalid token" }
      )
  }
  return decodedToken
}

//Katsotaan onko käyttäjän salasana oikein ja tehdään käyttäjästä JWT -Juuso 21.2.2023
app.post('/login', (req, res, next) => {
  const user = req.body;

  knex('kayttajat').select('*').where('nimi', '=', user.nimi)
      .then((dbuser) => {
          if (dbuser.length == 0) {
              return res.status(401).json(
                  { error: "invalid username or password" }
              )
          }
          const tempUser = dbuser[0];
          bcrypt.compare(user.salasana, tempUser.salasana)
              .then((passwordCorrect) => {
                  if (!passwordCorrect) {
                      return res.status(401).json(
                          { error: "invalid username or password" }
                      )
                  } 

                  //token
                  const userForToken = {
                    nimi: tempUser.nimi,
                      id: tempUser.id,
                      rooli: tempUser.rooli
                  } 

                  const token = jwt.sign(userForToken, config.SECRET)


                  res.status(200).send({
                      token,
                      nimi: tempUser.nimi,
                      rooli: tempUser.rooli
                      // jos tekee monta eri käyttäjätyyppiä, role: "regularuser"
                  })
              }).catch((err) => {
                res.status(500).json(
                    { error: err }
                )
            });
      }).catch((err) => {
        res.status(500).json(
            { error: err }
        )
    });
})

//rekisteröinti, salasana hashataan -Juuso 21.2.2023
app.post('/register', (req, res) => {
    const user = req.body;
    const saltRounds = 10;
    bcrypt.hash(user.password, saltRounds)
        .then((passwordHash) => {
            const newUser = {
                nimi: user.username,
                salasana: passwordHash, 
                rooli: "user"
            }
            knex('kayttajat').insert(newUser)
                .then(() => {
                    res.status(204).end()
                }).catch((err) => {
                    res.status(500).json(
                        { error: err }
                    )
                })
        }).catch((err) => {
            res.status(500).json(
                { error: err }
            )
        })
})

app.post('/VaihdaAdminSalasana', (req, res) => {
    const data = req.body;
    const vaihdettukayttaja = data.newUsrChange;
    const vaihdettusalasana = data.newPassChange;
    var bcrypt = require('bcryptjs');
    var salt = bcrypt.genSaltSync(10);
    var hashedpassword = bcrypt.hashSync(vaihdettusalasana, salt);

    knex('kayttajat').update("salasana", hashedpassword).where("nimi", "=", vaihdettukayttaja)
        .then((response) => {
            if(response)
                res.status(204).end();
            else
                return res.status(401).json(
                    {error: "invalid userid"}
                )
            
        }).catch((err) => {
            res.status(500).json(
                { error: err }
            )
        });
})


//haetaan osallistujat 
app.get('/haeosallistujat', (req, res) => {
    validateToken(req,res)
    knex('osallistujat').select('*')
        .then((rows) => {
            res.json(rows);
        }).catch((err) => {
            res.status(500).json(
                { error: err }
            )
        })
})
// hakee kaikki käyttäjät 13.3.2023 Siiri
app.get('/haekayttajat', (req, res) => {
    validateToken(req,res)
    knex('kayttajat').select('*')
        .then((rows) => {
            res.json(rows);
        }).catch((err) => {
            res.status(500).json(
                { error: err }
            )
        })
})

//poistaa käyttäjän (kayttajalisays.js korjattu niin, ettei voi poista ID 1 eli pääkäyttäjää) Siiri 27.3.2023
app.delete('/users/:id', (req, res) => {
    validateToken(req,res)
    const id = req.params.id;

    knex('kayttajat').where('id', '=', id).del()

        .then(status => {
            res.status(204).end();
        })
        .catch((err) => {
            res.status(500).json(
                { error: err }
            )
        })
})

app.delete('/deletedata', (req, res) => {
    validateToken(req,res)
    knex('osallistujat').del()
        .then(status => {
            res.status(204).end();
        })
        .catch((err) => {
            res.status(500).json(
                { error: err }
            )
        })
})

app.delete('/deleteperson/:id', (req, res) => {
    validateToken(req,res)
    const id = req.params.id;

    knex('osallistujat').where('id', '=', id).del()

        .then(status => {
            res.status(204).end();
        })
        .catch((err) => {
            res.status(500).json(
                { error: err }
            )
        })
})


// app.delete('/deleteperson', (req, res) => {
//     const deleteid = req.body
//     // knex('osallistujat').del().where('id', '=', id)
//     //     .then(status => {
//     //         res.status(204).end();
//     //     })
//     //     .catch((err) => {
//     //         res.status(500).json(
//     //             { error: err }
//     //         )
//     //     })
// })


app.post('/addParticipant', (req, res) => {
    validateToken(req,res)
    const participantData = req.body;
    knex('osallistujat').insert(participantData)
        .then(() => {
            res.status(204).end()
        }).catch((err) => {
            res.status(500).json(
                { error: err }
                )
        })
})

app.post('/upload', function(req, res) {
    let sampleFile;
    let uploadPath;
  
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }
  
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    sampleFile = req.files.sampleFile;
    uploadPath = __dirname + '/files/' + sampleFile.name;
  
    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv(uploadPath, function(err) {
      if (err)
        return res.status(500).send(err);
  
      res.send('File uploaded!');

      //Exceli muutetaan jsoniksi, käytetään convert-excel-to-json packageä -Juuso 6.3.2023
      const resultdata = excelToJson({
        sourceFile: 'files/kavijadata.xlsx',
        header:{
            rows: 1
        },
        columnToKey: {
            A: 'etunimi',
            B: 'sukunimi',
            C: 'syntymavuosi',
            D: 'sukupuoli',
            E: 'osoite',
            F: 'postinumero',
            G: 'postitoimipaikka',
            H: 'sahkoposti',
            I: 'puhelinnumero',
            J: 'huoltajanimi',
            K: 'huoltajanpuhelin',
            L: 'lipputyyppi',
            M: 'yhteensa',
            N: 'majoitus',
            O: 'hiljainenhuone',
            P: 'kotiseurakunta',
            Q: 'allergiat',
            R: 'majoitusluokka',
            S: 'tunnisteID',
            T: 'muuta',
            U: 'saapunut',
            V: 'majoituksessa'
            
        },
        sheetStubs: true
    });
    // Excelistä tehty jsoni lähetetään tietokantaan -Juuso 6.3.2023
    knex('osallistujat').insert(resultdata.kavijadata)
    .then(id_arr => {
        // newExcel.id = id_arr[0]
        // res.json(newExcel);
        res.status(200).end()
    }).catch((err) => {
        res.status(500).json(
            { error: err }
        )
    });
    });
    
  });

app.put('/muutasaapunut/:id', (req, res) => {
    validateToken(req,res)

    const id = req.params.id;
    const osallistuja = req.body;
    const paivitetty = {
        etunimi: osallistuja.etunimi,
        sukunimi: osallistuja.sukunimi,
        syntymavuosi: osallistuja.syntymavuosi,
        sukupuoli: osallistuja.sukupuoli,
        osoite: osallistuja.osoite,
        postinumero: osallistuja.postinumero,
        postitoimipaikka: osallistuja.postitoimipaikka,
        sahkoposti: osallistuja.sahkoposti,
        puhelinnumero: osallistuja.puhelinnumero,
        huoltajanimi:osallistuja.huoltajanimi,
        huoltajanpuhelin: osallistuja.huoltajanpuhelin,
        lipputyyppi: osallistuja.lipputyyppi,
        yhteensa: osallistuja.yhteensa,
        majoitus: osallistuja.majoitus,
        hiljainenhuone: osallistuja.hiljainenhuone,
        kotiseurakunta: osallistuja.kotiseurakunta,
        allergiat: osallistuja.allergiat,
        majoitusluokka: osallistuja.majoitusluokka,
        tunnisteID: osallistuja.tunnisteID,
        muuta: osallistuja.muuta,
        saapunut: osallistuja.saapunut,
        majoituksessa: osallistuja.majoituksessa
    }

    knex('osallistujat').update(paivitetty).where('id', '=', id)
        .then((response) => {
            if(response)
                res.status(204).end();
            else
                return res.status(401).json(
                    {error: "invalid userid"}
                )
            
        }).catch((err) => {
            res.status(500).json(
                { error: err }
            )
        });
})

app.put('/muutaMajoitus', (req, res) => {
    validateToken(req,res)

    const tempOsallistujaPacket = req.body
    const tunnisteID = tempOsallistujaPacket.tunnisteID;
    const osallistuja = tempOsallistujaPacket.tempOsallistuja;

    const paivitetty = {
        etunimi: osallistuja.etunimi,
        sukunimi: osallistuja.sukunimi,
        syntymavuosi: osallistuja.syntymavuosi,
        sukupuoli: osallistuja.sukupuoli,
        osoite: osallistuja.osoite,
        postinumero: osallistuja.postinumero,
        postitoimipaikka: osallistuja.postitoimipaikka,
        sahkoposti: osallistuja.sahkoposti,
        puhelinnumero: osallistuja.puhelinnumero,
        huoltajanimi:osallistuja.huoltajanimi,
        huoltajanpuhelin: osallistuja.huoltajanpuhelin,
        lipputyyppi: osallistuja.lipputyyppi,
        yhteensa: osallistuja.yhteensa,
        majoitus: osallistuja.majoitus,
        hiljainenhuone: osallistuja.hiljainenhuone,
        kotiseurakunta: osallistuja.kotiseurakunta,
        allergiat: osallistuja.allergiat,
        majoitusluokka: osallistuja.majoitusluokka,
        tunnisteID: osallistuja.tunnisteID,
        muuta: osallistuja.muuta,
        saapunut: osallistuja.saapunut,
        majoituksessa: osallistuja.majoituksessa
    }

    knex('osallistujat').update("majoituksessa", paivitetty.majoituksessa).where('tunnisteID', '=', tunnisteID)
        .then((response) => {
            if(response)
                res.status(204).end();
            else
                return res.status(401).json(
                    {error: "invalid tunnisteID"}
                )
            
        }).catch((err) => {
            res.status(500).json(
                { error: err }
            )
        });
})

app.put('/muutaMajoitusAlussa/:id', (req, res) => {
    validateToken(req,res)
    const id = req.params.id;
    knex('osallistujat').update("majoituksessa", 1).where('id', '=', id)
        .then((response) => {
            if(response)
                res.status(204).end();
            else
                return res.status(401).json(
                    {error: "invalid tunnisteID"}
                )
            
        }).catch((err) => {
            res.status(500).json(
                { error: err }
            )
        });
})


app.put('/changedata/:id', (req, res) => {
    validateToken(req,res)
    const id = req.params.id;
    // const target = req.params.target;
    const changedData = req.body;
    const target = changedData.target
    const changed = changedData.changed
    const muokkaaja = changedData.muokkaaja

    knex('osallistujat').update(target, changed).where('id', '=', id)
        .then((response) => {
            if(response)
                res.status(204).end();
            else
                return res.status(401).json(
                    {error: "invalid userid"}
                )
            
        }).catch((err) => {
            res.status(500).json(
                { error: err }
            )
        });
    
    knex('osallistujat').update("EdellinenMuokkaaja", muokkaaja).where('id', '=', id)
        .then((response) => {
            if(response)
                res.status(204).end();
            else
                return res.status(401).json(
                    {error: "invalid userid"}
                )
            
        }).catch((err) => {
            res.status(500).json(
                { error: err }
            )
        });
})

app.put('/decline', (req, res) => {
    validateToken(req,res)
    const vanhadata = req.body

    knex('osallistujat').update(vanhadata).where('id', '=', vanhadata.id)
        .then((response) => {
            if(response)
                res.status(204).end();
            else
                return res.status(401).json(
                    {error: "invalid userid"}
                )
            
        }).catch((err) => {
            res.status(500).json(
                { error: err }
            )
        });
    // const target = req.params.target;
    // const declineData = req.body;
    // knex('osallistujat').del()
    //     .then((response) => {
            
    //         if(response)
    //             res.status(204).end();
    //         else
    //             return res.status(401).json(
    //                 {error: "invalid data"}
    //             )
            
    //     })

    //     knex('osallistujat').insert(declineData)
    //     .then((response) => {
            
    //         if(response)
    //             res.status(204).end();
    //         else
    //             return res.status(401).json(
    //                 {error: "invalid data"}
    //             )
            
    //     })
})

const PORT = config.PORT;
app.listen(PORT, () => {
})