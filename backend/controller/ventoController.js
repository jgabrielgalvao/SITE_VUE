const ventoService = require("../service/ventoService");
const path = require('path');
const jwt = require('jsonwebtoken');
const { decode } = require("punycode");
const chavePrivada = "seuSegredo";

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

    let email_user = req.body.email;
    let password_user = req.body.password;

    ventoService.verifyLogin(email_user, password_user).then((result) => {

        let dadosUsuario = {
            email: email_user,
            password: password_user
        }
        console.log('-------------------------------');
        console.log("Dados usuário\n", dadosUsuario);
        console.log('Chave privada: ', chavePrivada);
        console.log('-------------------------------');

        jwt.sign(dadosUsuario, chavePrivada, (err, token) => {
            if (err) {
                res
                    .status(500)
                    .json({ mensagem: "Erro ao gerar o JWT" });

                return;
            }
            const responseObj = {
                token: token,
                result: result
            };

            console.log('---------------------------------');
            console.log('Token no controller \n', token);
            console.log('');
            console.log('Result', result);
            console.log('---------------------------------');

            res.set("Authorization",`Bearer ${token}`);
            res.json(responseObj)
            res.end();

        });
    })
}

const verifyToken = (req, res, next) => {

    const token = req.headers.authorization;

    console.log('-------------------------------------')
    console.log('verifyToken');
    console.log('');
    console.log('-------------------------------------')
    console.log('tokenb do vericiador de token\n', token);
    console.log('-------------------------------------')

    if (!token) {
        return res.status(401).json({ message: 'Token não fornecido' });
    }
    else {
        console.log('tenta aqui')
        jwt.verify(token, chavePrivada, (err, decoded) => {
            console.log('começou')

            if (err) {
                console.log('deu erro\n', err);
                return res.status(403).json({ message: 'Token inválido' });
            }
            console.log('-------------------------------------')
            console.log('token valido se liga', decoded)
            console.log('-------------------------------------')

            req.userId = decoded.id;
            next();
        });
    }
}

// const user = (req, res) => {
//     const jwt = req.headers["authorization"];
//     const chavePrivada = "seuSegredo";

//     const jwtService = require("jsonwebtoken");
//     jwtService.verify(jwt, chavePrivada, (err, userInfo) => {
//         if (err) {
//             res.status(403).end();
//             return;
//         }

//         res.json(userInfo);
//     });
// }


module.exports = { getAllUsers, getUserById, createUser, getAllProducts, getProductById, getProductPictureById, createProduct, verifyLogin, verifyToken };