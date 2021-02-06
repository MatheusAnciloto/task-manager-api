const { check, validationResult } = require('express-validator');

exports.taskValidator = [
    check('title')
        .notEmpty()
        .withMessage('Título da tarefa não pode ser vazio!')
        .bail(),
    check('description')
        .isLength({min: 10})
        .withMessage('Descrição deve possuir ao menos 10 caracteres!')
        .bail(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.status(422).json({erros: errors.array()});
        }
        next();
    },
];



