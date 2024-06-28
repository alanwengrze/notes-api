const knex = require('../database/knex');

class NotesController{

  //criando uma nova nota
  async create(request, response){
    const { title, description, tags, links } = request.body;
    const user_id = request.user.id;

    //criando a nota
    const [ note_id ] = await knex('notes').insert({
      title,
      description,
      user_id
    });

    //buscando os links
    const linksInsert = links.map(link => {
      return{
        note_id,
        url: link
      }
    });
    await knex('links').insert(linksInsert);


    const tagsInsert = tags.map(name => {
      return{
        note_id,
        name,
        user_id
      }
    });
    //inserindo as tags na tabela
    await knex('tags').insert(tagsInsert);

    return response.json();
  }

  //mostrando as notas pelo id
  async show(request, response){
    const { id } = request.params;

    //buscando a nota pelo id. Retorne o primeiro
    const note = await knex('notes').where({ id }).first();

    //buscando as tags da nota onde o note_id da tag seja igual ao id da nota passado como parametro. Ordene pelo nome da tag
    const tags = await knex('tags').where({ note_id: id }).orderBy('name');

    //buscando os links da nota
    const links = await knex("links").where({note_id:id}).orderBy("created_at");

    return response.json({
      ...note,
      tags,
      links
    });
  }

  async delete(request, response){
    const { id } = request.params;

    await knex('notes').where({ id }).delete();

    return response.json();
  }

  //listando as notas de um usuario pelo id do usuario
  async index(request, response){
    const { title, tags } = request.query;
    
    const user_id = request.user.id;

    let notes;

    //se tags for informado, busca as tags pelo nome
    if(tags){
      //separando as tags em um array
      const filterTags = tags.split(',').map(tag => tag.trim());
      //selecionando as colunas id, title e user_id de notes do user_id informado
      //buscando as tags pelo nome, onde o name da tag esteja dentro do array filterTags
      notes = await knex('tags')
        .select([
          "notes.id",
          "notes.title",
          "notes.user_id",
        ])
        .where("notes.user_id", user_id)
        .whereLike("notes.title", `%${title}%`)
        .whereIn('name', filterTags)
        .innerJoin("notes", "notes.id", "tags.note_id")
        .groupBy("notes.id")
        .orderBy("notes.title")
    }else{
      notes = await knex('notes')
      .where({user_id})
      .whereLike('title', `%${title}%`)
      .orderBy('title')
    }

    //retornando as notas com as tags
    //buscando as tags do user
    const userTags = await knex("tags").where({ user_id });

    //buscando as tags das notas
    const notesWithTags = notes.map(note => {
      const noteTags = userTags.filter(tag => tag.note_id === note.id);

      return{
        ...note,
        tags: noteTags
      }
    })

    return response.json(notesWithTags);
  }
}

module.exports = NotesController;