const EmailService = require('./email-service');

const TEMPO_TOKEN = parseInt(process.env.TEMPO_TOKEN_VALIDACAO_EXPIRA);

const enviaEmailValidacao = (usuario) => {
  EmailService.enviar({
    para: usuario.email,
    assunto: 'Validação do Cadastro',
    html: `
    <html>
      <body>
        <h3>Valide seu e-mail</h3>
        <p>Para completar o seu cadastro é necessário clicar
           <a href="http://localhost:5000/usuarios/validar/${usuario._id}/${usuario.token_validacao}">AQUI</a>.
        </p>
      </body>
    </html>
    `
  });
};

const validaTokenCadastro = (usuario, token) => {
  if (usuario.token_validacao === token) {
    if (usuario.data_geracao_token + TEMPO_TOKEN > Date.now()) {
      throw 'O token de expirou. Uma nova mensagem foi enviada para seu email.';
    }
  } else {
    throw 'Token inválido.';
  }
};

module.exports = {
  enviaEmailValidacao,
  validaTokenCadastro
};