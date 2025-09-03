const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.get('/home', (req, res) => {
  res.send('This is the Home Page')
})
app.get('/contactus', (req, res) => {
  res.send("Contact us at contact@contact.com")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})