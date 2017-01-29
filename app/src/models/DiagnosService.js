'use strict';

module.exports = angular.module('gloriumApp.DiagnosService', ['gloriumApp.DateHelperService'])

.factory('Diagnos', ['DateHelper', function (DateHelper) {

    var defaults = {
        code: '',
        diagnosis: '',
        additionDate: '',
        removalDate: ''
    };

    /**
     *
     * @param {object} record
     * @param {Patient} patient
     * @constructor
     */
    var Diagnos = function (record, patient) {
        record = record && typeof record == 'object' ? record : {};
        angular.forEach(defaults, function (defaultValue, key) {
            this[key] = record.hasOwnProperty(key) ? record[key] : defaultValue;
        }, this);

        /** @returns {Patient} */
        this.getPatient = function () {
            return patient;
        };
    };

    /**
     *
     * @param {Array} records
     * @param {Patient} patient
     * @returns {Array}
     */
    Diagnos.createCollection = function (records, patient) {
        var collection = [];

        if(records && records.length) {
            for(var i = 0, l = records.length; i < l; i++) {
                collection.push(new Diagnos(records[i], patient));
            }
        }

        return collection;
    };

    Diagnos.prototype.save = function () {
        var patient = this.getPatient();

        if(!patient.hasDiagnos(this)) {
            this.additionDate = DateHelper.current();
            patient.diagnoses.push(this);
        }

        return patient.save();
    };

    Diagnos.prototype.remove = function () {
        /**  @type {Patient} */
        var patient = this.getPatient();

        if(-1 == patient.diagnosesHistory.indexOf(this)) {
            this.removalDate = DateHelper.current();
            patient.diagnosesHistory.push(this);

            var index = patient.diagnoses.indexOf(this);
            if(-1 !== index) {
                patient.diagnoses.splice(index, 1);
            }

            return patient.save();
        }
    };

    return Diagnos;
}]);
