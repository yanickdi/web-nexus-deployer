var deployer = require('./tasks/lib');
var extend = require('extend');


var deploy = function(options, callback) {
    
        var config = extend({
            debug: false,
            dryRun: false,
            cwd: ''
        }, options);

    return deployer(config, callback);
};

module.exports = {
    deploy: deploy
};