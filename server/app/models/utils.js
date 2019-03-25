"use strict";

function getDateNow() { 
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    var now = year+'-'+month+'-'+day+' '+hour+':'+minute+':'+second;
    return now;
}

exports.getDateNow = getDateNow;