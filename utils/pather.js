const path = require('path');

const pather = (...args) =>{
    return path.join(path.dirname(process.mainModule.filename), ...args);
};

module.exports = pather;