exports.up = function (knex) {
  return knex.schema.createTable("theaters", (table) => {
    //sets theater id as the primary key
    table.increments("theater_id").primary();
    table.string("name");
    table.string("address_line_1");
    table.string("address_line_2");
    table.string("city");
    table.string("state");
    table.string("zip");
    // adds created_at and updated_at columns;
    // true as 1st arg sets columns to timestamp type
    // true as 2nd arg sets columns to non-nullable and default current time
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("theaters");
};
