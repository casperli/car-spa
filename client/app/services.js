var services = angular.module('carSpa.services', []);
services.factory('CarListService', CarListService);

CarListService.$inject = ['$http', '$q'];

function CarListService($http, $q) {

    function loadCars(year, brand, colour) {
        var deferred = $q.defer();

        var carAddress = 'http://localhost:8081/cars';
        var params = {params: {year: year, brand: brand, colour: colour}};

        $http.get(carAddress, params).then(function (response) {
            var cars = angular.copy(response.data);
            deferred.resolve(cars);
        });

        return deferred.promise;
    }

    return {
        loadCars: loadCars
    }
}

services.factory('ReferenceDataService', ReferenceDataService);
ReferenceDataService.$inject = ['$http', '$q'];

function ReferenceDataService($http, $q) {

    function loadColours() {
        return loadData('colours');
    }

    function loadBrands() {
        return loadData('brands');
    }

    function loadYears() {
        return initYears(1960, 2016);
    }

    function loadPresetValues() {
        var deferred = $q.defer();

        $http.get('http://localhost:8081/selectedFilterValues').then(function (response) {
            var result = angular.copy(response.data);
            deferred.resolve(result);
        });

        return deferred.promise;
    }

    function savePresetValues(filters) {
        var deferred = $q.defer();

        var toSave = {
            yearFilter: {
                selectedValue: filters.yearFilter.selectedValue
            },
            brandFilter: {
                selectedValue: filters.brandFilter.selectedValue
            },
            colourFilter: {
                selectedValue: filters.colourFilter.selectedValue
            }
        }

        $http.put('http://localhost:8081/selectedFilterValues', toSave).then(function (response) {
            deferred.resolve(response.data);
        });

        return deferred.promise;
    }

    function loadData(apiEntity) {
        var deferred = $q.defer();

        $http.get('http://localhost:8081/' + apiEntity).then(function (response) {
            var entities = angular.copy(response.data);
            deferred.resolve(entities);
        });

        return deferred.promise;
    }

    function initYears(begin, end) {
        var years = [];

        for (var i = begin; i <= end; i++) {
            years.push({name: i.toString()});
        }

        return years;
    }

    return {
        loadColours: loadColours,
        loadBrands: loadBrands,
        loadYears: loadYears,
        loadPresetValues: loadPresetValues,
        savePresetValues: savePresetValues
    }
}