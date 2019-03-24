const chalk = require('chalk');

const log = (fileName = '', message = '', color='white', bgColor='gray') => {
    fileName = fileName.toString();
    message = message.toString();

    let currDate = new Date();

    let date = currDate.getUTCDate();
    let month = currDate.getUTCMonth().valueOf() + 1; // month is returned 0-indexed, i.e. Jan is 0
    let year = currDate.getUTCFullYear();

    let hours = currDate.getUTCHours();
    let minutes = currDate.getUTCMinutes();
    let seconds = currDate.getUTCSeconds();

    console.log(
        chalk.keyword(color).bgKeyword(bgColor)(`[${fileName}][${date}-${month}-${year} ${hours}:${minutes}:${seconds}]:`),
        message
    );
};

const registerLogger = (fileName, color, bgColor) => {
    return (message) => {
        log(fileName, message, color, bgColor);
    };
};

module.exports = registerLogger;
