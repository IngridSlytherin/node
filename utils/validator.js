const { check, validationResult } = require('express-validator');

module.exports = {

    user: [
        check('name', 'O nome é obrigatório.').notEmpty(),
        check('email', 'O email está inválido.').notEmpty().isEmail(),

        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                // Enviando os erros diretamente, sem depender do `app`
                return res.status(400).json({
                    error: errors.array()
                });
            }
            next(); // Continua para a próxima função se não houver erros
        }
    ]
};
