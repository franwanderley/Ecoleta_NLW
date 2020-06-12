import Knex from 'knex';
//Para inserir na tabela
export async function seed(knex : Knex){
   await knex('items').insert([
        {title: 'Lâmpadas', image: 'lampadas.svg'},
        {title: 'Pilhas e Baterias', image: 'baterias.svg'},
        {title: 'Papeis e Papelhão', image: 'papeis-papelao.svg'},
        {title: 'Residuos Eletrônicos', image: 'eletronicos.svg'},
        {title: 'Residuos Orgânicos', image: 'organicos.svg'},
        {title: 'Óleo de Cozinha', image: 'oleo.svg'},
        
    ]); //Inserir na tabela items
}