/**
 * Déclaration de l'application routeApp
 */
var routeApp = angular.module('routeApp', [
    // Dépendances du "module"
    'ngRoute',
    'routeAppControllers'
]);

/**
 * Définition des contrôleurs
 */
var routeAppControllers = angular.module('routeAppControllers', []);

/**
 * Configuration du module principal : routeApp
 */
routeApp.config(['$routeProvider',
    function($routeProvider) { 
        
        // Système de routage
        $routeProvider
        .when('/home', {
            templateUrl: 'partials/home.html',
            controller: 'homeCtrl'
        })
        .when('/contact', {
            templateUrl: 'partials/contact.html',
            controller: 'contactCtrl'
        })
        .when('/DragDrop', {
            templateUrl: 'partials/DragDrop.html',
            controller: 'DragDropController'
        })
        .when('/basicControl', {
            templateUrl: 'partials/basicControl.html',
            controller: 'DragDropController'
        })

        .otherwise({
            redirectTo: '/home'
        });
    }
]);

routeAppControllers.controller('DragDropController', function($scope) {
        $scope.message = '';
        $scope.handleDrop = function(item, bin) {
        $scope.message = 'Item ' + item + ' has been dropped into ' + bin;
        }
    });

// Contrôleur de la page d'accueil
routeAppControllers.controller('homeCtrl', ['$scope',
    function($scope){
        $scope.message = "Bienvenue sur la page d'accueil";
    }
]);

// Contrôleur de la page de contact
routeAppControllers.controller('contactCtrl', ['$scope',
    function($scope){
        $scope.message = "Laissez-nous un message sur la page de contact !";
        $scope.msg = "Bonne chance pour cette nouvelle appli !";
    }
]);