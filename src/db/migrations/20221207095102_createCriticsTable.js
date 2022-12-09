exports.up = function (knex) {
  return knex.schema.createTable("critics", (table) => {
    //sets critic id as the primary key
    table.increments("critic_id").primary();
    table.string("preferred_name");
    table.string("surname");
    table.string("organization_name");

    // adds created_at and updated_at columns;
    // true as 1st arg sets columns to timestamp type
    // true as 2nd arg sets columns to non-nullable and default current time
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("critics");
};
