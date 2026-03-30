/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex, promise) {
    return knex.schema
    .createTable('kayttajat', t => {
        t.increments('id').primary()
        t.string('nimi').notNullable()
        t.string('salasana').notNullable()
        t.string('rooli').notNullable().defaultTo('user')
    })
    .createTable('osallistujat', t => {
        t.increments('id').primary()
        t.string('etunimi').notNullable().defaultTo("")
        t.string('sukunimi').nullable().defaultTo("")
        t.string('syntymavuosi').nullable()
        t.string('sukupuoli').nullable()
        t.string('osoite').nullable()
        t.string('postinumero').nullable()
        t.string('postitoimipaikka').nullable()
        t.string('sahkoposti').nullable()
        t.string('puhelinnumero').nullable()
        t.string('huoltajanimi').nullable()
        t.string('huoltajanpuhelin').nullable()
        t.string('lipputyyppi').nullable().defaultTo("")
        t.string('yhteensa').nullable()
        t.string('majoitus').nullable()
        t.string('hiljainenhuone').nullable()
        t.string('kotiseurakunta').nullable()
        t.string('allergiat').nullable()
        t.string('majoitusluokka').nullable().defaultTo("")
        t.string('tunnisteID').nullable()
        t.string('muuta').nullable()
        t.boolean('saapunut').nullable().defaultTo('0')
        t.boolean('majoituksessa').nullable().defaultTo('0')
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex, promise) {
    return knex.schema
    .dropTableIfExists('kayttajat')
    .dropTableIfExists('osallistujat')
};
