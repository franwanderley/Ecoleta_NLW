import React from 'react';//{useState}
import Routes from './routes';//Agora vai usar rotas como em nodejs
import './App.css';

function App() {
    //Usa o state para não ficar estatico quanto na pagina e sempre aualizado na Client-Side
    //const [counter, setCounter] = useState(0);//Usar o State e não pode mudar o valor, [0] => função para atualizar o valor do estado
    //Para aumentar o numero
    /*function handleButtonClick() {
        setCounter(counter+1);//Como se fosse um objeto para alterar tem que ser essa função
        console.log(counter);
    }*/
    /**
     * exemplo de codigo
     * <Header title="Bem Vindo!"/>
     * <p>Seja Bem vindo ao Ecoleta</p>
     * <br/>
     * <h1>{counter}</h1>
     * <button type="button" onClick={handleButtonClick} >Aumentar</button>
     */
    //Header vem do arquivo header, importando podemos criar novas tags
    return (
        <div>
            {/*Route que mostra todas as rotas */}
            <Routes/>
        </div>
    );
};

export default App;