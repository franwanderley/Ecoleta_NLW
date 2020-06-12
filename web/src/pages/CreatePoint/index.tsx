import React, {useEffect,useState, FormEvent,ChangeEvent} from "react";//Usar react para todos
import './style.css';
import {Link,useHistory} from 'react-router-dom';//Link para não atualizar a pagina toda,useHistory para redimensionar
import logo from './../../assets/logo.svg';
import api from './../../services/api';//Fazer a conexão com o Back-End
import {FiArrowLeft} from 'react-icons/fi';//Icone
import { Map, TileLayer, Marker } from 'react-leaflet';//Para usar o mapa
import axios from 'axios';//Fazer conexão como IBGE
import { LeafletMouseEvent } from 'leaflet';//Para pode clicar no mapa
import Dropzone from './../../components';//Upload de imagens
import { ExecException } from "child_process";

const CreatePoint = () => {
    //E preciso mostra como é a variavel items
    interface Item {
        id : number;
        title : string;
        image_url : string;
    }

    //Para estados do IBGE
    interface  IBGEUF {
        sigla : string;
    }
    //Para pegar cidades por estado do IBGE
    interface  CITYUF {
        nome : string;
    }

    //Quando o usuario escolher o estado vai entar aqui
    function handleSelectUf(event : ChangeEvent<HTMLSelectElement>){
        const uf = String(event.target.value);//Vai mudar o estado
        setSelectedUf(uf);//Mudar o estado
     }
     //Quando o usuario escolher a cidade vai entar aqui
    function handleSelectCity(event : ChangeEvent<HTMLSelectElement>){
        const city = String(event.target.value);//Vai mudar o estado
        setSelectedCity(city);//Mudar o estado
     }
     //Para escolher um ponto do mapa
    function handleMapClick(event : LeafletMouseEvent){
        setSlectedPosition( [ event.latlng.lat, event.latlng.lng ] );//Latitude e Longitude
    }
     //Vai salvar os inputs ao escrever
    function handleInputChange(event : ChangeEvent<HTMLInputElement>){
        //console.log(event.target.value);   
        const {name, value} = event.target;//Vai guarda o nome do input e o valor
        setFormData({...formData, [name] : value  });//Tá pegando a mesma expressão,pega cada atributo e muda
    }
     //Para selecionar os items
    function handleSelectItem(id : number){
        //var clicado = false;
        if(selectedItems.includes(id)){//Se o id tiver sido selecionado vai ser desmarcado
            const itemsfiltrados = selectedItems.filter(item => item !== id);//vai tirar o item com este id
            setSelectedItems(itemsfiltrados);
        }
        else
        setSelectedItems( [ ...selectedItems, id ] );
        //console.log(id);
    }
     //Para enviar o formulario
    async function handleSubmit(event : FormEvent){
        event.preventDefault();//Para não atualizar a pagina ao enviar
        const {name, email, whatsapp} = formData;//Chaves objeto
        const uf = selectedUf;
        const city = selectedCity;
        const [latitude, longitude] = selectedPosition;//[] array
        const items = selectedItems;

        const data = new FormData();//Submit por multipath/form-data
        data.append('name', name);
        data.append('email', email);
        data.append('whatsapp', whatsapp);
        data.append('uf', uf);
        data.append('city', city);
        data.append('latitude', String(latitude));
        data.append('longitude', String(longitude));
        data.append('items', items.join(','));//Vai juntar em string com virgula
        if(selectedFile)
            data.append('image', selectedFile);//Imagem if => caso seja nulo
        
        /* submit com JSON(Não permite arquivos)
        const data = {
            name, email, whatsapp, uf, city, latitude, longitude, items
        }; 
        */
        //await tem que esperar o comando senão nada funciona
        try{
            await api.post('points',data);//Vai conectar com o BACK_END e enviar informações do form 
            //Tem que ir para pagina deu certo
            history.push('/sucess');//vai redimensionar para outr rota
        }catch(e){
            alert("Erro no formulario!");
        }
    }

    /*Sempre que cria um state para array, objeto
     * variavel aqui se chama state e para muda-lo tem que usar o set
     *  precisa manualmente informar o tipo da variavel
     */
    const history = useHistory();//Para redimensionar o usuario
    const [formData, setFormData] = useState( {
        name : '',
        email : '',
        whatsapp : ''
    } );//Pegar os iput do formulario
    const [ufs, setUfs] = useState<string[]>( [] ); //Todos os Estados
    const [items, setItems] = useState<Item[]>( [] );//Para pegar todos os items
    const [selectedUf, setSelectedUf] = useState( '0' );//Estado selecionado
    const [cities, setCities] = useState<string[]>( [] );//Todas as cidades
    const [selectedCity, setSelectedCity] = useState('0');//salvar cidade selecionada
    const [initialPosition, setInitialPosition] = useState<[number,number]>([0,0]);//posição de onde o usuario está
    const [selectedPosition, setSlectedPosition] = useState<[number,number]>(initialPosition);//Salvar posição do mapa
    const [selectedItems, setSelectedItems] = useState<number[]>( [] );//Salvar ids do items selecionados
    const [selectedFile, setSelectedFile] = useState<File>();//Para guardar o arquivo selecionado

    //Sempre que for para pegar algum dado seja do BACK-END ou de sites usa-se useEffect
    useEffect( () => {
       api.get('items').then(response => {
           //console.log(response);
           setItems(response.data);//Vai guardar no Items
       });//rota do BACK-END 
    }, []);//Para que não dispare e reinicie todo o html
    
    //Para pegar estados
    useEffect( () => {
        axios.get<IBGEUF[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
        .then(response =>{
            const ufinitials = response.data.map(uf => uf.sigla);//Sempre que eu quiser pegar um atributo de um objeto preciso fazer sua interface
            //console.log(response.data);
            setUfs(ufinitials);
        });
    }, []);

    //Para pegar cidade
    useEffect( () => {
        if(selectedUf === '0') //Caso não escolha nada
            return ;
        axios.get<CITYUF[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`)
        .then(response =>{
            const citynames = response.data.map(city => city.nome);
            //console.log(response.data);
            setCities(citynames);
        });
    }, [selectedUf]);//Vai rodar quando o selectedUf mudar
    //Para pegar posição inicial
    useEffect(() =>{
        navigator.geolocation.getCurrentPosition(position => {
            const {latitude, longitude} = position.coords;
            setInitialPosition( [latitude,longitude] );
        });
    },[]);

    return (
        <div id="page-create-point">
            <header>
                <img src={logo} alt="Ecoleta"/>
                <Link to="/"> {/* Link para não redimensionar */}
                    <FiArrowLeft/>{/* Icone */}
                    Voltar para Home
                </Link>
            </header>
            <form onSubmit={handleSubmit}> {/* Função para enviar o formulario */}
                <h1>Cadastro do<br/> Ponto de Coleta</h1>
                {/* UPLOAD DE IMAGEM COM DROPZONE */}
                <Dropzone onFileUploaded={setSelectedFile}/>

                <fieldset>
                    <legend><h2>Dados</h2></legend>
                    <div className="field">
                        <label htmlFor="name">Nome da Entidade</label>
                        <input type="text" name="name" onChange={handleInputChange} id="name"/>
                    </div>

                    <div className="field">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" onChange={handleInputChange} id="email"/>
                    </div>

                    <div className="field">
                        <label htmlFor="whatsapp">Whatsapp</label>
                        <input type="text" name="whatsapp" onChange={handleInputChange} id="whatsapp"/>
                    </div>
                </fieldset>
                
                <fieldset>
                    <legend>
                        <h2>Endereço</h2>
                        <span>Selecione o endereço no mapa</span>
                    </legend>
                    <Map center={ [-3.693017,-40.3598908] } zoom = {15} 
                    onClick={handleMapClick} > {/* Ao clicar será marcado no mapa */}
                        <TileLayer attribution='&amp;copy 
                            <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />

                        <Marker position= { selectedPosition } />{/* Vai marcar onde foi selecionado */}
                    </Map>
                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="uf">Estado(UF)</label>
                            <select name="uf" value={selectedUf} id="uf" onChange={handleSelectUf}>
                                <option value="0">Selecione uma estado</option>
                                { //VARIOS OPÇÕES DE ESTADO
                                    ufs.map(uf =>(
                                        <option key={uf} value={uf}>{uf}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="field">
                            <label htmlFor="city">Cidade</label>
                            <select name="city" id="city" onChange = {handleSelectCity} value= {selectedCity} > 
                                <option value="0">Selecione uma cidade</option>
                                { //VARIOS OPÇÕES DE CIDADE POR ESTADO
                                    cities.map(city =>(
                                        <option key={city} value={city}>{city}</option>
                                        //Map é como o foeach do php
                                    ))
                                }
                            </select>
                        </div>
                    </div>
                </fieldset>
                
                <fieldset>
                    <legend><h2>Itens de coleta</h2></legend>
                    <ul className="items-grid">
                        {
                            //Map vai pecorrer todo o array como um foreach
                            items.map(item => (
                                //Sempre que usa map assim tem que usar o key para identificar usando o id
                                <li key={item.id} className={selectedItems.includes(item.id) ? "selected" : "" /*Seleciona o que foi clicado */}
                                    onClick={() => handleSelectItem(item.id)}>
                                    {/* Sempre que quero passar algo por parametro tenho que usar arrowfunction */}
                                    <img src={item.image_url} alt={item.title}/>
                                    <span>{item.title}</span>
                                </li>
                             ) )
                        }
                        
                    </ul>
                </fieldset>

                <button type="submit">Cadastrar Ponto de Coleta</button>
            </form>
        </div>
    );
};

export default CreatePoint;