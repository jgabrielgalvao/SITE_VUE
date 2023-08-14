const ventoService = require("../service/ventoService");
const path = require('path');
const jwt = require('jsonwebtoken');

function getAllUsers(req, res) {
    let users = ventoService.getAllUsers();
    users.then((result) => res.json(result));
}

function getAllProducts(req, res) {
    let products = ventoService.getAllProducts();
    products.then((result) => res.json(result));
}

///////////////

function getUserById(req, res) {
    let parsedId = parseInt(req.params.id);
    let user = ventoService.getUserById(parsedId);
    user.then((result) => res.json(result));
}

function getProductById(req, res) {
    let parsedId = parseInt(req.params.id);
    let product = ventoService.getProductById(parsedId);
    product.then((result) => res.json(result));
}

//////////////////////////

const getProductPictureById = async (req, res) => {
    let parsedId = parseInt(req.params.id);
    let productPicture = await ventoService.getProductPictureById(parsedId);
    const filePath = path.join('../pictures/', `${productPicture}`);
    res.sendFile(filePath);
    // animalPicture.then((result) => res.json(result));
}

////////////////////////

const createUser = (req, res) => {
    let userRequest = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        typeUser: req.body.typeUser
    };

    ventoService.createUser(userRequest).then((result) => res.json(result));
}

const createProduct = (req, res) => {
    let productRequest = {
        name: req.body.name,
        desc: req.body.desc,
        price: req.body.price,
        picture: req.file.filename,
    };

    ventoService.createProduct(productRequest).then((result) => res.json(result));
}

// LOGIN

const verifyLogin = (req, res) => {

    let email_user =  req.body.email;
    let password_user =  req.body.password;

    const token = jwt.sign({ email: email_user, password: password_user }, 'seuSegredo', { expiresIn: '1d' });
    console.log('Token', token)

    ventoService.verifyLogin(email_user, password_user).then((result) => {
        const responseObj = {
            token: token,
            result: result
        };
        res.status(200).json(responseObj);
    });
}

const getUserDetails = (req, res) => {
    const userDetails = req.user; // O usuário decodificado está disponível no middleware verifyToken
    console.log(userDetails);
    res.status(200).json(userDetails);
};

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    console.log(token);

    if (!token) {
        return res.status(401).json({ message: 'Token não fornecido' });
    }

    jwt.verify(token, 'seuSegredo', (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Token inválido' });
        }
        req.user = decoded;
        next();
    });
}



module.exports = { getAllUsers, getUserById, createUser, getAllProducts, getProductById, getProductPictureById, createProduct, verifyLogin, verifyToken, getUserDetails };