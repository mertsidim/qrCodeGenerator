const moment = require('moment');
const _ = require('lodash');

function utcDefault() {
    let date = new Date()
    return date = moment.utc(date).format();
}
module.exports = {
    'host': 'mongodb',
    'database': 'mongodb+srv://qrCodeDbUser:1M2e3r4t@qr-code.dd0yb.mongodb.net/test',
    /* 'secret': 'QR@123$', */
    'https_port': 8081, //8888
    'http_port': 8080, // 8787
    'successCode': 200,
    'errCode': 403,
    'errMessage': 'Something went wrong!',
    'utcDefault': utcDefault,
};