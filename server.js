const express = require('express')
const app = express()

const port = 13000


app.get('*', (req, res) => {
  console.log(req.url)
   res.sendFile(__dirname + req.url)
   //res.render("./index")
})


app.listen(port, () => {
  console.log(`Example app listening at https://localhost:${port}`)
})