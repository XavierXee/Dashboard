var _ = require('underscore');

var Config = (function() {


  // var _this = {};

  this.scheduler = {
    TenSecondsEveryHour : { tickInterval : 10000, tickReturnToZero : 360 },
    TenSecondsEveryHalfHour : { tickInterval : 10000, tickReturnToZero : 180 },
    TenSecondsEveryTenMinutes : { tickInterval : 10000, tickReturnToZero : 60 },
    TenSecondsEveryFiveMinutes : { tickInterval : 10000, tickReturnToZero : 30 },
    TenSecondsEveryMinute : { tickInterval : 10000, tickReturnToZero : 6 }
  }

  // this.setSchedule = function functionName() {
  //
  //
  //
  // }


  return this;


})();

module.exports = Config;
