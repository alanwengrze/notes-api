//criar a tabela tags
exports.up = knex => knex.schema.createTable("tags", table => {
  table.increments("id");
  table.text("name").notNullable();
  // criando a chave estrangeira para o user_id
  table.integer("user_id").references("id").inTable("users");
  table.integer("note_id").references("id").inTable("notes").onDelete("CASCADE");//deletar a tag se o note for deletado
});

//remover a tabela
exports.down = knex => knex.schema.dropTable("tags");
