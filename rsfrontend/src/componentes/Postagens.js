import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BackendService from '../servicos/BackendService';
import SegurancaService from '../servicos/SegurancaService';

function Postagens() {
  const [postagens, setPostagens] = useState([]);

  useEffect(() => {
    (async () => {
      setPostagens(await BackendService.getPostagens());
    })();
  }, []);

  const renderPostagem = (postagem) => {
    return (
      <div className="postagem" key={postagem._id}>
        <h3>{postagem.titulo}</h3>
        <p>{postagem.texto}</p>
        <hr/>
      </div>
    );
  };

  return (
    <>
      <Link to="/postagens/nova">Criar Postagem</Link> &nbsp;|&nbsp;
      <Link to="/login">Login</Link> &nbsp;|&nbsp;
      <div className="postagens">
        <h1>{postagens.map(renderPostagem)}</h1>
      </div>
    </>
  );
}

export default Postagens;
