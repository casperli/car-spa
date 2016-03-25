'use strict';

const SetupEndpoint = require('./setup/setup.js');

module.exports = SetupEndpoint({
    name: 'colour',
    urls: [
        {
            params: '',
            requests: [{
                method: 'GET',
                response: '/json-templates/colours.json'
            }]
        }
    ]/*,
    statusCode: 401*/
});
