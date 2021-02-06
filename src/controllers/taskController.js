const knex = require('../database/connection');

const TaskController = {

    async create(req, res) {
        const {
            title,
            description
        } = req.body;

        const user_id = res.locals.user;

        try {
            await knex('tasks').insert({
                title,
                description,
                user_id
            });

            return res.status(201).send({message: 'Tarefa cadastrada com sucesso!'});
        } catch(e){
            return res.status(500).send({message: 'Um erro inesperado ocorreu', erro: e});
        }
    },


    async getById(req, res){
        const { id } = req.params;
        
        const task = await knex('tasks').select('*').where('id', id).first();

        if(task != undefined){
            return res.status(200).json(task);
        }
        else{
            return res.status(404).send({message: 'Tarefa não encontrada'});
        }
        
    },


    async getAllTasks(req, res){
        const page = req.query.page;
        const limit = req.query.limit;

        const startIndex = (page - 1) * limit;
        const endIndex =  page * limit;

        const allTasks = await knex('tasks').select('*');

        if(allTasks.length > 0){
            const tasks = allTasks.slice(startIndex, endIndex);
            res.status(200).json({tasks, perPage: limit, page: page});
        }
        else {
            res.status(404).send({message: 'Nenhuma tarefa encontrada!'});
        }
    },


    async update(req, res){
        const { id } = req.params
        
        const {
            title,
            description,
            status
        } = req.body;

        if(await knex('tasks').select('id').where('id', id).first() != undefined){
            try{    
            
                await knex('tasks').update({
                    title,
                    description,
                    status
                }).where('id', id);
                
                return res.status(200).send({message: 'Tarefa atualizada com sucesso'});
            } catch(e){

                return res.status(500).send({message: 'Um erro inesperado ocorreu!', erro: e});
            }
        }
        else {
            return res.status(404).send({message: 'Tarefa não encontrada!'});
        }
    },


    async delete(req, res){
        const { id } = req.params;

        if(await knex('tasks').where('id', id).delete()){
            res.status(200).send({message: 'Tarefa deletada com sucesso!'});
        }
        else{
            res.status(404).send({message: 'Tarefa não encontrada!'});
        }
    }
}

module.exports = TaskController;