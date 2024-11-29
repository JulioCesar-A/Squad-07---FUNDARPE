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

    const [formValues, setFormValues] = useState({

        //Campos comuns

        email : '',
        senha : '',
        confirmar_senha : '',

        logradouro : '',
        numero : '',
        bairro : '',
        cidade : '',
        estado : '',
        cep : '',

        //Campos Pessoa Física

        nome_completo : '',
        cpf : '',
        data_nascimento : '',

        // Campos Pessoa Jurídica

        razao_social : '',
        cnpj : '',
        nome_fantasia : '',
            // Representante
        nome_rep : '',
        cpf_rep : '',
        dt_nasc_rep : '',


        // Campos de Anexos
        anexos : [],
        nomes_anexos : []
    });

    const [isformValid, setIsFormValid] = useState(false);

    // Criar funções de validação de campos aqui

        // Validação de senha
    const validarSenha = (senha) => {
        // Senha deve conter pelo menos 8 caracteres, uma letra maiúscula, uma minúscula, um número e um caractere especial
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        return regex.test(senha);
      };

        // Comparação de senhas
    const compararSenhas = (senha, confirmarSenha) => {
        return senha === confirmarSenha;
    }
        // Validação de email
    const validarEmail = (email) => {
        // Email deve conter um @ e um .
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email);
    };

        // Validação de CPF
    const validarCPF = (cpf) => {
        // CPF deve conter 11 dígitos
        const regex = /^\d{11}$/;
        return regex.test(cpf);
    }
        // Validação de CEP
    const validarCep = (cep) => {
        // CEP deve conter 8 dígitos
        const regex = /^\d{8}$/;
        return regex.test(cep);
    }

        // Validação de CNPJ
    const validarCNPJ = (cnpj) => {
        // CNPJ deve conter 14 dígitos
        const regex = /^\d{14}$/;
        return regex.test(cnpj);
    }
        // Validação data de nascimento
    const validarDataNascimento = (data) => {
        // Data não pode ser futura nem antes que 18 anos atrás
        const dataNascimento = new Date(data);
        const dataAtual = new Date();
        const dataMinima = new Date();
        dataMinima.setFullYear(dataAtual.getFullYear() - 18);
        return dataNascimento < dataAtual && dataNascimento > dataMinima;
    }


    const validarAnexos = (anexos, nomeCampo) => {
        // Verifica se há pelo menos um anexo e se o tamanho de cada arquivo é menor que 10MB
        if (anexos.length === 0) return false;
        if (nomeCampo === "Comp_Endereco" && anexos.length > 2) {
            return false;
        }
        for (let i = 0; i < anexos.length; i++) {
            if (anexos[i].size > 10 * 1024 * 1024) {
                return false;
            }
        }
        return true;
    }

    const validarCamposPreenchidos = (formValues) => {
        // Verifica se todos os campos obrigatórios estão preenchidos
        for (const key in formValues) {
            if (formValues[key] === '' || formValues[key].length === 0) {
                return false;
            }
        }
        return true;
    }

    // Criar funções de alterações de campos aqui
    const handleChangeInput = (event) => {
        const { name, value } = event.target;
        setFormValues({ 
            ...formValues, [name]   : value 
        });
    }

    const handleChangeFile = (event) => {
        const { name, files } = event.target;
        const nomes = [];
        for (let i = 0; i < files.length; i++) {
            nomes.push(files[i].name);
        }
        if (validarAnexos(files, name)) {
            setFormValues({
                ...formValues, anexos: files, nomes_anexos: nomes
            });
        } else {
            alert("Um ou mais arquivos são inválidos. Certifique-se de que todos os arquivos tenham menos de 10MB e que o campo de comprovantes de endereço tenha no máximo 2 arquivos.");
        }
    }

    const voltarEtapa = (event) => {
        event.preventDefault();
        if(etapaAtual > 1){
            setEtapaAtual(etapaAtual - 1);
        }
    }

    const avancarEtapa = (event) => {
        event.preventDefault();
        if (etapaAtual < totalEtapas) {
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
                                    <input type='text' name="nome_completo" id='nomeComp' placeholder='Nome Completo' value={formValues.nome_completo} onChange={handleChangeInput} required></input>

                                    <input type='email' name="email" id='email' placeholder='E-mail' value={formValues.email} onChange={handleChangeInput} required></input>
                                    
                                    <input type='text' name="cpf" id='CPF' placeholder='CPF (apenas números)' value={formValues.cpf} onChange={handleChangeInput} required></input>

                                    <input type='password' name="senha" id='senha' placeholder='Senha' value={formValues.senha} onChange={handleChangeInput} required></input>

                                    <input type='date' name="data_nascimento" id='dataNasc' placeholder='Data de Nascimento' value={formValues.data_nascimento} onChange={handleChangeInput} required></input>

                                    <input type='password' name="confirmar_senha" id='confirmSenha' placeholder='Confirmar Senha' value={formValues.confirmar_senha} onChange={handleChangeInput} required></input>
                                </>
                            )}

                            {/* Etapa 1 PJ */}
                            {etapaAtual === 1 && !isPessoaFisica && (
                                <>
                                    <input type='text' name="razao_social" id='razaoSocial' placeholder='Razão Social' value={formValues.razao_social} onChange={handleChangeInput} required></input>
                                    <input type='text' name="nome_rep" id='nomeComp' placeholder='Nome Completo - Representante' value={formValues.nome_rep} onChange={handleChangeInput} required></input>
                                    <input type='text' name="cnpj" id='CNPJ' placeholder='CNPJ (apenas números)' value={formValues.cnpj} onChange={handleChangeInput} required></input>
                                    <input type='text' name="cpf_rep" id='CPF' placeholder='CPF - Representante (apenas números)' value={formValues.cpf_rep} onChange={handleChangeInput} required></input>
                                    <input type='text' name="nome_fantasia" id='nomeFantasia' placeholder='Nome Fantasia' value={formValues.nome_fantasia} onChange={handleChangeInput} required></input>
                                    <input type='date' name="dt_nasc_rep" id='dataNasc' placeholder='Data de Nascimento - Representante' value={formValues.dt_nasc_rep} onChange={handleChangeInput} required></input>
                                </>
                            )}

                            {/* Etapa 2 */}
                            {etapaAtual === 2 && (
                                <>
                                    <input type='text' name="cep" id='cep' placeholder='CEP (apenas números)' value={formValues.cep} onChange={handleChangeInput} required></input>
                                    <input type='text' name="bairro" id='bairro' placeholder='Bairro' value={formValues.bairro} onChange={handleChangeInput} required></input>
                                    <input type='text' name="logradouro" id='logradouro' placeholder='Logradouro' value={formValues.logradouro} onChange={handleChangeInput} required></input>
                                    <input type='text' name="cidade" id='cidade' placeholder='Cidade' value={formValues.cidade} onChange={handleChangeInput} required></input>
                                    <input type='text' name="numero" id='numero' placeholder='Número' value={formValues.numero} onChange={handleChangeInput} required></input>
                                    <input type='text' name="estado" id='estado' placeholder='Estado' value={formValues.estado} onChange={handleChangeInput} required></input>
                                </>
                            )}

                            {/* Etapa 3  PF*/}
                            {etapaAtual === 3 && isPessoaFisica && (

                            <>  
                                <div className="container-input-file">
                                    <label htmlFor="copiaIdentidade">Cópia RG, CNH ou CTPS</label>
                                    <input type="file" name="Identidade" id="copiaIdentidade" required= { true } onChange={handleChangeFile} />
                                </div>
                                <div className="container-input-file">
                                    <label htmlFor="certRegFisc">Certidão de Regularidade Fiscal</label>
                                    <input type="file" name="Cert_Reg_Fiscal" id="certRegFisc" required= { true } onChange={handleChangeFile} />
                                </div>
                                <div className="container-input-file">
                                    <label htmlFor="compEndereco">Comprovantes de Endereço</label>
                                    <input type="file" name="Comp_Endereco" id="compEndereco" required= { true } multiple= { true } onChange={handleChangeFile} />
                                </div>
                                <div className="container-input-file">
                                    <label htmlFor="certPrestCont">Prestação de Contas Funcultura</label>
                                    <input type="file" name="Cert_Prest_Conta" id="certPrestCont" required= { true } onChange={handleChangeFile} />
                                </div>
                                <div className="container-input-file">
                                    <label htmlFor="curriculo">Currículo do Produtor Cultural</label>
                                    <input type="file" name="Curriculo" id="curriculo" required= { true } onChange={handleChangeFile} />
                                </div>
                                
                            </>    
                            
                            )}


                            {/* Etapa 3  PJ*/}
                            {etapaAtual === 3 && !isPessoaFisica && (

                                <>

                                    <div className="container-input-file">
                                        <label htmlFor="contratoEstatutoSocial">Cópia Contrato / Estatuto Social </label>
                                        <input type="file" name="Contrato_Social" id="contratoEstatutoSocial" required= { true } onChange={handleChangeFile} />
                                    </div>
                                    <div className="container-input-file">
                                        <label htmlFor="certRegFisc">Certidão de Regularidade Fiscal</label>
                                        <input type="file" name="Cert_Reg_Fisc"al id="certRegFisc" required= { true } onChange={handleChangeFile} />
                                    </div>
                                    <div className="container-input-file">
                                        <label htmlFor="compEndereco">Comprovantes de Endereço</label>
                                        <input type="file" name="Comp_Endereco" id="compEndereco" required= { true } multiple= { true } onChange={handleChangeFile} />
                                    </div>
                                    <div className="container-input-file">
                                        <label htmlFor="certPrestCont">Prestação de Contas Funcultura</label>
                                        <input type="file" name="Cert_Prest_Conta" id="certPrestCont" required= { true } onChange={handleChangeFile} />
                                    </div>
                                    <div className="container-input-file">
                                        <label htmlFor="curriculo">Currículo da Empresa</label>
                                        <input type="file" name="Curriculo" id="curriculo" required= { true } onChange={handleChangeFile} />
                                    </div>
                                    <div className="container-input-file">
                                        <label htmlFor="cartaoCNPJ">Cópia Cartão CNPJ</label>
                                        <input type="file" name="Cartao_CNPJ" id="cartaoCNPJ" required= { true } onChange={handleChangeFile} />
                                    </div>

                                </>
                            )}
                            {/* Etapa 4 - Exclusiva para PJ*/}
                            {etapaAtual === 4 && (

                                <>
                                    <input type='email' name="email" id='email' placeholder='E-mail' value={formValues.email} onChange={handleChangeInput} required></input>
                                    <input type='password' name="senha" id='senha' placeholder='Senha' value={formValues.senha} onChange={handleChangeInput} required></input>
                                    <input type='password' name="confirmar_senha" id='confirmSenha' placeholder='Confirmar Senha' value={formValues.confirmar_senha} onChange={handleChangeInput} required></input>
                                </>
                            )}
                        
                        </div>
                        <div className='form-buttons'>
                            {etapaAtual === 1 ? <Link to="/select" className='botao-voltar'>Voltar</Link> : <button onClick={voltarEtapa} className='botao-voltar'>Voltar</button>}

                            { etapaAtual < totalEtapas ? <button type="button" onClick={avancarEtapa}className='botao-avancar'>Avançar</button> : <button type="submit" className='botao-avancar'>Concluir</button>}
                        </div>
                    </form>

                    
                    
                </div>
            </div>
       </section> 
    )
}

export default Cadastro;