const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const {hash,compare} = require("bcryptjs"); // precisamos para criptografar as senhas


class UsersController{
    async create(request,response){
        const {name,email,password} = request.body; //capturando os dados do body

        const user = await knex("users").where({email});
        const checkUserExists = user[0]; //verificando se existe o usuario

        if(checkUserExists){
            throw new AppError("Este email ja existe");
        }

        const hashedPassword = await hash(password,8); //usado a criptografia com a funcao hash

        const [note_id] = await knex("users").insert({
            name:name,
            email:email,
            password:hashedPassword
        }); //dando insert em um usuario na tabela usuarios */

        return response.status(200).json()
    }

    async update(request,response){
        const {name,email,password,old_password} = request.body;
        const {id} = request.query;


        const user = await knex("users").where({id});
        const checkUserExists = user[0];

        if(!checkUserExists){
            throw new AppError("Usuario nao encontrado");
        }

        const emailUser = await knex("users").where({email});
        const checkEmailExists = emailUser[0];

        if(checkEmailExists && checkEmailExists.email !== checkUserExists.email){
            throw new AppError("Email em uso");
        }

        user[0].name = name ?? user[0].name;
        user[0].email = email ?? user[0].email;

        
        if(password && !old_password){
            throw new AppError("Você precisa informar a senha antiga para definir a nova senha");
        }

        if(password && old_password){
            const checkOldPassword = await compare(old_password,user[0].password)

            if(!checkOldPassword){
                throw new AppError("A senha antiga não confere");
            }

            user[0].password = await hash(password,8)
        }

        const updateT = await knex('users')
        .where('id', '=', id)
        .update({
            name: user[0].name,
            email: user[0].email,
            password: user[0].password,
            updated_at: Date.now()
        }) //comando update do knex




        return response.status(200).json() 


    }
}

module.exports = UsersController;

// essa classe controle, controla tudo que de fato sera feito, insert, delete, select, update.