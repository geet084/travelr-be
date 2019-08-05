exports.up = (knex) => {
  return Promise.all([
    knex.schema.createTable('objects', table => {
      table.increments('id').primary();
      table.string('name');
      table.string('average_temp');
      table.string('perihelion');
      table.string('aphelion');
      table.string('diameter');
      table.string('gravity');
      table.string('length_of_day');
      table.integer('number_of_moons');
      table.boolean('moon');
      table.string('orbital_period');
      table.boolean('planet');
      table.boolean('star');
      table.timestamps(true, true);
    }),

    knex.schema.createTable('images', table => {
      table.increments('id').primary();
      table.string('image_id');
      table.string('image_name');
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