const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors')

connectToMongo();
const app = express()
const port = 5000     // const port = 3000 => for REACT App

app.use(cors())
app.use(express.json())

//Available routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

// app.get('/', (req, res) => {
//   res.send('Hello Atif\'s World!')
// })

app.listen(port, () => {
  console.log(`iNoteBook Backend listening at http://localhost:${port}`)
})

