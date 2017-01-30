'use strict';

module.exports = angular.module('gloriumApp.DiagnosesList', ['ui.router'])

.config(['$stateProvider', function ($stateProvider) {
    $stateProvider.state('diagnoses', {
        url: '/diagnoses',
        templateUrl: 'src/diagnoses-list/diagnoses-list.html',
        controller: 'DiagnosesListController',
        ncyBreadcrumb: {
            parent: 'patients',
            label: '{{patient.name}}'
        }
    });
}])

.controller('DiagnosesListController', ['$scope', 'Patient', 'ModalService', function ($scope, Patient, ModalService) {
    /** @var {Patient} Пациент. Теоретически, полученние Patient долно быть по id указанному в $stateParams (url) */
    var patient = Patient.get();
    $scope.setPatient(patient);

    /** @param {Diagnos} diagnos */
    $scope.remove = function (diagnos) {

        ModalService.showModal({
            templateUrl: 'src/diagnoses-list/confirm-remove-modal.html',
            controller: 'ConfirmRemoveDiagnosModalController',
            inputs: {
                diagnos: diagnos
            }
        }).then(function(modal) {
            return modal.close;
        }).then(function(confirmResult) {
            if(confirmResult) {
                diagnos.remove();
            }
        });

    }

}])

.controller('ConfirmRemoveDiagnosModalController', ['$scope', '$element', 'close', 'diagnos',
    function ($scope, $element, close, diagnos) {
        $element.css('display', 'block');
        $scope.diagnos = diagnos;

        $scope.close = function(result) {
            $element.css('display', 'none');
            close(result, 50); // close, but give 500ms for bootstrap to animate
        };
}]);
