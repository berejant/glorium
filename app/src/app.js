'use strict';

var angular = require('angular');

require('angular-ui-router');
require('angular-breadcrumb');
require('angular-ui-mask');
require('angular-modal-service');
require('./app.templates.js');
require('./shared/DateHelperService.js');
require('./models/PatientService.js');
require('./models/DiagnosService.js');
require('./diagnoses-list/DiagnosesListController.js');
require('./edit-diagnos/EditDiagnosController.js');
require('./edit-patient/EditPatientController.js');

// Declare app level module which depends on views, and components
var app = angular.module('gloriumApp', [
    'ui.router',
    'app.templates',
    'ui.mask',
    'ncy-angular-breadcrumb',
    'angularModalService',
    'gloriumApp.PatientService',
    'gloriumApp.DiagnosService',
    'gloriumApp.DateHelperService',
    'gloriumApp.EditPatient',
    'gloriumApp.DiagnosesList',
    'gloriumApp.EditDiagnos'

])

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

    $stateProvider.state('patients', { // заглушка для первого элемента breadcrumb
        url: '/',
        controller: ['$state', function ($state) {
            $state.go('diagnoses', {}, {location: 'replace'});
        }],
        ncyBreadcrumb: {
            label: 'Patients'
        }
    });

    $urlRouterProvider.otherwise('/diagnoses');
}])

.run(['$rootScope', 'Patient', '$urlRouter', function ($rootScope, Patient, $urlRouter) {
    $rootScope.setPatient = function (patient) {
        $rootScope.patient = patient;
    };
}]);