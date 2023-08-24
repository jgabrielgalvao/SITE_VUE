const ventoService = require("../service/ventoService");
const path = require('path');
const jwt = require('jsonwebtoken');
const { decode } = require("punycode");
const chavePrivada = "seuSegredo";

let cacheUser = 0;

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

const verifyLogin = async (req, res) => {

    let email_user = req.body.email;

    let password_user = req.body.password;

    ventoService.verifyLogin(email_user, password_user).then((result) => {

        cacheUser = parseInt(result.id);

        let dadosUsuario = {
            email: email_user,
            password: password_user
        }

        jwt.sign(dadosUsuario, chavePrivada, (err, token) => {

            if (err) {
                return res.status(500).json({ mensagem: "Erro ao gerar o JWT" });
            }

            res.set("Authorization", `Bearer ${token}`);

            const responseObj = {
                token: token,
                result: result,
            };

            res.json(responseObj);

        });

        //estou com mais e mais erros, agora não consigo pegar as informações do bendito
    })
}

const verifyToken = (req, res) => {

    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'Token não fornecido' });
    }
    else {

        jwt.verify(token, chavePrivada, async (err, decoded) => {

            if (err) {
                console.log('deu erro: ', err);
                
                return res.status(403).json({ message: 'Token inválido' });
            }

            const objClient = await ventoService.getUserById(cacheUser);

            res.status(200).json({ ...decoded, objClient }); //tenho que mandar essa informação de alguma forma
        });
    }
}


module.exports = { getAllUsers, getUserById, createUser, getAllProducts, getProductById, getProductPictureById, createProduct, verifyLogin, verifyToken };