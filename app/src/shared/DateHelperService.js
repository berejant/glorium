'use strict';

module.exports = angular.module('gloriumApp.DateHelperService', [])
.constant('DateHelper', {

    /** @return {string} */
    current: function () {
        // $filter('date')(new Date, 'dd/MM/yyyy'); // но на нативном js как-то почище выглядит
        var date = new Date;
        return (date.getDate() < 10 ? '0' : '' ) + date.getDate() + '/' + (date.getMonth() < 9 ? '0' : '') + (date.getMonth() + 1) + '/' + date.getFullYear();
    },

    /**
     * @param {String} dateString
     * @return {Date}
     */
    parse: function (dateString) {
        var parts = dateString.split('/');
        var date = new Date(parts[2], parts[1] - 1, parts[0]);
        if(date.toString() == "Invalid Date") {
            throw 'Not valid date format: ' + dateString;
        }

        return date;
    }
});
