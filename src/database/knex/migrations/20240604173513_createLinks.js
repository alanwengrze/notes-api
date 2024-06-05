//criar a tabela links
exports.up = knex => knex.schema.createTable("links", table => {
  table.increments("id");
  table.text("url").notNullable();
  table.integer("note_id").references("id").inTable("notes").onDelete("CASCADE");//deletar a tag se o note for deletado
  table.timestamp("created_at").default(knex.fn.now()).notNullable();
});

//remover a tabela
exports.down = knex => knex.schema.dropTable("links");
