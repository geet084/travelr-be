exports.up = (knex) => {
  return Promise.all([
    knex.schema.createTable('objects', table => {
      table.increments('id').primary();
      table.string('object_name');
      table.string('average_temp');
      table.string('distance_from_sun');
      table.string('diameter');
      table.string('length_of_day');
      table.integer('number_of_moons');
      table.boolean('moon');
      table.string('orbital_period');
      table.boolean('planet');
      table.timestamps(true, true);
    }),

    knex.schema.createTable('images', table => {
      table.increments('id').primary();
      table.string('image_id');
      table.integer('object_id').unsigned()
      table.foreign('object_id')
        .references('objects.id');
      table.timestamps(true, true);
    })
  ]);
};

exports.down = (knex) => {
  return Promise.all([
    knex.schema.dropTable('images'),
    knex.schema.dropTable('objects')
  ]);
};