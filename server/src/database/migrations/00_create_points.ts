import Knex from 'knex';
//Sempre que for criar para sqlite precisa fazer essa função criar e destruir
export async function up(knex : Knex){
    //Criar a tabela Points
    return knex.schema.createTable('points', table => {
        table.increments('id').primary(); //Cria o Atributo id com autoincrement e é primarykey
        table.string('image').notNullable();// Cria o Atributo image como string e não nulo
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('whatsapp').notNullable();
        table.decimal('latitude').notNullable();
        table.decimal('longitude').notNullable();
        table.string('city').notNullable();
        table.string('uf',2).notNullable();//2 representa o tamanho

    });

}

export async function down(knex : Knex){
    //Voltar atras(deletar a tabela)
    knex.schema.dropTable('points');//deletar toda a tabela
}