const ventoService = require("../service/ventoService");
const path = require('path');
const jwt = require('jsonwebtoken');
const { decode } = require("punycode");
const chavePrivada = "seuSegredo";

let cacheEmail = null;

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

///////////////////////////

async function getUserByEmail(req, res) {
    if (!cacheEmail) {
        return res.status(400).json({ message: 'E-mail não encontrado no cache' });
    }

    try {
        let user = await ventoService.getUserByEmail(cacheEmail);
        console.log('localizado\n', user.id,'\n', user.name, '\n', user.email, '\n', user.typeUser);
        res.json(user);
    } catch (error) {
        console.error('Erro ao obter usuário pelo e-mail:', error);
        res.status(500).json({ message: 'Erro ao obter usuário pelo e-mail' });
    }
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
    cacheEmail = req.body.email;

    usuario = await ventoService.getUserByEmail(JSON.stringify(cacheEmail));

    console.log('Nome: ', usuario.name, '\nTipo Usuario: ', usuario.typeUser);

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
                return res.status(500).json({ mensagem: "Erro ao gerar o JWT" });
            }

            console.log('---------------------------------');
            console.log('Token no controller \n', token);
            console.log('');
            console.log('Result', result);
            console.log('---------------------------------');

            res.set("Authorization", `Bearer ${token}`);

            const responseObj = {
                token: token,
                result: result,
            };
            console.log('email aqui vacilao', cacheEmail);
            res.json(responseObj);

        });

        //estou com mais e mais erros, agora não consigo pegar as informações do bendito
    })
}

const verifyToken = (req, res, next) => {

    const token = req.headers.authorization;

    console.log('verifyToken');
    console.log('-------------------------------------')
    console.log('token do verificador de token: ', token);
    console.log('-------------------------------------')

    if (!token) {
        return res.status(401).json({ message: 'Token não fornecido' });
    }
    else {
        console.log('entrou no else');

        jwt.verify(token, chavePrivada, (err, decoded) => {

            console.log('começou o verify');

            if (err) {
                console.log('deu erro: ', err);
                console.error('token "invalido":', token)
                return res.status(403).json({ message: 'Token inválido' });
            }
            console.log('-------------------------------------')
            console.log('token valido se liga', decoded)
            console.log('-------------------------------------')


            res.json(decoded); //tenho que mandar essa informação de alguma forma
        });
    }
}


module.exports = { getAllUsers, getUserById, createUser, getAllProducts, getProductById, getProductPictureById, createProduct, verifyLogin, verifyToken, getUserByEmail };