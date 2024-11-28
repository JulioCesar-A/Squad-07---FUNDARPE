import React from 'react';
import './Select.css';
import { Link } from 'react-router-dom';

function Campo({tipo}) {
    
    const isPessoaFisica = tipo === "pessoa-fisica";

        return (
        <div className="container-seletor">
     
            <div className="content-seletor background-1">

                <h2>EU SOU<br/>{isPessoaFisica ? "PESSOA FÍSICA" : "PESSOA JURÍDICA"}</h2>
                <hr />
    
                <Link to={`/cadastro/${tipo}`} className='button-cadastro'>Cadastre-se</Link>


            </div>

        </div>
        );
    }

function Select() {
    return (
        <section className="select-section">
            <Campo tipo="pessoa-fisica"></Campo>
            <Campo tipo="pessoa-juridica"></Campo>
        </section>
    );
}

export default Select;