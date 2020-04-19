const express = require('express');
const server = require('./server');
const cors = require('cors');
const app = express();

const port = 3001;

app.use(cors());
app.get('/', (req, res) => {
    server.getData()
        .then(text => {
            res.send(text);
        })
        .catch(err => {
            console.log(err.message)
        });
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));