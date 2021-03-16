const express = require('express');
const router = express.Router();
const Postagem = require('../models/postagem');
const Seguranca = require('../services/seguranca-service');

router.get('/', async (req, res) => {
  res.json(await Postagem.find());
});

router.get('/:id', findPorId, async (req, res) => {
  res.json(req.postagem);
});

router.post('/', Seguranca.isAutenticado, async (req, res) => {
  try {
    let postagem = new Postagem(req.body);
    postagem.autor = req.usuario; // o autor é o usuário logado

    postagem = await postagem.save();
    res.status(201).json(postagem);
  } catch (e) {
    res.status(500).json(e);
  }
});

router.delete('/:id', Seguranca.isAutenticado, findPorId, isAutor, async (req, res) => {
  await req.postagem.remove();
});

router.put('/:id', Seguranca.isAutenticado, findPorId, isAutor, async (req, res) => {
  await req.postagem.set(req.body).save();
});

// função de middleware para recuperar uma postagem pelo id
async function findPorId(req, res, next) {
  try {
    req.postagem = await Postagem.findById(req.params.id);
    
    if (req.postagem === null) {
      return res.status(404).json({ 
        message: 'Nao foi possivel encontrar uma postagem com o id informado'
      });
    }
  } catch(err) {
    return res.status(500).json({ message: err.message });
  }

  next();
};

function isAutor(req, res, next) {
  if (req.postagem.autor._id !== req.usuario._id) {
    return res.status(404).json({ 
      message: 'Você não é o autor da postagem e, portanto, não pode alterá-la'
    });
  }
  
  next();
};

module.exports = router;
