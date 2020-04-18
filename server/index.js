const express = require('express');
const app = express();

const port = 3000;

app.get('/', (req, res) => {
    fetch('https://www.worldometers.info/coronavirus/country/us/')
        .then(resp => {
            return resp.text();
        })
        .then(text => {
            res.send(text);
        })
        .catch(err => {
            console.log(err.message)
        });
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));