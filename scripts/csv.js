"use strict"; // Use ECMAScript 5 strict mode in browsers that support it
$(document).ready(function() {
    $("button").click(function() {
        calculate();
    });
});

function calculate() {
    var result;
    var original = document.getElementById("original");
    var temp = original.value;
    var regexp = /\s*"((?:[^"\\]|\\.)*)"\s*,?|\s*([^,]+),?|\s*,/g;
    var lines = temp.split(/\n+\s*/);
    var commonLength = NaN;
    var r = [];
    var errText = "";
    var resultTemplate = document.getElementById("resultTemplate").innerHTML;
    var rows = [];
    
    // Template using underscore
    var row;

    if (window.localStorage) localStorage.original = temp;
    for(var t in lines) {
        var temp = lines[t];
        var m = temp.match(regexp);
        var result = [];
        var error = false;
        if (m) {
            if (commonLength && (commonLength != m.length) && (errText == "")) {
                errText = 'ERROR! row <' + temp + '> has ' + m.length + ' items!';
                error = true;
            } else {
                commonLength = m.length;
                error = false;
            }
            for(var i in m) {
                var removecomma = m[i].replace(/,\s*$/,'');
                var remove1stquote = removecomma.replace(/^\s*"/,'');
                var removelastquote = remove1stquote.replace(/"\s*$/,'');
                var removeescapedquotes = removelastquote.replace(/\\"/,'"');
                result.push(removeescapedquotes);
            }

            var tr = error ? 'error' : '';
            row = new Object();
            row.type = tr;
            row.items = result;
            rows.push(row);
        } else {
            errText = 'ERROR! row ' + temp + ' does not look as legal CSV';
            error = true;
        }
    }
    
    finaltable.innerHTML = _.template(resultTemplate, { rows: rows });
    if (errText != "") {
        finaltable.innerHTML += '' + errText + '';
    }
}


window.onload = function() {
    // If the browser supports localStorage and we have some stored data
    if (window.localStorage && localStorage.original) {
        document.getElementById("original").value = localStorage.original;
    }

alert("Dfg");
$.ajax({
            url: '/hi',
            type: 'POST',
	    data: $("#original").value,
            success: function (data) {
alert("sfsf");
                $('body').html(data);
            }
            
        });
};
