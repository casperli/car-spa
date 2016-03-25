'use strict';

const SetupEndpoint = require('./setup/setup.js');

module.exports = SetupEndpoint({
    name: 'brands',
    urls: [
        {
            params: '',
            requests: [{
                method: 'GET',
                response: '/json-templates/brands.json'
            }]
        }
    ]/*,
    statusCode: 401*/
});
