const express = require('express');
const jwt = require('jsonwebtoken');
const apiRoutes = express.Router();
const config = require('../config');
const qrCode = require('../controllers/qrCode');

module.exports = function (app) {
    apiRoutes.use(function (req, res, next) {

        var token = req.body.token || req.query.token || req.headers.token;
        if (token) {
            jwt.verify(token, config.secret, function (err, decoded) {
                if (err) {
                    return res.json({
                        status: "err",
                        code: 403,
                        success: false,
                        message: 'Failed to authenticate token.',
                        data: null
                    });
                } else {
                    if (decoded._doc) {
                        req.user = decoded._doc;
                        next();
                    } else {
                        req.user = decoded;
                        next();
                    }
                }
            });
        } else {
            return res.status(403).send({
                status: "err",
                success: false,
                message: 'No token provided.',
                data: null
            });
        }
    });

    app.use('/api', apiRoutes);

    // Authentication API
    app.get('/userLogin', qrCode.login);
    app.post('/userRegister', qrCode.register);

    // qrCode API    
    app.post('/api/createEditDynamicURL', qrCode.createEditDynamicURL);
    app.post('/api/getUserQRCodes', qrCode.getUserQRCodes);
    app.post('/api/getQRCodeByID', qrCode.getQRCodeByID);
    app.post('/api/getQRCodeAnalyticsByID', qrCode.getQRCodeAnalyticsByID);
    app.post('/api/deleteQRCodeByID', qrCode.deleteQRCodeByID);
    app.post('/redirectURL', qrCode.redirectURL);
    app.post('/appSettings', qrCode.appSettings);
};