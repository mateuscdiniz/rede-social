import api from '../backend';
import SegurancaService from './SegurancaService';

const login = async (formLogin) => {
  const {data} = await api.post('/login', formLogin);

  if (data.erro) {
    throw data.erro;
  } else {
    SegurancaService.setToken(data.token);
  }
};

const logout = () => {
  SegurancaService.setToken(null);
};

const getPostagens = async () => {
  const {data} = await api.get('/postagens');
  return data;
};

const criarPostagem = async (formPostagem) => {
  await api.post('/postagens', formPostagem);
};

const excluirPostagem = async (postagem) => {
  await api.delete(`/postagens/${postagem._id}`);
};

export default {
  login,
  logout,
  getPostagens,
  criarPostagem,
  excluirPostagem
};