const knex = require('knex');

exports.up = function(knex){
    return knex.schema.createTable('tasks', table => {
        table.increments('id').primary();
        table.string('title').notNullable();
        table.string('description').notNullable();
        table.string('status').defaultTo('pending');
        table.integer('user_id').unsigned().notNullable();
            
        table.foreign('user_id')
            .references('id')
            .inTable('usuarios');
    });
};

exports.down = function(knex){
    return knex.schema.dropTable('tasks')
};