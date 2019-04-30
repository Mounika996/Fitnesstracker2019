"use strict";

function getDateNow() { 
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    if(month < 9)
    	month = '0' + month;
    var day = date.getDate();
    if(day < 9)
    	day = '0' + day;    
    var hour = date.getHours();
    if(hour < 9)
    	hour = '0' + hour;
    var minute = date.getMinutes();
    if(minute < 9)
    	minute = '0' + minute;
    var second = date.getSeconds();
    if(second < 9)
    	second = '0' + second;
    var now = year+'-'+month+'-'+day+' '+hour+':'+minute+':'+second;
    return now;
}

exports.getDateNow = getDateNow;