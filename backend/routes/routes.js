const express = require("express");

// Controllers
const ventoController = require("../controller/ventoController");

// Handlers
const router = express.Router();

// multer file
const multer = require("multer");
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const storage = multer.diskStorage({
    destination: 'pictures/',
    filename: function (req, file, cb) {
        const ext = file.originalname.split('.').pop();
        const filename = `${uuidv4()}.${ext}`;
        cb(null, filename);
    }
});

const upload = multer({ storage: storage });

// Animals
router.get("/produto", ventoController.getAllProducts);
router.get("/produto/:id", ventoController.getProductById);
router.get("/picture/:id", ventoController.getProductPictureById);
router.get("/usuario/:id", ventoController.getUserById);
router.post("/verificalogin", ventoController.verifyLogin);
router.get("/user", ventoController.verifyToken, ventoController.getUserById);
router.post("/produto", upload.single('picture'), ventoController.createProduct);
router.post("/usuario", ventoController.createUser);

module.exports = router;