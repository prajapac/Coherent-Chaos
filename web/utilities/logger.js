const log = function(fileName, message) {
    fileName = fileName.toString();
    message = message.toString();

    let currDate = new Date();

    let date = currDate.getUTCDate();
    let month = (currDate.getUTCMonth().valueOf() +1 ); // month is returned 0-indexed, i.e. Jan is 0
    let year = currDate.getUTCFullYear();

    let hours = currDate.getUTCHours();
    let minutes = currDate.getUTCMinutes();
    let seconds = currDate.getUTCSeconds();

    // add '.js' to filename if missing
    let fileNameLen = fileName.length;
    if (fileNameLen > 3) {
        if (fileName[fileNameLen-3] != '.' && fileName[fileNameLen-2] != 'j' && fileName[fileNameLen-1] != 's') {
            fileName = fileName + '.js';
        }
    }

    console.log(
        '[' + date + '-' + month + '-' + year, 
        hours + ':' + minutes + ':' + seconds + ']', 
        fileName + ':', message
    );
};

module.exports = log;
