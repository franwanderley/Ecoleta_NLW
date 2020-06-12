import express from 'express';
import knex from './database/conection'; //Faco a conexão com o banco de dados
import PointsController from "./controller/PointsController";//Importa a classe controller
import ItemsController from "./controller/ItemsController";
import multer from 'multer';//Upload de arquivos
import multerConfig from './config/multer';//configuração para o upload
import {celebrate, Joi} from 'celebrate';//Validação de formulario


const routes = express.Router();
const pointscontroller = new PointsController();//Instancio as classes Controller
const itemscontroller  = new ItemsController();
const upload = multer(multerConfig);

//TypeScript usa tipagem forte como java
//Rota Endereço completo da requisição
//Recurso Qual entidade estamos acessando do sistema
//Lembrando que o que sai daqui é json e o front-end precisa transforma-lo
/* ==Metodo HTTP== 
    GET Buscar um ou mais informações do back-end
    POST Criar uma nova informação no BACK-END
    PUT Atualizar uma informação existente no BACK-end
    DELETE Remover uma informação do Back-End

    Request Params parametros que vem da rota que identifcam um recurso, Se não tiver o parametro não existe a rota http://localhost:3333/Users/5
    Request Query Parametros opcionais que vem da rota, se nãotiver parametro a rota continua, http://localhost:3333/Users?search=on 
    Request Body Parametros para criação/atualização de informações
*/
const users = [
    'Diego',
    'Wanderley',
    'Henrique',
    'Carlos',
    'Janilson',
    'edmilson'
];//Simples exemplo

routes.get('/users', (request, response) => {
    const search = String(request.query.search);//ELe pode retronar um array então forço a usar uma string
    //console.log(search);
    var aux = search ? search : "";
   const FilteredUser = users.filter(User => User.includes(aux));//Vai usar um filtro de quem tem dentro da string a substring seach
   //==JSON==
   return response.json(FilteredUser);
});
//:id representa que será por parametro
routes.get('/users/:id', (request, response) => {
    const id = Number(request.params.id);// OBS : tem que ser o mesmo enviado da rota Users/:id = request.params.id
    //console.log('Listagem de Usuario!');
   //response.send('Hello Word!');//Envia o texto para o front
   const user = users[id];
   //==JSON==
   return response.json(user);//retorna um unico usuario
});

routes.post('/users', (request, response) =>{
    const user = request.body;//Parte do corpo para criação e atualização dos dados
    console.log(user);
    return response.json(users);//Retorna o novo usuario em json

});

routes.get('/', (request, response) => {
     
    //==JSON==
   return response.json( {"Message" : "Conexão com o banco de dados"} );
});

//Vai mostrar todos os items
routes.get('/items', itemscontroller.index);//Busca todos os pontos de coleta com filtro

//Rota para criar pontos de coleta
routes.post('/points', upload.single('image'),
celebrate({ //Validador
    body : Joi.object().keys({ //Pegar os inputs para validar
        name      : Joi.string().required(),
        email     : Joi.string().required().email(),
        whatsapp  : Joi.number().required(),
        latitude  : Joi.number().required(),
        longitude : Joi.number().required(),
        uf        : Joi.string().required().max(2),
        city      : Joi.string().required(),
        items      : Joi.string().required()
    })
}, {
    abortEarly : false //Para que apareça mais de um erro
}), 
pointscontroller.create);//Cria um Ponto de coleta, e pega a imagem

//Rota para mostrar um unico ponto especifico
routes.get('/points/:id', pointscontroller.show);//Mostra um ponto de coleta

//Rota para mostrar todos os pontos com filtro
routes.get('/points', pointscontroller.index);

export default routes;//Este não é o programa principal precisa ser chamado 