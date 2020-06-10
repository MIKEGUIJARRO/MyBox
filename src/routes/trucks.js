const express = require('express');
const router = express.Router();

//Database connection
const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

router.get('/', isLoggedIn, async (req, res) => {
    const trucks = await pool.query('SELECT * FROM Trucks');
    res.render('trucks/list', { trucks: trucks });
});

router.get('/add', isLoggedIn, (req, res) => {
    res.render('trucks/add');
});

router.post('/add', isLoggedIn, async (req, res) => {
    const { plate, model, type, tire_size } = req.body;
    const newTruck = {
        plate,
        model,
        type,
        tire_size,
    };
    await pool.query('INSERT INTO Trucks set ?', [newTruck]);
    req.flash('success', 'Truck added successfuly');

    res.redirect('/trucks');
});

router.get('/edit/:plate', isLoggedIn, async (req, res) => {
    const { plate } = req.params;
    const truck = await pool.query('SELECT * FROM Trucks WHERE plate = ?', [plate]);
    res.render('trucks/edit', { truck: truck[0] });
});

router.post('/edit/:oldPlate', isLoggedIn, async (req, res) => {
    const { oldPlate } = req.params;
    const { plate, model, type, tire_size } = req.body;
    const updatedTruck = {
        plate,
        model,
        type,
        tire_size
    };

    await pool.query('UPDATE Trucks set ? WHERE plate = ?', [updatedTruck, oldPlate]);
    req.flash('success', 'Truck edited successfully');
    res.redirect('/trucks')
});

router.get('/delete/:plate', isLoggedIn, async (req, res) => {
    const { plate } = req.params;

    await pool.query('DELETE FROM Trucks WHERE plate = ?', [plate]);
    req.flash('success', 'Truck removed successfuly');
    res.redirect('/trucks');
});

module.exports = router;