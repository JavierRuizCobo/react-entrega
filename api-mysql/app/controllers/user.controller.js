const db = require("../models");
const User = db.user;
const Role = db.role;
const { Op } = require('sequelize');

exports.allAccess = (req, res) => {
  Role.findAll({
    attributes: ['name']
  })
    .then((roles) => {
      res.status(200).json(roles);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.userBoard = (req, res) => {
  User.findAll({
    attributes: ['id', 'username', 'email'],
    include: [{
      model: Role,
      attributes: ['name'],
      through: { attributes: [] },
      where: {
        name: 'user'
      }
    }]
  })
    .then(users => {
      const formattedUsers = users.map(user => ({
        id: user.id,
        username: user.username,
        email: user.email,
        roles: user.roles.map(role => role.name)
      }));
  
      res.status(200).json(formattedUsers);
    })
    .catch(err => {
      res.status(500).json({ message: err.message });
    });

};

exports.adminBoard = (req, res) => {

  User.findAll({
    attributes: ['id', 'username', 'email', 'createdAt'],
    include: [{
      model: Role,
      attributes: ['name'],
      through: { attributes: [] } 
    }]
  })
  .then(users => {

    const formattedUsers = users.map(user => ({
      id: user.id,
      username: user.username,
      email: user.email,
      createdAt : user.createdAt,
      roles: user.roles.map(role => role.name)
    }));

    res.status(200).json(formattedUsers);
  })
  .catch(err => {
    res.status(500).json({ message: err.message });
  });
};

exports.moderatorBoard = (req, res) => {

  User.findAll({
    attributes: ['id', 'username', 'email'],
    include: [{
      model: Role,
      attributes: ['name'],
      through: { attributes: [] },
      where: {
        name: {
          [Op.or]: ['user', 'moderator']
        }
      }
    }]
  })
    .then(users => {
      const formattedUsers = users.map(user => ({
        id: user.id,
        username: user.username,
        email: user.email,
        roles: user.roles.map(role => role.name)
      }));
  
      res.status(200).json(formattedUsers);
    })
    .catch(err => {
      res.status(500).json({ message: err.message });
    });

};

exports.checkRole = (req, res) => {

  User.findByPk(req.userId, { 
    attributes: ['id', 'username', 'email']
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: 'User not found.' });
      }
      
      if(user.getRoles() != null){
        user.getRoles().then(roles => {
          const filePath = getRouteBasedOnRole(roles);
          
          res.redirect(filePath);
        });
      }
      
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
      res.redirect('/')
    });
};

function getRouteBasedOnRole(roles) {
  
  const roleName = roles[0].dataValues.name;

  switch (roleName) {
    case 'admin':
      return '/admin';
    case 'moderator':
      return '/moderator';
    default:
      return '/user';
  }
}