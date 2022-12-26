const moment = require('moment')
function formatmssg(username, text) {
    return {
        username,
        text,
        time: moment().format('h:mm a')
    }
}
module.exports = formatmssg