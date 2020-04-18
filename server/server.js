const config = require('./config.json');
const fetch = require('node-fetch');
const { parse } = require('node-html-parser');

function getData(querySelector) {
    return new Promise((acc, rej) => {
        fetch(config.data_url)
            .then(resp => {
                return resp.text();
            })
            .then(text => {
                const root = parse(text);
                acc(root.querySelector('#usa_table_countries_today'));
            })
            .catch(err => {
                rej(err);
            })
        }
    );
}

module.exports = {
    getData   
};