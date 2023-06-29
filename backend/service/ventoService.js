const repository = require("../repository/Repository");

// localizar todos os usuarios e produtos

async function getAllUsers() {
    try {
        let users = await repository.getAllUsers();
        return users;
    } catch (error) {
        console.log(error);
    }
}

async function getAllProducts() {
    try {
        let products = await repository.getAllProducts();
        return products;
    } catch (error) {
        console.log(error);
    }
}

// localizar usuarios e produtos por id

async function getUserById(userId) {
    try {
        let user = await repository.getUserById(userId);
        return user;
    } catch (error) {
        console.log(error);
    }
}

async function getProductById(productId) {
    try {
        let product = await repository.getProductsById(productId);
        return product;
    } catch (error) {
        console.log(error);
    }
}

// localizar imagem do produto pelo id
async function getProductPictureById(productId) {
    try {
        var product = await repository.getProductsById(productId);
        return product.picture;
    } catch (error) {
        console.error(error);
    }
}

// inserts into

async function createUser(user) {
    try {
        await repository.createUser(user);
    } catch (error) {
        console.log(error);
    }
}

async function createProduct(product) {
    try {
        await repository.createProduct(product);
    } catch (error) {
        console.log(error);
    }
}

// LOGIN

async function verifyLogin(email, password) {

    try {
        await repository.getLogin(email, password);
    } catch (error) {
        console.log('aqui que deu pau otartio',email, error);
    }
}

module.exports = { getAllProducts, getProductById, getProductPictureById, createProduct , getAllUsers, getUserById, createUser, verifyLogin};