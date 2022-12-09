exports.up = function (knex) {
  return knex.schema.createTable("reviews", (table) => {
    //sets review id as the primary key
    table.increments("review_id").primary();
    table.text("content");
    table.integer("score");
    table.integer("critic_id").unsigned().notNullable();
    table
      .foreign("critic_id")
      .references("critic_id")
      .inTable("critics")
      .onDelete("CASCADE");
    table.integer("movie_id").unsigned().notNullable();
    table
      .foreign("movie_id")
      .references("movie_id")
      .inTable("movies")
      .onDelete("CASCADE");
    // adds created_at and updated_at columns;
    // true as 1st arg sets columns to timestamp type
    // true as 2nd arg sets columns to non-nullable and default current time
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("reviews");
};