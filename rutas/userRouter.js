import express from 'express';
import { DataTypes } from "sequelize";

import sequelize from "../loadSequelize.js";

//DEFINICION DEL MODELO
const User = sequelize.define('User', {
    tel: DataTypes.INTEGER,
    username: DataTypes.STRING
}, { tableName: 'users', timestamps: false });



const router = express.Router();

// GET lista de todos los users
// vinculamos la ruta /api/users a la función declarada
// si todo ok devolveremos un objeto tipo:
//     {ok: true, data: [lista_de_objetos_user...]}
// si se produce un error:
//     {ok: false, error: mensaje_de_error}

router.get('/', function (req, res, next) {

    User.findAll()
        .then(users => res.json({
            ok: true,
            data: users
        }))
        .catch(error => res.json({
            ok: false,
            error: error
        }))

});

// GET de un solo user
router.get('/:id', function (req, res, next) {
    User.findOne({ where: { tel: req.params.id } })
        // .then(User => User.get({plain: true}))
        .then(User => res.json({
            ok: true,
            data: User
        }))
        .catch(error => res.json({
            ok: false,
            error: error
        }))

});



// POST, creació d'un nou user
router.post('/', function (req, res, next) {

    User.create(req.body)
        .then((item) => item.save())
        .then((item) => res.json({ ok: true, data: item }))
        .catch((error) => res.json({ ok: false, error }))
});


// put modificació d'un user
router.put('/:id', function (req, res, next) {

    User.findOne({ where: { id: req.params.id } })
        .then((al) =>
            al.update(req.body)
        )
        .then((ret) => res.json({
            ok: true,
            data: ret
        }))
        .catch(error => res.json({
            ok: false,
            error: error
        }));

});



// DELETE elimina l'user id
router.delete('/:id', function (req, res, next) {

    User.destroy({ where: { id: req.params.id } })
        .then((data) => res.json({ ok: true, data }))
        .catch((error) => res.json({ ok: false, error }))

});


export default router;
