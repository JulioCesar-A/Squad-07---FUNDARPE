import React from 'react'

const Etapa2 = () => {
  return (
    <div>
      <h2>Etapa 2</h2>
      <h1>ENDEREÇO</h1>
      <div className="form-control">
        <label htmlFor="name"></label>
        <input 
        type="text" 
        name='text' 
        id='name' 
        placeholder='Digite seu CEP' 
        //required/>
        />
      </div>
      <div className="form-control">
        <label htmlFor="email"></label>
        <input 
        type="email" 
        name='email' 
        id='email' 
        placeholder='Endereço' 
        //required/>
        />
      </div>
      <div className="form-control">
        <label htmlFor="name"></label>
        <input 
        type="name" 
        name='text' 
        id='number' 
        placeholder='Numero' 
        />
      </div>
      <div className="form-control">
        <label htmlFor="date"></label>
        <input 
        type="name" 
        name='text' 
        id='date' 
        placeholder='Bairro' 
        />
      </div>
      <div className="form-control">
        <label htmlFor="name"></label>
        <input 
        type="number" 
        name='text' 
        id='number' 
        placeholder='Cidade' 
        />
      </div>
      <div className="form-control">
        <label htmlFor="name"></label>
        <input 
        type="number" 
        name='text' 
        id='number' 
        placeholder='Estado' 
        />
      </div>
    </div>
  )
}

export default Etapa2
