const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000

const userModel = require("./models/user.model")

app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.get('/users', async (req, res) => {
    const list = await userModel.all()
    res.send(list)
  })

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})