const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());
app.use(cors());

app.get('', (req, res) => {
  res.send("\nHello there!\n")
})


app.use(function (req, res) {
  res.render('404', { layout: false });
})

const PORT = process.env.PORT || 5000

app.listen( PORT, function () {
  console.log(`Server running at port `+PORT);
})