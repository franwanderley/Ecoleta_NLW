import multer from 'multer'; //biblioteca para upload de arquivos
import path from 'path';
import crypto from 'crypto';//Para gerar nome para imagem

export default {
    storage: multer.diskStorage({
        destination : path.resolve(__dirname, '..','..','uploads'),//Para onde será encaminhado
        filename(request,file, callback){
            const hash = crypto.randomBytes(6).toString('hex');//gerar 6 caracteres em hexadecimal
            const filename = `${hash}-${file.originalname}`; //hash mais o nome original
            callback(null,filename);//Param erro, nome do arquivo
        }
    }),
};
/*===========Arquivo para upload de arquivos=========== */