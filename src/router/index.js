const express = require('express');
const { connection } = require('../mysql/mysql');
const router = express.Router();
const fs = require('fs');
const upload = require('../multer/multer');


router.get('/heroes', (req, res) => {
    // connection.query('SELECT * FROM heroes', function(error, results, fields) {
    //     if (error) return console.log(error);
    //     console.log(results.length)
    //     console.log(results)
    //     res.render('index', { data: results });
    // });
    res.render('index');
});


router.get('/heroesAJAX', (req, res) => {
    connection.query('SELECT * FROM heroes', function(error, results, fields) {
        if (error) return console.log(error);
        res.json({ data: results });
    });
});

// router.post('/add', (req, res) => {
//     let subir = upload.single('image');
//     subir(req, res, (err) => {
//         if (err) return console.log(err);
//         let { nombre, poder, edad } = req.body;
//         let image = req.file;
//         let path = image.path;
//         connection.query('INSERT INTO heroes(nombre,poder,edad,image) values (?,?,?,?)', [nombre, poder, edad, path], (err, resp) => {
//             if (err) return console.log(err);
//             console.log(resp);
//             res.redirect('/heroes');
//         });
//     });

// });

router.post('/agregar', (req, res) => {
    let subir = upload.single('image');
    subir(req, res, (err) => {
        if (err) return console.log(err);
        let { nombre, poder, edad } = req.body;
        let image = req.file;
        let path = image.path;
        connection.query('INSERT INTO heroes(nombre,poder,edad,image) values (?,?,?,?)', [nombre, poder, edad, path], (err, guardado) => {
            if (err) return console.log(err);
            let { insertId: id } = guardado;
            console.log(id);
            connection.query(`SELECT * FROM heroes WHERE id = ${id}`, (err, resp) => {
                if (err) return console.log(err);
                res.json({ resp });
            });
        });
    });

});


router.get('/delete/:id', (req, res) => {
    let id = req.params.id;
    connection.query('DELETE FROM heroes WHERE id = ?', id, (err, resp) => {
        if (err) return console.log(err);
        res.redirect('/heroes');
    });
});


router.get('/editar/:id', (req, res) => {
    let id = req.params.id;
    connection.query(`SELECT * FROM heroes WHERE id = ${id}`, (err, resp) => {
        if (err) return console.log(err);
        res.render('editar', { data: resp[0] });
    });
});

router.post('/editar/:id', (req, res) => {
    let id = req.params.id;
    let body = req.body;
    let nombre = body.nombre;
    let poder = body.poder;
    let edad = body.edad;
    let sql = `UPDATE heroes set nombre='${nombre}', poder='${poder}', edad=${edad} where id=${id}`;
    connection.query(sql, (err, resp) => {
        if (err) return console.log(err);
        res.redirect('/heroes');
    });
});

module.exports = router;