import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
//AS duas paginas do projeto
import Home from './pages/home';
import CreatePoint from './pages/CreatePoint';
import Sucess from './pages/sucess';
const Routes = () =>{
    /* Criar uma nova rota como em nodejs exect 
    * = quer dizer que o home só roda se for exato /
    *component é qual a classe que vai usar
    */
    return (
        <BrowserRouter>
            <Route component={Home} path="/" exact={true} />
            <Route component={CreatePoint} path="/create-point" exact={true}/>
            <Route component={Sucess} path="/sucess" exact={true}/>
        </BrowserRouter>
    );
};

export default Routes;