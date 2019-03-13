const log = (fileName = '', message = '') => {
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
        `[${date}-${month}-${year} ${hours}:${minutes}:${seconds}]`,
        `${fileName}:`,
        message
    );
};

const registerLogger = (fileName) => {
    return (message) => {
        log(fileName, message);
    };
};

module.exports = registerLogger;
