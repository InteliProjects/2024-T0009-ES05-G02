const User = require('../models/User.js');
const Ong = require('../models/Ong.js');

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({ include: Ong });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar usuários.' });
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'Usuário não encontrado.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar usuário.' });
  }
};

const getUserByIdAndOng = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id, { include: Ong });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'Usuário não encontrado.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar usuário.' });
  }
};

const createUser = async (req, res) => {
  const { email, password, role, gender, ong_id, name } = req.body;

  try {
    const newUser = await User.create({ email, password, role, gender, ong_id, name });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar usuário.' });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { email, password, role, gender, ong_id, name } = req.body;

  try {
    const user = await User.findByPk(id);
    if (user) {
      await user.update({ email, password, role, gender, ong_id, name });
      res.json(user);
    } else {
      res.status(404).json({ error: 'Usuário não encontrado.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar usuário.' });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);
    if (user) {
      await user.destroy();
      res.json({ message: 'Usuário excluído com sucesso.' });
    } else {
      res.status(404).json({ error: 'Usuário não encontrado.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir usuário.' });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUserByIdAndOng,
};
