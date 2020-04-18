const config = require('./config.json');
const fetch = require('node-fetch');
const { parse } = require('node-html-parser');

// April 18 2020: This only gets the array of states
// format: 
// {
//      state: string,
//      total_cases: int,
//      total_death: int
// }
function _getData(text) {
    const root = parse(text);
    const children = root.querySelector('#usa_table_countries_today tbody').childNodes;
    const rows = children.filter(node => node.tagName === 'tr');
    const result = [];
    rows.forEach((row, i) => {
        if (i !== 0) {
            const tds = row.childNodes.filter(node => node.tagName === 'td');
            result.push({
                state: tds[0].text.trim(),
                total_cases: tds[1].text.trim(),
                total_death: tds[3].text.trim()
            })
        }
    }); 
    return result;
}

function getData() {
    return new Promise((acc, rej) => {
        fetch(config.data_url)
            .then(resp => {
                return resp.text();
            })
            .then(text => {
                acc(_getData(text));
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