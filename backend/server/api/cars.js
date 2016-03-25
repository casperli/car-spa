'use strict';

const SetupEndpoint = require('./setup/setup.js');

module.exports = SetupEndpoint({
    name: 'cars',
    urls: [
        {
            params: '',
            requests: [{
                method: 'GET',
                response: '/json-templates/cars.json'
            }]
        }
    ]/*,
    statusCode: 401*/
});
