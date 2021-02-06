const { check, validationResult } = require('express-validator');

exports.userValidator = [
    check('nome')
        .notEmpty()
        .withMessage('Nome de usuário não pode ser vazio!')
        .bail()
        .isLength({min: 3})
        .withMessage('O nome deve possuir ao menos 3 caracteres!')
        .bail(),
    check('email')
        .isEmail()
        .withMessage('Email informado é inválido!')
        .bail()
        .trim()
        .normalizeEmail(),
    check('senha')
        .isLength({min: 6})
        .withMessage('A senha informada deve possuir ao menos 6 caracteres!')
        .bail(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.status(422).json({erros: errors.array()});
        }
        next();
    },
];



