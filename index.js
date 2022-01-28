const express = require('express')
const userDataRouter = require('./routers/subtask1')
const userNameRouter = require('./routers/subtask2')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(userDataRouter)
app.use(userNameRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port);
}) 