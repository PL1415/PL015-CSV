"use strict"; // Use ECMAScript 5 strict mode in browsers that support it
$(document).ready(function() {
    $("button").click(function() {
        //calculate();


       var original = document.getElementById("original");
       var temp = original.value;
       var lines = temp.split(/\n+\s*/);

       if (window.localStorage) localStorage.original = temp;

       alert("Dfg");
       $.ajax({
          url: '/ajaxEx/'+ lines +'/',
          type: 'GET',
          success: function (data) {
             alert("sfsf");
             $('body').append(data);
             render(data);
           }
        });
    });
});



window.onload = function() {
    // If the browser supports localStorage and we have some stored data
    if (window.localStorage && localStorage.original) {
        document.getElementById("original").value = localStorage.original;
    }

};

function render(rows){

var resultTemplate = document.getElementById("resultTemplate").innerHTML;

    $('#finaltable').innerHTML = _.template(resultTemplate, { rows: rows });
   /* if (errText != "") {
        finaltable.innerHTML += '' + errText + '';
    }*/

}