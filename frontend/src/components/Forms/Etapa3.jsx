import React from 'react'

const Etapa3 = () => {
  return (
    <div>
      <h2>Etapa 3</h2>
      <h1>ANEXOS</h1>
      <div className="form-control">
        <label htmlFor="name"></label>
        <input 
        type="text" 
        name='text' 
        id='name' 
        placeholder='Cópia Contrato/Estatuto Social' 
        //required/>
        />
      </div>
      <div className="form-control">
        <label htmlFor="email"></label>
        <input 
        type="email" 
        name='email' 
        id='email' 
        placeholder='Comprovantes de Endereço' 
        //required/>
        />
      </div>
      <div className="form-control">
        <label htmlFor="name"></label>
        <input 
        type="name" 
        name='text' 
        id='number' 
        placeholder='Curriculo da Empresa' 
        />
      </div>
      <div className="form-control">
        <label htmlFor="date"></label>
        <input 
        type="name" 
        name='text' 
        id='date' 
        placeholder='Certidão de Regularidade Fiscal' 
        />
      </div>
      <div className="form-control">
        <label htmlFor="name"></label>
        <input 
        type="number" 
        name='text' 
        id='number' 
        placeholder='Prestação de Contas Fucultura' 
        />
      </div>
      <div className="form-control">
        <label htmlFor="name"></label>
        <input 
        type="number" 
        name='text' 
        id='number' 
        placeholder='Cópia Cartão CNPJ' 
        />
      </div>
    </div>
  )
}

export default Etapa3
