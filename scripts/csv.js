"use strict"; // Use ECMAScript 5 strict mode in browsers that support it
$(document).ready(function() {
    $("button").click(function() {
      var original = document.getElementById("original");
      var lines = original.value.split(/\n+\s*/);
      var temp = original.value;

      if (window.localStorage) localStorage.original = temp;

	  $.ajax({
	      url: '/hi/'+ JSON.stringify(lines) +'/',
	      type: 'GET',
	      dataType: "JSON",
	      success: function (data) {
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
	var resultTemplate = $('#resultTemplate').html();
    	$('#finaltable').html(_.template(resultTemplate, { rows: rows  }));
}

