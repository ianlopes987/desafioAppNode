const knex = require("../database/knex");
const AppError = require("../utils/AppError");


class MoviesController{
    async create(request,response){
        const {title,description,rating,tags} = request.body;
        const {user_id} = request.query;

        if(rating < 0 || rating > 5){
            throw new AppError("Digite uma nota entre 0 e 5");
        }

        const [note_id] = await knex("movie_notes").insert({
            title,
            description,
            rating,
            user_id
        });

        const tagInsert = tags.map(name => {
            return{
                note_id,
                user_id,
                name
            }
        }); /* a variavel tags é um vetor, e com a funcao map percorremos o array
        nas suas posicoes e retornamos um objeto conforme os atributos dentro do return criando
        um array de objetos para separar as tags uma a uma */

        await knex("movie_tags").insert(tagInsert); //insere o array que foi criado a partir da funcao map acima

        response.json();

    }

    async show(request,response){
        const {id} = request.params;

        const movieNote = await knex("movie_notes").where({id}).first();
        const tags = await knex("movie_tags").where({note_id:id});

        return response.json({
            ...movieNote,
            tags
        })
    }

    async delete(request,response){
        const {id} = request.query;

        await knex("movie_notes").where({id}).delete();

        return response.json();
    }

    async index(request,response){
        const {title,user_id,tags} = request.query;
        let notes;

        if(tags){
            const filterTags = tags.split(",").map(tag => tag.trim());

            notes = await knex("movie_tags")
            .select([
                "movie_notes.id",
                "movie_notes.title",
                "movie_notes.user_id"
            ])
            .where("movie_notes.user_id",user_id)
            .whereLike("movie_notes.title", `%${title}%`)
            .whereIn("name",filterTags)
            .innerJoin("movie_notes","movie_notes.id","movie_tags.note_id")
            .orderBy("movie_notes.title");
        }else{
            notes = await knex("movie_notes").where({user_id}).whereLike("title",`%${title}%`);
        }

        const userTags = await knex("movie_tags").where({user_id});
        const notesWithTags = notes.map(note => {
            const notesTags = userTags.filter(tag => tag.note_id === note.id);
            return {
                ...note,
                tags:notesTags
            }
        });

        return response.json(notesWithTags);
    }
}

module.exports = MoviesController;