exports.up = function (knex) {
  return knex.schema.createTable("movies", (table) => {
    //sets movie id as the primary key
    table.increments("movie_id").primary();
    table.string("title");
    table.integer("runtime_in_minutes");
    table.string("rating");
    table.text("description");
    table.string("image_url");

    // adds created_at and updated_at columns;
    // true as 1st arg sets columns to timestamp type
    // true as 2nd arg sets columns to non-nullable and default current time
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("movies");
};