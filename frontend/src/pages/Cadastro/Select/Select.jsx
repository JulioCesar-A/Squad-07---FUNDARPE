import React from 'react';
import './Select.css';

function Campo({tipo}) {
    if (tipo == "PF") {
        return (
        <div className="container-seletor">
     
            <div className="content-seletor background-1">

                <h2>EU SOU<br/>PESSOA FÍSICA</h2>
                <hr />
                <button>
                    <span>Cadastre-se</span>
                </button>

            </div>

        </div>
        );
    }
    if (tipo == "PJ"){
        return (
        <div className="container-seletor">
    
            <div className="content-seletor background-2">

                <h2>EU SOU<br/>PESSOA JURÍDICA</h2>
                <hr />
                <button>
                    <span>Cadastre-se</span>
                </button>

            </div>

        </div>
        );
    }
}

function Select() {
    return (
        <section className="select-section">
            <Campo tipo="PF"></Campo>
            <Campo tipo="PJ"></Campo>
        </section>
    );
}

export default Select;