const db = require("../models");
const User = db.user;
const Role = db.role;

exports.allAccess = async (req, res) => {
  try {
    const roles = await Role.find({}, { name: 1 });

    res.status(200).json(roles);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.userBoard = async (req, res) => {
  try {
    const userRoleId = await Role.findOne({ name: 'user' }).select('_id');
  
    if (!userRoleId) {
      return res.status(404).json({ message: 'Role "user" not found.' });
    }
  
    const users = await User.find({ roles: userRoleId })
      .select('id username email roles').populate('roles', 'name');
  
    const formattedUsers = users.map(user => ({
      id: user.id,
      username: user.username,
      email: user.email,
      roles: user.roles.map(role => role.name)
    }));
  
    res.status(200).json(formattedUsers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.adminBoard = async (req, res) => {
  try {
    const users = await User.find({})
      .select('id username email createdAt roles').populate('roles', 'name');

    const formattedUsers = users.map(user => ({
      id: user.id,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
      roles: user.roles.map(role => role.name)
    }));

    res.status(200).json(formattedUsers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.moderatorBoard = async (req, res) => {
  try {
    // Obtén los ObjectIds de los roles 'user' y 'moderator'
    const userRole = await Role.findOne({ name: 'user' }).select('_id');
    const moderatorRole = await Role.findOne({ name: 'moderator' }).select('_id');
  
    if (!userRole || !moderatorRole) {
      return res.status(404).json({ message: 'Roles not found.' });
    }
  
    // Busca usuarios que tienen roles 'user' o 'moderator'
    const users = await User.find({ roles: { $in: [userRole, moderatorRole] } })
      .select('id username email roles')
      .populate('roles', 'name');
  
    const formattedUsers = users.map(user => ({
      id: user.id,
      username: user.username,
      email: user.email,
      roles: user.roles.map(role => role.name)
    }));
  
    res.status(200).json(formattedUsers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
  
};

exports.checkRole = async (req, res) => {
  try {
    const user = await User.findById(req.userId)
      .select('id username email').populate('roles');

    if (!user) {
      return res.status(404).send({ message: 'User not found.' });
    }

    const roles = await user.roles;
    console.log(roles);

    if (roles != null) {
      const filePath = getRouteBasedOnRole(roles);

      console.log(filePath);

      res.status(200).redirect(filePath);
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
    res.redirect('/');
  }
};

function getRouteBasedOnRole(roles) {
  const roleName = roles[0].name;

  switch (roleName) {
    case 'admin':
      return '/admin';
    case 'moderator':
      return '/moderator';
    default:
      return '/user';
  }
}
