const { check, validationResult } = require('express-validator');
let NeDB = require('nedb');
let db = new NeDB({
    filename: 'users.db',
    autoload: true
});

module.exports = (app) => {

    let route = app.route('/users');

    // Rota GET
    route.get((req, res) => {
        db.find({}).sort({ name: 1 }).exec((err, users) => {
            if (err) {
                app.utils.error.send(err, req, res);
            } else {
                res.status(200).json({ users });
            }
        });
    });

    // Rota POST com validação
   route.post(app.utils.validator.user, (req, res) => {
      db.insert(req.body, (err, user) => {
          if (err) {
              app.utils.error.send(err, req, res);
          } else {
              res.status(200).json(user);
          }
      });
   });

    let routeId = app.route('/users/:id');

    // Rota GET por ID
    routeId.get((req, res) => {
        db.findOne({ _id: req.params.id }).exec((err, user) => {
            if (err) {
                app.utils.error.send(err, req, res);
            } else {
                res.status(200).json(user);
            }
        });
    });

    // Rota PUT (atualização de usuário)
    routeId.put((req, res) => {

      if (app.utils.validator.user(app, req, res)) return false;

        db.update({ _id: req.params.id }, req.body, err => {
            if (err) {
                app.utils.error.send(err, req, res);
            } else {
                res.status(200).json(Object.assign(req.params, req.body));
            }
        });
    });

    // Rota DELETE (remover usuário)
    routeId.delete((req, res) => {
        db.remove({ _id: req.params.id }, {}, err => {
            if (err) {
                app.utils.error.send(err, req, res);
            } else {
                res.status(200).json(req.params);
            }
        });
    });
};
