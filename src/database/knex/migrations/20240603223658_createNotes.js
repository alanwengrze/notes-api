//criar a tabela notes
exports.up = knex => knex.schema.createTable("notes", table => {
  table.increments("id");
  table.text("title");
  table.text("description");
  // criando a chave estrangeira para o user_id
  table.integer("user_id").references("id").inTable("users");

  //fn - funcionalidade do knex
  table.timestamp("created_at").default(knex.fn.now()).notNullable();
  table.timestamp("updated_at").default(knex.fn.now()).notNullable();
});

//remover a tabela
exports.down = knex => knex.schema.dropTable("notes");
