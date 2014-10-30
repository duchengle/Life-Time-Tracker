'use strict';
var dateTypeEnum = require('./enum/dateType');
var Msg = require('./message');
var Const = require('./const');
var SINGLE_DAY = Const.SINGLE_DAY;
var MULTIPLE_DAY = Const.MULTIPLE_DAY;
var _ = require('lodash');
exports.dispose = function (options, scanResult) {
    var statist = getStatist(options);
    if (statist) {
        if (statist.type === SINGLE_DAY && _.isArray(scanResult.days)) {
            scanResult = scanResult.days[0];
        }
        return statist.dispose(options, scanResult);
    } else {
        Msg.error('can find corresponding statist for you');
    }
};

function getStatist(options) {
    var dateItems = options.dateItems;
    var dateItemLen;
    var statist = null;
    if (!dateItems) {
        dateItemLen = -1;
    } else {
        dateItemLen = dateItems.length;
    }
    if (dateItemLen === 1 ) {
        var dateType = dateItems[0].type;
        if (dateType === dateTypeEnum.Day) {
            statist = getSingleDayStatist();
        } else if (dateType === dateTypeEnum.Month) {
            statist = getMultipleDayStatist();
        } else if (dateType === dateTypeEnum.Year) {
            statist = getMultipleDayStatist();
        }
    } else if (dateItemLen > 1){
        statist = getMultipleDayStatist();
    }

    if (options.dateRange) {
        statist = getMultipleDayStatist();
    }
    return statist;
}

function getSingleDayStatist() {
    var statist;
    statist = require(getStatModuleName('day'));
    statist.type = SINGLE_DAY;
    return statist;
}

function getMultipleDayStatist() {
    var statist;
    statist = require(getStatModuleName('multipleDays'));
    statist.type = MULTIPLE_DAY;
    return statist;
}

function getStatModuleName(name) {
    return './statists/' + name;
}
