import Knex from 'knex';
/* ==CONSTROI A TABELA COM KNEX AI DEPOIS TEM QUE EXECUTAR NPM RUM KNEX:MIGRATE== */
//Sempre que for criar para sqlite precisa fazer essa função criar e destruir

export async function up(knex : Knex){
    //Criar a tabela
    return knex.schema.createTable('items', table => {
        table.increments('id').primary(); //Cria o Atributo id com autoincrement e é primarykey
        table.string('image').notNullable();// Cria o Atributo image como string e não nulo
        table.string('title').notNullable();
    });

}

export async function down(knex : Knex){
    //Voltar atras(deletar a tabela)
    knex.schema.dropTable('items');//deletar toda a tabela
}