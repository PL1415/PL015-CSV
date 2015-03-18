var assert = chai.assert;

suite('CSV - Creando las tablas ...', function() {
    setup(function(){
        var result;
    
        if (typeof __html__ !== 'undefined') {
            document.body.innerHTML = __html__['test.html'];
            original = document.getElementById('original');
        }
        
    });

    test('Primera prueba: Creando tablas con una fila.', function() {
        original.value = '1';
        calculateN();
        
        result = document.getElementById('result');
        
        textoRes = (result.innerHTML).replace(/(>[\s|\n]+<)/g, '><'); 
        
        textoRes = textoRes.replace(/([\s|\n]+<)/g, '<');
        
        assert.deepEqual(textoRes
                        , '<tbody><tr class=""><td>1</td></tr></tbody>'
                        , 'Elemento unico.');
        
        original.value = '1, 2';
        calculateN();
        
        result = document.getElementById('result');
        
        textoRes = (result.innerHTML).replace(/(>[\s|\n]+<)/g, '><'); 
        
        textoRes = textoRes.replace(/([\s|\n]+<)/g, '<');
        
        
        assert.deepEqual(textoRes
                        , '<tbody><tr class=""><td>1</td><td> 2</td></tr></tbody>'
                        , 'Dos elementos.');
        
    });
    
    
    test('Segunda prueba: Creando tablas con varias filas.', function() {
        original.value = '1\n2';
        calculateN();
        
        result = document.getElementById('result');
        
        textoRes = (result.innerHTML).replace(/(>[\s|\n]+<)/g, '><'); 
        
        textoRes = textoRes.replace(/([\s|\n]+<)/g, '<');
        
        
        assert.deepEqual(textoRes
                        , '<tbody><tr class=""><td>1</td></tr><tr class=""><td>2</td></tr></tbody>'
                        , 'Elemento unico.');
        
        original.value = '1, 2\n3, 4';
        calculateN();
        
        result = document.getElementById('result');
        
        textoRes = (result.innerHTML).replace(/(>[\s|\n]+<)/g, '><'); 
        
        textoRes = textoRes.replace(/([\s|\n]+<)/g, '<');
        
        
        assert.deepEqual(textoRes
                        , '<tbody><tr class=""><td>1</td><td> 2</td></tr><tr class=""><td>3</td><td> 4</td></tr></tbody>'
                        , 'Dos elementos.');
    });
});

suite('CSV - Comprobando funcionalidades ...', function() {
    setup(function(){
        if (typeof __html__ !== 'undefined') {
            document.body.innerHTML = __html__['test.html'];
            original = document.getElementById("original");
        }
        
    });

    test('Tercera prueba: Comprobando el uso de localStorage.', function() {
        if (window.localStorage)
            assert.deepEqual(localStorage.original, '1, 2\n3, 4');
    });
    
    
});


suite('CSV - Comprobando deteccion de errores ...', function() {
    setup(function(){
        var result;
        
        if (typeof __html__ !== 'undefined') {
            document.body.innerHTML = __html__['test.html'];
            original = document.getElementById("original");
        }
        
    });

    test('Cuarta prueba: Comprobando la aparicion de error cuando el texto de entrada esta vacio.', function() {
        original.value = '';
        calculateN();
        
        result = document.getElementById('result');
        
        assert.deepEqual(result.innerHTML
                        , '\n                    \n                '
                        , 'Error - Sin texto');
    });
    
    test('Quinta prueba: Comprobando la aparicion de error cuando una linea del texto no tiene el numero esperado de elementos.', function() {
        original.value = '1,2\n1';
        calculateN();
        
        result = document.getElementById('result');
        
        textoRes = (result.innerHTML).replace(/(>[\s|\n]+<)/g, '><'); 
        
        textoRes = textoRes.replace(/([\s|\n]+<)/g, '<');
        
        
        assert.deepEqual(textoRes
                        , '<tbody><tr class=""><td>1</td><td>2</td></tr><tr class="error"><td>1</td></tr></tbody>'
                        , 'Error - numero erroneo de entradas');
    });
});