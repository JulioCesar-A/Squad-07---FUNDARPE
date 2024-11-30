import './Cadastro.css';
import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';

const Cadastro = () => {
    const { tipo } = useParams();

    const isPessoaFisica = tipo === "pessoa-fisica";

    const totalEtapas = isPessoaFisica ? 3 : 4;

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

    // const [isformValid, setIsFormValid] = useState(false);

    // const [isformValid, setIsFormValid] = useState(false);

    const validarSenha = (senha) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        const isValid = regex.test(senha);
        if (!isValid) {
            alert("Senha inválida. A senha deve conter pelo menos 8 caracteres, uma letra maiúscula, uma minúscula, um número e um caractere especial.");
        }
        return isValid;
    }

    const compararSenhas = (senha, confirmarSenha) => {
        return senha === confirmarSenha;
    }

    const validarEmail = (email) => {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const isValid = regex.test(email);
        if (!isValid) {
            alert("Email inválido. O email deve conter um '@' e um '.'.")
        }
        return isValid;
    };

    const validarCPF = (cpf) => {
        const regex = /^\d{11}$/;
        const isValid = regex.test(cpf);
        if (!isValid) {
            alert("CPF inválido. O CPF deve conter 11 dígitos.");
        }
        return isValid;
    }

    const validarCep = (cep) => {
        const regex = /^\d{8}$/;
        const isValid = regex.test(cep);
        if (!isValid) {
            alert("CEP inválido. O CEP deve conter 8 dígitos.");
        }
        return isValid;
    }

    const validarCNPJ = (cnpj) => {
        const regex = /^\d{14}$/;
        const isValid = regex.test(cnpj);
        if (!isValid) {
            alert("CNPJ inválido. O CNPJ deve conter 14 dígitos.");
        }
        return isValid;
    }

    const validarDataNascimento = (data) => {
        const dataNascimento = new Date(data);
        const dataAtual = new Date();
        const dataMinima = new Date();
        dataMinima.setFullYear(dataAtual.getFullYear() - 18);
        const isValid = dataNascimento < dataMinima;
        if (!isValid) {
            alert("Data de nascimento inválida. Você deve ter pelo menos 18 anos.");
        }
        return isValid;
    }

    const validarAnexos = (anexos, nomeCampo) => {

        if (anexos.length === 0) return true;

        // se o campo for Comp_Endereco e no array de nomes_anexos não constar duas ocorrências do mesmo nome
        if (nomeCampo === "Comp_Endereco" && formValues.nomes_anexos.filter(nome => nome === nomeCampo).length > 2) {
            alert("O campo de comprovantes de endereço deve conter no máximo 2 arquivos.");
            return false;
        }
        

        for (let i = 0; i < anexos.length; i++) {
            if (anexos[i].size > 10 * 1024 * 1024) {
                alert("Um ou mais arquivos são inválidos. Certifique-se de que todos os arquivos tenham menos de 10MB.");
                return false;
            }
        }
        return true;
    }

    const validarCamposPreenchidos = (campos) => {
        for (const key in campos) {
            if (campos[key] === '' || campos[key] === undefined || campos[key] === null) {
                return false;
            }
        }
        return true;
    }

    const validarEtapa = (etapa, tipo, formValues) => {
        switch (etapa) {
            case 1:
                if (tipo === "pessoa-fisica") {
                    return validarCamposPreenchidos({
                        nome_completo: formValues.nome_completo,
                        email: formValues.email,
                        cpf: formValues.cpf,
                        senha: formValues.senha,
                        confirmar_senha: formValues.confirmar_senha,
                        data_nascimento: formValues.data_nascimento
                    }) && validarEmail(formValues.email) && validarCPF(formValues.cpf) && validarSenha(formValues.senha) && compararSenhas(formValues.senha, formValues.confirmar_senha) && validarDataNascimento(formValues.data_nascimento);
                } else {
                    return validarCamposPreenchidos({
                        razao_social: formValues.razao_social,
                        nome_rep: formValues.nome_rep,
                        cnpj: formValues.cnpj,
                        cpf_rep: formValues.cpf_rep,
                        nome_fantasia: formValues.nome_fantasia,
                        dt_nasc_rep: formValues.dt_nasc_rep
                    }) && validarCNPJ(formValues.cnpj) && validarCPF(formValues.cpf_rep) && validarDataNascimento(formValues.dt_nasc_rep);
                }
            case 2:
                return validarCamposPreenchidos({
                    cep: formValues.cep,
                    bairro: formValues.bairro,
                    logradouro: formValues.logradouro,
                    cidade: formValues.cidade,
                    numero: formValues.numero,
                    estado: formValues.estado
                }) && validarCep(formValues.cep);
            case 3:
                return validarAnexos(formValues.anexos, "Comp_Endereco");
            case 4:
                return validarCamposPreenchidos({
                    email: formValues.email,
                    senha: formValues.senha,
                    confirmar_senha: formValues.confirmar_senha
                }) && validarEmail(formValues.email) && validarSenha(formValues.senha) && compararSenhas(formValues.senha, formValues.confirmar_senha);
            default:
                return false;
        }
    }

    const handleChangeInput = (event) => {
        const { name, value } = event.target;
        setFormValues({ 
            ...formValues, [name]   : value 
        });
    }

    const handleChangeFile = (event) => {
        const { name, files } = event.target;
        const novosAnexos = Array.from(files);
        const novosNomes = [name];

        const updatedAnexos = [...formValues.anexos, ...novosAnexos];
        const updatedNomesAnexos = [...formValues.nomes_anexos, ...novosNomes];

        if (validarAnexos(updatedAnexos, name)) {
            if (name === "Comp_Endereco") {
                updatedNomesAnexos.push(name);
            }

            setFormValues({
                ...formValues, anexos: updatedAnexos, nomes_anexos: updatedNomesAnexos
            });

            // Verificar se os arquivos estão sendo enviados no console
            console.log(...updatedAnexos);
            // e os nomes
            console.log(...updatedNomesAnexos);
        } else {
            alert("Um ou mais arquivos são inválidos. Certifique-se de que todos os arquivos tenham menos de 10MB e que o campo de comprovantes de endereço tenha no máximo 2 arquivos.");
        }
        console.log(updatedAnexos.length);
    }



    const voltarEtapa = (event) => {
        event.preventDefault();
        if(etapaAtual > 1){
            setEtapaAtual(etapaAtual - 1);
        }
        // se voltar na etapa de anexos os que foram inseridos deverão ser removidos
        if(etapaAtual === 3){
            setFormValues({
                ...formValues, anexos: [], nomes_anexos: []
            });
        }
    }

    const avancarEtapa = (event) => {
        event.preventDefault();
        if (etapaAtual < totalEtapas && validarEtapa(etapaAtual, tipo, formValues)) {
            setEtapaAtual(etapaAtual + 1);
        } else {
            alert("Por favor, preencha todos os campos obrigatórios corretamente.");
        }
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        if (validarEtapa(totalEtapas, tipo, formValues)) {
            try {
                const formData = new FormData();
                for (const key in formValues) {
                    // verificar se o campos estão preenchidos no console
                    console.log(key, formValues[key]);
                    if (key === 'anexos') {
                        for (let i = 0; i < formValues[key].length; i++) {
                            formData.append(key, formValues[key][i]);
                        }
                    } else {
                        formData.append(key, formValues[key]);
                    }
                }

                const apiUrl = tipo === 'pessoa-fisica' ? 'http://localhost:8000/produtor-pessoa-fisica' : 'http://localhost:8000/produtor-pessoa-juridica';

                const response = await fetch(apiUrl, {
                    method: 'POST',
                    body: formData,
                });

                if (response.ok) {
                    alert('Cadastro realizado com sucesso!');
                } else if (response.status === 422) {
                    alert('Erro de validação. Verifique os dados e tente novamente.');
                } else {
                    alert('Erro ao realizar cadastro. Tente novamente.');
                }
            } catch (error) {
                console.error('Erro:', error);
                alert('Erro ao realizar cadastro. Tente novamente.');
            }
        } else {
            alert('Por favor, preencha todos os campos obrigatórios corretamente.');
        }
    };

    return (
       <section className='section-form-cadastro'>
            <div className='container-cadastro'>
                <div className='content-cadastro'>
                    <h2 className='form-etapa'>Etapa {etapaAtual}</h2>
                    <h2 className='titulo-etapa'>{titulosEtapas.at( etapaAtual - 1 )}</h2>
                    <form onSubmit={onSubmit} encType='multipart/form-data' method="post">
                        <div className={etapaAtual === 4 ? 'form-content etapa-4' : 'form-content'}>
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