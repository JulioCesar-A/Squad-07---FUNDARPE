import BarraProgresso from '../../../components/BarraProgresso/BarraProgresso';
import './Cadastro.css';
import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';

function Cadastro (){
    const { tipo } = useParams();

    const isPessoaFisica = tipo === "pessoa-fisica";

    const [totalEtapas, setTotalEtapas] = useState(
        isPessoaFisica ? 3 : 4
    );

    const titulosEtapas = ["INFORMAÇÕES PESSOAIS", "ENDEREÇO", "DOCUMENTOS", "E-MAIL E SENHA"];
    const [etapaAtual, setEtapaAtual] = useState(1);

    const voltarEtapa = () => {
        if(etapaAtual > 1){
            setEtapaAtual(etapaAtual - 1);
        }
    }

    const avancarEtapa = () => {
        if(etapaAtual < totalEtapas){
            setEtapaAtual(etapaAtual + 1);
        }
    }


    return (
       <section className='section-form-cadastro'>
            <div className='container-cadastro'>
                <div className='content-cadastro'>
                    <h2 className='form-etapa'>Etapa {etapaAtual}</h2>
                    <h2 className='titulo-etapa'>{titulosEtapas.at( etapaAtual - 1 )}</h2>


                        
                    <form  className="form-content" action="" encType='multipart/form-data' method="post">
                        
                        {/* Etapa 1 PF */}
                        {etapaAtual === 1 && isPessoaFisica && (
                            <>
                                <input type='text' name="nomeCompleto"id='nomeComp' placeholder='Nome Completo' required></input>
                                <input type='email' name="email" id='email' placeholder='E-mail' required></input>
                                <input type='text' name="CPF"id='CPF' placeholder='CPF (apenas números)' required></input>
                                <input type='password' name="senha" id='senha' placeholder='Senha' required></input>
                                <input type='date' name="dataNascimento" id='dataNasc' placeholder='Data de Nascimento' required></input>
                                <input type='password' name="confirmarSenha" id='confirmSenha' placeholder='Confirmar Senha' required></input>
                            </>
                        )}

                        {/* Etapa 1 PJ */}
                        {etapaAtual === 1 && !isPessoaFisica && (
                            <>
                                <input type='text' name="razaoSocial" id='razaoSocial' placeholder='Razão Social' required></input>
                                <input type='text' name="nomeCompleto"id='nomeComp' placeholder='Nome Completo - Representante' required></input>
                                <input type='text' name="CNPJ" id='CNPJ' placeholder='CNPJ (apenas números)' required></input>
                                <input type='text' name="CPF"id='CPF' placeholder='CPF - Representante (apenas números)' required></input>
                                <input type='text' name="nomeFantasia" id='nomeFantasia' placeholder='Nome Fantasia' required></input>
                                <input type='date' name="dataNascimento" id='dataNasc' placeholder='Data de Nascimento - Representante' required></input>
                            </>
                        )}

                        {/* Etapa 2 */}
                        {etapaAtual === 2 && (
                            <>
                                <input type='text' name="cep" id='cep' placeholder='CEP (apenas números)' required></input>
                                <input type='text' name="bairro" id='bairro' placeholder='Bairro' required></input>
                                <input type='text' name="logradouro" id='logradouro' placeholder='Logradouro' required></input>
                                <input type='text' name="cidade" id='cidade' placeholder='Cidade' required></input>
                                <input type='text' name="numero" id='numero' placeholder='Número' required></input>
                                <input type='text' name="estado" id='estado' placeholder='Estado' required></input>
                            </>
                        )}

                        {/* Etapa 3  PF*/}
                        {etapaAtual === 3 && isPessoaFisica && (

                            <>
                                <input type="file" name="" id="" />
                            </>
                        
                        )}


                        {/* Etapa 3  PJ*/}
                        {etapaAtual === 3 && !isPessoaFisica && (

                            <>
                            </>

                        )}
                    
                    </form>

                    
                    
                    <div className='form-buttons'>
                        {etapaAtual === 1 ? <Link to="/select" className='botao-voltar'>Voltar</Link> : <button onClick={voltarEtapa} className='botao-voltar'>Voltar</button>}

                        { etapaAtual < totalEtapas? <button onClick={avancarEtapa} className='botao-avancar'>Avançar</button> : <button className='botao-avancar'>Concluir</button>}
                    </div>
                </div>
            </div>
       </section> 
    )
}

export default Cadastro;