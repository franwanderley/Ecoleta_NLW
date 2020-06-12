import React from 'react';
import {Link} from 'react-router-dom';
import { FaCheckCircle, FaArrowLeft } from 'react-icons/fa';//Icone
import logo from './../../assets/logo.svg';
import './style.css';

const sucess = () => {

    return (
        <div className="content">
            <header>
                <img src={logo} alt="Ecoleta"/>
                <Link className='a' to="/"> {/* Link para não redimensionar */}
                    <FaArrowLeft/>{/* Icone */}
                    Voltar para Home
                </Link>
            </header>
            <br/>
            <div className='sucess'>
                <FaCheckCircle/>
                <br/> <h3>Novo Ponto de Coleta salvo com sucesso!</h3>
            </div>
        </div>
    );
}
export default sucess;