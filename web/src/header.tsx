import React from 'react';
//Interface para ajudar o typescript
interface HeaderProps{
    title : string //Agora torna obrigatorio usa o title
}

//Usando função para depois usar em App.tsx
//Props.title a propiedade estabelecidade pelo App.tsx
const Header : React.FC<HeaderProps> = (props) => {
    return (
        <header>
            <h1> {props.title} </h1>
        </header>
    );
}
export default Header;