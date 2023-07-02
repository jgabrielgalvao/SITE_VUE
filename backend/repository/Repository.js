const { Usuario, Produto } = require("../model/tabelas");

// LOCALIZAR TODOS USUARIOS E PRODUTOS

async function getAllUsers() {
    let users = await Usuario.findAll();
    return users;
}

async function getAllProducts() {
  let products = await Produto.findAll();
  return products;
}

// LOCALIZAR USUARIO E PRODUTO POR ID

async function getUserById(userId) {
    var user = await Usuario.findByPk(userId);
    return user;
}

async function getProductsById(productsid) {
  var products = await Produto.findByPk(productsid);
  return products;
}

// INSERT DE USUARIOS E PRODUTOS

async function createUser(user) {
    await Usuario.create({
        name: user.name,
        email: user.email,
        password: user.password,
        typeUser: user.typeUser
    });
}

async function createProduct(product) {
  await Produto.create({
      name: product.name,
      desc: product.desc,
      price: product.price,
      picture: product.picture
  });
}

// LOGIN

async function getLogin(email, password){
  const user = await Usuario.findOne({
    where:{
      email: email,
      password: password
    }
  });
  console.log('Email:', email);
  console.log('Password:', password);

  console.log('Usuário encontrado:', user);
  return user;
}

module.exports = { getAllProducts, getProductsById, createProduct, getAllUsers, getUserById, createUser, getLogin };