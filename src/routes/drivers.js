const express = require('express');
const router = express.Router();

//Database connection
const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

router.get('/', isLoggedIn, async (req, res) => {
    const drivers = await pool.query(
        'SELECT drib.*, st.name AS state FROM Drivers drib INNER JOIN States st ON drib.state_id_residence = st.id'
    );
    res.render('drivers/list', { drivers: drivers });
});

router.get('/add', isLoggedIn, async (req, res) => {
    const states = await pool.query('SELECT * FROM States');
    res.render('drivers/add', { states: states });
});

router.post('/add', isLoggedIn, async (req, res) => {
    const {
        identification,
        first_name,
        last_name1,
        last_name2,
        phone,
        address,
        salary,
        state_id_residence } = req.body;

    const newDriver = {
        identification,
        first_name,
        last_name1,
        last_name2,
        phone,
        address,
        salary,
        state_id_residence
    };
    await pool.query('INSERT INTO Drivers set ?', [newDriver]);
    req.flash('success', 'Driver added successfuly');
    res.redirect('/drivers');
});

router.get('/edit/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const drivers = await pool.query('SELECT * FROM Drivers WHERE id = ?', [id]);
    const states = await pool.query('SELECT * FROM States');
    //console.log(drivers[0]);
    res.render('drivers/edit', { driver: drivers[0], states: states });
});

router.post('/edit/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const {
        identification,
        first_name,
        last_name1,
        last_name2,
        phone,
        address,
        salary,
        state_id_residence } = req.body;

    const updatedDriver = {
        identification,
        first_name,
        last_name1,
        last_name2,
        phone,
        address,
        salary,
        state_id_residence
    };
    await pool.query('UPDATE Drivers set ? WHERE id = ?', [updatedDriver, id]);
    req.flash('success', 'Drivers edited successfully');
    res.redirect('/drivers')
});

router.get('/delete/:id', isLoggedIn, async (req, res) => {
    //console.log('REQ PARAMS');
    //console.log(req.params);
    const { id } = req.params;

    await pool.query('DELETE FROM Drivers WHERE id = ?', [id]);
    req.flash('success', 'Driver removed successfuly');
    res.redirect('/drivers');
});

module.exports = router;