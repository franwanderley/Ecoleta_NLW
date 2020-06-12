import knex, { ConnectionConfig } from 'knex';// Para tratar as query em javascript
import path from 'path';//Para ajudar em localizar pasta


const conection = knex({
    client : 'sqlite3', 
    connection : {
        //Onde o BD está
        filename : path.resolve(__dirname, 'database.sqlite'),  //nome do arquivo do banco de dados
    },
    useNullAsDefault : true,
});

export default conection;//Feita a conexão do banco de dados;