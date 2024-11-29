import './Cadastro.css';
import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';

const Cadastro = () => {
    const { tipo } = useParams();

    const isPessoaFisica = tipo === "pessoa-fisica";

    const [totalEtapas, setTotalEtapas] = useState(
        isPessoaFisica ? 3 : 4
    );

    const titulosEtapas = ["INFORMAÇÕES PESSOAIS", "ENDEREÇO", "DOCUMENTOS", "E-MAIL E SENHA"];
    const [etapaAtual, setEtapaAtual] = useState(1);

    const voltarEtapa = (event) => {
        event.preventDefault();
        if(etapaAtual > 1){
            setEtapaAtual(etapaAtual - 1);
        }
    }

    const avancarEtapa = (event) => {
        event.preventDefault();
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


                        
                    <form action="" encType='multipart/form-data' method="post">
                        <div className={etapaAtual === 4 ? 'form-content etapa-4' : 'form-content'}>
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
                                <div className="container-input-file">
                                    <label htmlFor="copiaIdentidade">Cópia RG, CNH ou CTPS</label>
                                    <input type="file" name="copiaIdentidade" id="copiaIdentidade" required= { true }/>
                                </div>
                                <div className="container-input-file">
                                    <label htmlFor="certRegFisc">Certidão de Regularidade Fiscal</label>
                                    <input type="file" name="certidaoRegularidadeFiscal" id="certRegFisc" required= { true }/>
                                </div>
                                <div className="container-input-file">
                                    <label htmlFor="compEndereco">Comprovantes de Endereço</label>
                                    <input type="file" name="comprovantesEndereco" id="compEndereco" required= { true } multiple= { true } />
                                </div>
                                <div className="container-input-file">
                                    <label htmlFor="certPrestCont">Prestação de Contas Funcultura</label>
                                    <input type="file" name="prestacaoContasFuncultura" id="certPrestCont" required= { true }/>
                                </div>
                                <div className="container-input-file">
                                    <label htmlFor="curriculo">Currículo do Produtor Cultural</label>
                                    <input type="file" name="curriculoProdutorCultural" id="curriculo" required= { true }/>
                                </div>
                                
                            </>    
                            
                            )}


                            {/* Etapa 3  PJ*/}
                            {etapaAtual === 3 && !isPessoaFisica && (

                                <>

                                    <div className="container-input-file">
                                        <label htmlFor="copiaIdentidade">Cópia RG, CNH ou CTPS</label>
                                        <input type="file" name="" id="copiaIdentidade" required/>
                                    </div>
                                    <div className="container-input-file">
                                        <label htmlFor="certRegFisc">Certidão de Regularidade Fiscal</label>
                                        <input type="file" name="certidaoRegularidadeFiscal" id="certRegFisc" required= { true }/>
                                    </div>
                                    <div className="container-input-file">
                                        <label htmlFor="compEndereco">Comprovantes de Endereço</label>
                                        <input type="file" name="comprovantesEndereco" id="compEndereco" required= { true } multiple= { true } />
                                    </div>
                                    <div className="container-input-file">
                                        <label htmlFor="certPrestCont">Prestação de Contas Funcultura</label>
                                        <input type="file" name="prestacaoContasFuncultura" id="certPrestCont" required= { true }/>
                                    </div>
                                    <div className="container-input-file">
                                        <label htmlFor="curriculo">Currículo do Produtor Cultural</label>
                                        <input type="file" name="curriculoProdutorCultural" id="curriculo" required= { true } />
                                    </div>

                                </>
                            )}
                            {/* Etapa 4 - Exclusiva para PJ*/}
                            {etapaAtual === 4 && (

                                <>
                                    <input type='email' name="email" id='email' placeholder='E-mail' required></input>
                                    <input type='password' name="senha" id='senha' placeholder='Senha' required></input>
                                    <input type='password' name="" id='confirmSenha' placeholder='Confirmar Senha' required></input>
                                </>
                            )}
                        
                        </div>
                        <div className='form-buttons'>
                            {etapaAtual === 1 ? <Link to="/select" className='botao-voltar'>Voltar</Link> : <button onClick={voltarEtapa} className='botao-voltar'>Voltar</button>}

                            { etapaAtual < totalEtapas ? <button onClick={avancarEtapa} className='botao-avancar'>Avançar</button> : <button className='botao-avancar'>Concluir</button>}
                        </div>
                    </form>

                    
                    
                </div>
            </div>
       </section> 
    )
}

export default Cadastro;