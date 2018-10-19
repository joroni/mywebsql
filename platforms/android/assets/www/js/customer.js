$(document).ready(function () {

    function toJSONString(form) {
        var obj = {};
        var elements = form.querySelectorAll("input, select, textarea");
        for (var i = 0; i < elements.length; ++i) {
            var element = elements[i];
            var name = element.name;
            var value = element.value;

            if (name) {
                obj[name] = value;
            }
        }

        return JSON.stringify(obj);
    }

    $(".btn-checkout").click(function(e){
        e.preventDefault();
        var form = $( "#customerinfo" );
        // var output = document.getElementById( "output" );     
        var json = toJSONString( this );
             //output.innerHTML = json;
        alert(json) ;
    
         //}, false);
    
    })
});






/*(function() {
        function toJSONString( form ) {
            var obj = {};
            var elements = form.querySelectorAll( "input, select, textarea" );
            for( var i = 0; i < elements.length; ++i ) {
                var element = elements[i];
                var name = element.name;
                var value = element.value;
    
                if( name ) {
                    obj[ name ] = value;
                }
            }
    
            return JSON.stringify( obj );
        }
    
        document.addEventListener( "DOMContentLoaded", function() {
            var form = document.getElementById( "customerinfo" );
           // var output = document.getElementById( "output" );
            form.addEventListener( "submit", function( e ) {
                e.preventDefault();
                var json = toJSONString( this );
                //output.innerHTML = json;
                alert(json) ;
    
            }, false);
    
        });
    
    })();



});*/