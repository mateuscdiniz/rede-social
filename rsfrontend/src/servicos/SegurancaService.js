const TOKEN = 'token';

const getToken = () => {
  return sessionStorage.getItem(TOKEN);
};

const setToken = (token) => {
  sessionStorage.setItem(TOKEN, token);
};

const isAutenticado = () => {
  return getToken() ? true : false;
};

export default {
  getToken,
  setToken,
  isAutenticado
};