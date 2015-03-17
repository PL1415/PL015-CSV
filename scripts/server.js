module.exports = {
 calculate: function (input) {

    var lines = JSON.parse(input);
    var result;
    var regexp = /\s*"((?:[^"\\]|\\.)*)"\s*,?|\s*([^,]+),?|\s*,/g;
    var commonLength = NaN;
    var r = [];
    var errText = "";
    
    var rows = [];
    
    // Template using underscore
    var row;

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
console.log('lines'+lines[t])
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

return rows
}}

