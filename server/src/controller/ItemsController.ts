import knex from "./../database/conection";
import {Request, Response} from 'express';

class ItemsController {
    //Vai mostrar todos os items
    async index(resquest : Request, response: Response){
        const items = await knex('items').select('*');//SELECT * FROM items == await significa que tem que esperar o comando
    
        const serializedItems = items.map(item => {
            return {
                id        : item.id,
                title     : item.title,
                image_url : `http://localhost:3333/uploads/${item.image} `,
            };
        });
        return response.json(serializedItems);
    }
}

export default ItemsController;