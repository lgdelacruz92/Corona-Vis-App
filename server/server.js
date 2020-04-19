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
function _parseCoronaData(text) {
    const root = parse(text);
    const children = root.querySelector('#usa_table_countries_today tbody').childNodes;
    const rows = children.filter(node => node.tagName === 'tr');
    const result = {};
    rows.forEach((row, i) => {
        if (i !== 0) {
            const tds = row.childNodes.filter(node => node.tagName === 'td');
            result[tds[0].text.trim()] = {
                total_cases: tds[1].text.trim(),
                total_death: tds[3].text.trim()
            };
        }
    }); 
    return result;
}

function getCoronaData() {
    return new Promise((acc, rej) => {
        fetch(config.corona_data_url)
            .then(resp => {
                return resp.text();
            })
            .then(text => {
                acc(_parseCoronaData(text));
            })
            .catch(err => {
                rej(err);
            })
        }
    );
}

function _parseStateCoors(text) {
    const root = parse(text);
    const table = root.querySelector('table');
    const rows = table.childNodes.filter(node => node.tagName === 'tr');
    const result = {};
    rows.forEach((row, i) => {
        if (i !== 0) {
            const tds = row.childNodes.filter(node => node.tagName === 'td');
            result[tds[0].childNodes[0].text.trim()] = {
                latitude: tds[1].text.trim(),
                longitude: tds[2].text.trim()
            }
        }
    });
    return result;
}   

function getStateCoor() {
    return new Promise((acc, rej) => {
        fetch(config.states_coor_url)
            .then(resp => {
                return resp.text();
            })
            .then(text => {
                acc(_parseStateCoors(text));
            })
            .catch(err => {
                rej(err);
            });
    });
}

function getData() {
    return new Promise((acc, rej) => {
        getCoronaData()
            .then(coronaData => {
                getStateCoor()
                    .then(stateCoors => {
                        // Map keys to lower case name
                        const coronaNameMap = {};
                        Object.keys(coronaData).forEach(key => {
                            coronaNameMap[key.toLowerCase()] = key;
                        });

                        // Map state names to lower case names
                        const stateNameMap = {};
                        Object.keys(stateCoors).forEach(key => {
                            stateNameMap[key.toLowerCase()] = key;
                        });
                        
                        // Join keys of state coors and corona data
                        Object.keys(coronaNameMap).forEach(stateCorona => {
                            Object.keys(stateNameMap).forEach(stateCoor => {
                                if (stateCoor.includes(stateCorona)) {
                                    const coronaKey = coronaNameMap[stateCorona];
                                    const coorKey = stateNameMap[stateCoor];
                                    coronaData[coronaKey]['coors'] = stateCoors[coorKey];
                                }
                            });
                        });
                        acc(coronaData);
                    })
                    .catch(err => {
                        console.log(err);
                    });
            })
            .catch(err => {
                console.log(err);
            });
    });
}

module.exports = {
    getCoronaData,
    getStateCoor,
    getData
};