const express = require('express');
const consign = require('consign');
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');

let app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Inclua os utilitários antes das rotas para garantir que estejam disponíveis
consign()
    .include('utils')  // Incluindo utils antes de routes
    .then('routes')
    .into(app);

app.listen(3000, '127.0.0.1', () => {
    console.log('servidor rodando.');
});
