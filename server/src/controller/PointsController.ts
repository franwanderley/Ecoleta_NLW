import knex from './../database/conection'; //Faco a conexão com o banco de dados
import {Request, Response} from 'express';

class PointsController {
    //Cria um Ponto de coleta
    async create(request : Request, response : Response){
        const {
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
            items, //Vai pegar os items como id
            image
        } = request.body;//Como eu sei o nome da variavel de retorno eu estou pegando atributo por atributo

        const trx = await knex.transaction();//Vai abrir a transação do banco de dados

        const insertedIds = await trx('points').insert( {image: request.file.filename, name, email, whatsapp, latitude, longitude, city, uf} );//Iserir no banco de dados
     
        //Agora vou ligar points e items
        const pointItems = items
        .split(',').map((item :string) => Number(item.trim())) //Vai separa por virgulas e tirar o espaço
        .map((item_id : Number) =>{  //items.map pega todos os items enquanto que item_id só um como se fosse um foeach
            return{
                item_id,
                point_id : insertedIds[0] //Esse id é o do points salvo retornado da função insert 
            };
        }); 
        const idpoints_items = await trx('points_items').insert(pointItems);
        await trx.commit();//Fecho a transação

        return response.json( { "id" : insertedIds, } );
    }

    //Mostra um ponto de coleta
    async show(request : Request, response : Response){
        const { id } = request.params; //Vai pegar o id do parametro

        const point = await knex('points').where('id', id).first();//SELECT * FROM points WHERE id = :id, o primeiro

        //Vai pegar todos os items que tenha em points_items e que seja do ponto especifico
        const items = await knex('items')
        .join('points_items', 'items.id', '=', 'points_items.item_id').where('points_items.point_id', '=', id)
        .select('items.title');

        if(!point){
            response.status(400).json( { "message" : "Ponto de Coleta não encotrado!" } );//Caso não ter encotrado
        }
        const serializedPoint =  {
            ...point, //retona tudo igual menos a imagem que vem com o caminho
            image_url : `http://localhost:3333/uploads/${point.image} `,
        };

        return response.json( { point : serializedPoint, items } );
    }

    //Busca todos os pontos de coleta com filtro
    async index(request : Request, response : Response){
        //cidade,estado,uf filtro usando queryes
        const { city, uf, items } = request.query;
        const itemsseparados = String(items).split(',').map(item => Number(item.trim()));//Vou separar os ids do item em um array de numero
        
        const points = await knex('points')
        .join('points_items', 'points.id', 'points_items.point_id')
        .whereIn('points_items.item_id', itemsseparados)
        .where('city', '=', String(city))
        .where('uf', '=', String(uf))
        .distinct().select('points.*');//Vai retorna os pontos filtrados com items, city, uf

        const serializedPoints = points.map(point => {
            return {
                ...point, //retona tudo igual menos a imagem
                image_url : `http://localhost:3333/uploads/${point.image} `,
            };
        });

        return response.json(points);
    }
}

export default PointsController; //Para usar em outro arquivo