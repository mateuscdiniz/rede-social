import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import BackendService from '../servicos/BackendService';

const criaFormEmBranco = () => {
  return {
    titulo: '',
    texto: ''
  };
};

function NovaPostagem() {
  const [form, setForm] = useState(criaFormEmBranco());
  const history = useHistory();

  const setValor = (evento, campo) => {
    setForm({...form, [campo]: evento.target.value});
  };

  const submeter = async (evento) => {
    evento.preventDefault();
    let dadosForm = {...form};
    setForm(criaFormEmBranco());
    await BackendService.criarPostagem(dadosForm);
    history.push('/postagens');
  };

  return (
    <form onSubmit={(e) => submeter(e)}>
      <fieldset>
        <legend>Criar Postagem</legend>
        <div>
          <label>Título:</label>
          <input type="text" name="titulo" value={form.titulo} onChange={(e) => setValor(e, 'titulo')}/>
        </div>
        <div>
          <label>Texto:</label>
          <textarea value={form.texto} name="texto" onChange={(e) => setValor(e, 'texto')}></textarea>
        </div>
        <div>
          <input type="submit" value="Enviar"/>
        </div>
      </fieldset>
    </form>
  );
}

export default NovaPostagem;
