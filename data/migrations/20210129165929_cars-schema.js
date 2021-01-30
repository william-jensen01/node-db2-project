
exports.up = function(knex) {
    return knex.schema.createTable('cars', tbl => {
      tbl.increments();
      tbl.string('VIN', 17).unique().notNullable();
      tbl.string('Make', 20).notNullable();
      tbl.string('Model', 10).notNullable();
      tbl.string('Mileage', 15).notNullable();

      tbl.string('TransmissionType', 15);
      tbl.string('TitleStatus', 15);
  })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('cars');
};
