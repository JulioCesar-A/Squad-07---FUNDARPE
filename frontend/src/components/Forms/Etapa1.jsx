import React from 'react'

const Etapa1 = () => {
  return (
    <div>
      <h2>Etapa 1</h2>
      <h1>INFORMAÇÕES PESSOAIS</h1>
      <div className="form-control">
        <label htmlFor="name"></label>
        <input 
        type="text" 
        name='text' 
        id='name' 
        placeholder='Nome completo' 
        //required/>
        />
      </div>
      <div className="form-control">
        <label htmlFor="email"></label>
        <input 
        type="email" 
        name='email' 
        id='email' 
        placeholder='E-mail' 
        //required/>
        />
      </div>
      <div className="form-control">
        <label htmlFor="name"></label>
        <input 
        type="name" 
        name='text' 
        id='number' 
        placeholder='Cpf' 
        />
      </div>
      <div className="form-control">
        <label htmlFor="date"></label>
        <input 
        type="name" 
        name='text' 
        id='date' 
        placeholder='Data de nascimento' 
        />
      </div>
      <div className="form-control">
        <label htmlFor="name"></label>
        <input 
        type="number" 
        name='text' 
        id='number' 
        placeholder='Senha' 
        />
      </div>
      <div className="form-control">
        <label htmlFor="name"></label>
        <input 
        type="number" 
        name='text' 
        id='number' 
        placeholder='Comfirmar senha' 
        />
      </div>
    </div>
  )
}

export default Etapa1
