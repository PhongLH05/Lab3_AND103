const express = require('express');

const rounter = express.Router();

module.exports = rounter;

const mongoose = require("mongoose");

const carModel = require("./carModel");

const COMMON = require('./COMMOM');

rounter.get('/', (req, res) => {
    res.send('Vao api mobile');
});

rounter.get('/list', async (req, res) => {
    await mongoose.connect(COMMON.uri);

  let cars = await carModel.find();

  console.log(cars);

  res.send(cars);
});

const bodyParser = require('body-parser');
rounter.use(bodyParser.json());
rounter.use(bodyParser.urlencoded({extended: true}));

rounter.post('/add_xe', async(req, res) => {
    await mongoose.connect(COMMON.uri);

  let car = req.body;

  let kq = await carModel.create(car);

  console.log(kq);

  let cars = await carModel.find();

  console.log(cars);

  res.send(cars);
})