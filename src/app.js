const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/', (req, res) => {
    res.status(200).json({message: 'Hello Word!'})
})

app.listen(process.env.PORT, () => {
    console.log(`App executando em http://localhost:${process.env.PORT}`)
})