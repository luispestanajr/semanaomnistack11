import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import './styles.css';
import logoImg from '../../assets/logo.svg';
import api from '../../services/api';

export default function NewIncident() {
  const ongID = localStorage.getItem('ongId');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState(''); 

  const history = useHistory();

  async function handleNewIncident(e){
    e.preventDefault();
    try {
      const data = {
        title,
        description,
        value
      };

      await api.post('incidents', data, {
        headers: {
          authorization: ongID
        }
      })

      history.push('/profile');
    }
    catch {
      alert('Erro ao cadastrar Incidente');
    }
  }

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero" />
          <h1>Cadastrar novo caso</h1>
          <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>

          <Link className="back-link" to="/">
            <FiArrowLeft size={16} alt="Heroes"></FiArrowLeft>
            Voltar para home
          </Link>          
        </section>
        <form onSubmit={handleNewIncident}>
          <input 
            placeholder="Título do caso"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <textarea 
            placeholder="Descrição"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <input 
            placeholder="Valor em Reais"
            value={value}
            onChange={e => setValue(e.target.value)}
          />
          <button className="button" type="submnit">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}