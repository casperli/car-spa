'use strict'

var carSpa = angular.module('carSpa', ['ui.router', 'carSpa.controllers', 'carSpa.services', 'carSpa.directives']);

carSpa.config(urlConfiguration);

urlConfiguration.$inject = ['$stateProvider', '$urlRouterProvider'];

function urlConfiguration($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/welcome');
    $stateProvider.state('carList', {
        url: '/carList',
        templateUrl: 'templates/carList.html',
        controller: 'CarListController',
        controllerAs: 'vm'
    });
    $stateProvider.state('welcome', {
        url: '/welcome',
        templateUrl: 'templates/welcome.html',
        controller: 'WelcomeController',
        controllerAs: 'vm'
    });
}



