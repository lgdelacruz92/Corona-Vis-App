const express = require('express');
const server = require('./server');
const app = express();

const port = 3000;

app.get('/', (req, res) => {
    server.getData()
        .then(text => {
            res.send({
                data: text});
        })
        .catch(err => {
            console.log(err.message)
        });
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));