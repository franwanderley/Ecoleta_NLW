import Knex from 'knex';
//Sempre que for criar para sqlite precisa fazer essa função criar e destruir
export async function up(knex : Knex){
    //Criar a tabela
    return knex.schema.createTable('points_items', table => {
        table.increments('id').primary(); //Cria o Atributo id com autoincrement e é primarykey
        table.string('point_id').notNullable().references('id').inTable('points');// Chave estrangeira referencia a tabela points
        table.string('item_id').notNullable().references('id').inTable('items'); //chave estrangeira referencia a tabela items
    });

}

export async function down(knex : Knex){
    //Voltar atras(deletar a tabela)
    knex.schema.dropTable('items');//deletar toda a tabela
}