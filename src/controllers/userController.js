const knex = require('../database/connection')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const saltRounds = 10;

class UserController {


    async create(req, res){
        const {
            nome,
            email,
            senha
        } = req.body;
        
        const checkMail = await knex('usuarios').select('id').where('email', email); 
        //verificação se a conta de usuário já está cadastrada
        if(checkMail.length > 0){
            return res.status(409).send({message: 'Email já cadastrado'});
        }
        else {

            try{
                bcrypt.hash(senha, saltRounds, async function (err, hash){
                    if(err){
                        return res.status(500).send({message: 'Um erro ocorreu ao efetuar hash da senha', erro: err});
                    }
                    const senha = hash;
                    await knex('usuarios').insert({
                        nome,
                        email,
                        senha
                    });
                });

                return res.status(201).send({message: 'Usuário cadastrado com sucesso!'});
            } catch(e){
                return res.status(500).send({message: 'Um erro inesperado ocorreu', erro: e});
            }
        }
        
    }


    async login(req, res){
        const {
            email,
            senha
        } = req.body;
    
        

        //busca email no banco de dados
        const userMail = await knex('usuarios').select('id', 'nome', 'senha', 'email').where('email', email).first();
        
        if(userMail != undefined){
            try{
                bcrypt.compare(senha, userMail.senha).then(async function(result){
                    if (result){
                        const token = jwt.sign({id: userMail.id}, `${process.env.TOKEN_SECRET}`, {
                            expiresIn: '1d'
                        });

                        const userData = {
                            id: userMail.id,
                            nome: userMail.nome,
                            email: userMail.email,
                            token
                        }

                        return res.status(200).json(userData);
                    }
                    else{
                        return res.status(404).send({message: 'Senha ou usuário incorreto'});
                    }
                });
            } catch(e){
                return res.status(500).send({message: 'Um erro inesperado ocorreu', erro: e});
            }
        
        } else {
            return res.status(404).send({message: 'Senha ou usuário incorreto'});
        }
    }


    async update(req, res){
        const {
            nome,
            email,
            senha
        } = req.body;

        const userId = res.locals.user;
        
        if((await knex('usuarios').select('id').where('id', userId).first()) != undefined ){
            try{
                bcrypt.hash(senha, saltRounds, async function (err, hash){
                    if(err){
                        return res.status(500).send({message: 'Um erro ocorreu ao efetuar hash da senha', erro: err});
                    }
                    const senha = hash;
                    await knex('usuarios').where('id', userId).update({
                        nome,
                        email,
                        senha
                    });
                });

                return res.status(200).send({message: 'Usuário alterado com sucesso!'});
            }catch(e){
                return res.status(500).send({message: 'Um erro inesperado ocorreu', erro: e});
            }
        } 
        else{
            return res.status(404).send({message: 'Usuário não encontrado.'});
        }

    }
    

    async delete(req, res){
        const userId = res.locals.user;

        if((await knex('usuarios').select('id').where('id', userId).first()) != undefined){
            try{
                await knex('usuarios').where('id', userId).delete();
                return res.status(200).send({message: 'Conta deletada com sucesso!'})
            } catch(e){
                return res.status(500).send({message: 'Um erro inesperado ocorreu', erro: e});
            }

        } else {
            return res.status(404).send({message: 'Usuário não encontrado'})
        }
        
    }
}

module.exports = UserController;