import express from 'express';//Usa se muito express
import routes from './routes';//AS rotas do back end
import cors from 'cors';//Segurança para rotas
import path from 'path';//Ajudar na locarização da pasta
import {errors} from 'celebrate';//Erro de Validação

const app = express();
app.use(express.json()); //Agora pode entender json traduzir do body
app.use(cors());
app.use(routes);//Usando o arquivo rote

app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));//Usa uma rota para que a imagem possa ser usado

app.use(errors());

app.listen(3333);//Porta do BACK_END
//Programa Principal do BACK-END
