import path from 'path';

//E aqui onde faço a conexão com o BD
module.exports = {
    client : 'sqlite3', 
    connection : {
        //Onde o banco de dados
        filename : path.resolve(__dirname, "src", 'database', 'database.sqlite'),  //nome do arquivo do banco de dados e a pasta
    },
    migrations : {
        //Onde crio querybuilds para criar as tabelas
        directory : path.resolve(__dirname, 'src', 'database', 'migrations'),
    },
    seeds : {
        //Onde crio querybuilds para inserir no banco
        directory : path.resolve(__dirname, 'src', 'database', 'seeds'),
    },
    useNullAsDefault : true,
};
// para depois executar npx knex migrate:latest --knexfile knexfile.ts migrate:latest