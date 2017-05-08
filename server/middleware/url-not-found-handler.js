'use strict';

var path = require("path");

module.exports = function () {
    //4XX - URLs not found
    return function customRouteForClient(req, res, next) {
		
		var indexFilePath = path.resolve(__dirname,"../../client","index.html")
		console.log('customRouteForClient() called...', indexFilePath )
		
        res.sendFile( indexFilePath, function (err) {
            if (err) {
                console.error(err);
                res.status(err.status).end();
            }
        });
    };
};