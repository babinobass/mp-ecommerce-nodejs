require('dotenv').config();
var express = require('express');
var exphbs = require('express-handlebars');
const { data } = require('./utils/mock')
const mercadopago = require('mercadopago');

mercadopago.configure({
  access_token: process.env.MERCADO_PAGO_TOKEN,
  integrator_id: process.env.IID
});


var port = process.env.PORT || 3001
const host = process.env.HOST || "http://localhost:3001/"

var app = express();


app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.static('assets'));

app.use('/assets', express.static(__dirname + '/assets'));

app.get('/', function (req, res) {
  res.render('home');
});

app.get('/detail', function (req, res) {
  let pref = data(req.query, host)
  mercadopago.preferences.create(pref)
    .then(function (response) {
      req.query.preferenceId = response.body.id;
      console.log(response.body)
      res.render("detail", req.query);
    }).catch(function (error) {
      console.log(error);
    });
});

app.get("/ipn", function (req, res) {
  console.log(req);
  console.log(res);
  res.send("Received IPN");
});

app.get("/success", function (req, res) {
  console.log(req);
  res.json("success");
});

app.get("/pending", function (req, res) {
  res.json("pending");
});

app.get("/failure", function (req, res) {
  console.log(req);
  res.json("failure");
});

app.post("/pay", function (req, res) {
  console.log(req.body);
  console.log(req.query);

  const payment_id = req.body.payment_id;
  const merchant_order_id = req.body.merchant_order_id;
  const status = req.body.payment_status;

  switch (status) {
    case "approved":
      res.render("success", {
        payment_id: payment_id,
        merchant_order_id: merchant_order_id
      });
      break;
    case "pending":
      res.render("success", {
        payment_id: payment_id,
        merchant_order_id: merchant_order_id
      });
      break;
    case "error":
      res.render("success", {
        payment_id: payment_id,
        merchant_order_id: merchant_order_id
      });
      break;
    default:
      res.status(404).json({ error: "Faltan los parametros de POST" });
      break;
  }
});

app.listen(port);