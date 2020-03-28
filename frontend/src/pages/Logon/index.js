import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';
import './styles.css';
import api from '../../services/api';

import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';
import { useState } from 'react';

export default function Logon(){
  const history = useHistory();
  const [id, setId] = useState('');

  async function handleLogin(event){
    event.preventDefault();

    const data = {
      id
    };

    try{
      const result = await api.post('sessions', data);

      localStorage.setItem('ongId', id);
      localStorage.setItem('ongName', result.data.name);

      history.push('profile');
    }
    catch {
      alert('Falha no login, tente novamente');
    }
  }

  return (
    <div className="logon-container">
      <section className="form">
        <img src={logoImg} alt="Be The Hero" />

        <form onSubmit={handleLogin}>
          <h1>Faça seu logon</h1>

          <input 
            placeholder="Sua ID"
            value={id}
            onChange={e => setId(e.target.value)} />
          <button type="submit" className="button">
            Entrar
          </button>

          <Link className="back-link" to="/register">
            <FiLogIn size={16} alt="Heroes"></FiLogIn>
            Não tenho cadastro
          </Link>
        </form>
      </section>

      <img src={heroesImg} alt="Heroes" />
    </div>
  );
}