import React from 'react';
import  './style.css';//Como não exporta nada apenas o codigo
import logo from './../../assets/logo.svg';
import {Link} from 'react-router-dom';//Link para não redimensionar a pagina
import {FiLogIn}  from 'react-icons/fi';//icones

const Home = () =>{
    return  (
        <div id="page-home">
            <div className="content">
                <header>
                    <img src={logo} alt="Ecoleta"/>
                </header>
                <main>
                    <h1>Seu MarketPlace de 
                    coleta de residuos</h1>
                    <p>Ajudamos pessoas a encotrarem pontos de coleta
                     de forma eficiente.</p>
                    <Link to="/create-point">{/*Vai criar um link sem redimensionar a pagina */}
                        <span> <FiLogIn/> </span>
                        <strong>Cadastre um ponto de coleta</strong>
                    </Link>
                </main>
            </div>
        </div>
    );
};

export default Home;