var express = require('express');
var router = express.Router();

/* GET users listing. */

module.exports = function (pool) {


  router.get('/', function (req, res, next) {
    pool.query(`SELECT * FROM bread`, (err, resp) => {
      if (err) return res.status(500).json({ message: "terjadi kesalahan di router.post" });
      res.json(resp.rows)
    })
  });

  // add data
  router.get('/add', function (req, res, next) {
    res.render('add')
  });
  router.post('/', function (req, res, next) {
    pool.query('INSERT INTO bread ( string, integer, float, date, boolean) VALUES ($1, $2, $3, $4, $5)', [req.body.string, Number(req.body.integer), Number(req.body.float), req.body.date, req.body.boolean], (err, resp) => {
      if (err) return res.status(500).json({ message: "terjadi kesalahan di router.post" });
      res.redirect('/')
    })
  });

  // edit data
  router.get('/edit/:id', function (req, res, next) {
    pool.query('SELECT * FROM bread WHERE id=$1', [Number(req.params.id)], (err, item) => {
      if (err) return res.status(500).json({ message: "terjadi kesalahan di router.get" });
    res.render('edit', {item : item.rows[0]})
    })
  });
  router.post('/edit/:id', function (req, res, next) {
    pool.query('UPDATE bread SET string=$1, integer=$2, float=$3, date=$4, boolean=$5 WHERE id=$6', [req.body.string, Number(req.body.integer), Number(req.body.float), req.body.date, req.body.boolean, Number(req.params.id)], (err, resp) => {
      if (err) return res.status(500).json({ message: "terjadi kesalahan di router.put" });
      res.redirect('/')
    })
  });

  router.delete('/:id', function (req, res, next) {
    pool.query('DELETE FROM bread WHERE id=$1', [Number(req.params.id)], (err, resp) => {
      if (err) return res.status(500).json({ message: "terjadi kesalahan di router.delete" });
      res.redirect('/')
    })
  });


  return router;
}