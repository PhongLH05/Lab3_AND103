const express = require("express");

const app = express();

const port = 3000;

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.listen(port, () => {
  console.log(`Example app listening on port`);
});

const COMMOM = require('./COMMOM');

const uri = COMMOM.uri;

const mongoose = require("mongoose");

const carModel = require("./carModel");

const apiMobile = require('./api');

app.use('/api', apiMobile);

app.get("/", async (req, res) => {
  await mongoose.connect(uri);

  let cars = await carModel.find();

  console.log(cars);

  res.send(cars);
});

app.post("/add_xe", async (req, res) => {
  await mongoose.connect(uri);

  let car = req.body;

  let kq = await carModel.create(car);

  console.log(kq);

  let cars = await carModel.find();

  console.log(cars);

  res.send(cars);
});

app.get('/delete_xe/:id', async (req, res) => {
    await mongoose.connect(uri);

    let id = req.params.id;
    console.log(id);

    await carModel.deleteOne({_id:id});

    res.redirect('../');
});

app.put('/update/:ten', async (req, res) => {
    await mongoose.connect(uri);

    let tenXe = req.params.ten;
    console.log(tenXe);

    let tenXeMoi = tenXe + ' phien ban moi';

    await carModel.updateOne({ten:tenXe}, {ten:tenXeMoi});

    let xehois = await carModel.find({});

    res.send(xehois);
});