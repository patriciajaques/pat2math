
//        <link rel="stylesheet" href="http://code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui.css" />   
//        <link rel="stylesheet" href="lib/bootstrap/bootstrap.css" type="text/css"/>
//        <link rel="stylesheet" href="css/index.css" type="text/css"/>
//        <link rel="stylesheet" href="css/paper.css" type="text/css"/>
//        <link rel="stylesheet" href="lib/calculator/calculator.css" type="text/css"/>
//        <link href="lib/divalite/divakit/divajquery/jquery-ui.css" rel="stylesheet" type="text/css"/>
//        <link href="lib/divalite/divakit/divacharkit/divalite.css" rel="stylesheet" type="text/css"/> 
//
//        <script type="text/javascript" src="lib/divalite/divakit/divajquery/jquery-1.5.2.js"></script>
//        <script type="text/javascript" src="lib/divalite/divakit/divajquery/jquery-ui.min.js"></script>
//        <script type="text/javascript" src="lib/divalite/divakit/divalite.js"></script>
//        <script src="js/divaliteAux.js" type="text/javascript" charset="utf-8"></script>
//        <script src="http://code.jquery.com/jquery-1.9.1.js" charset="utf-8"></script>
//        <script src="http://code.jquery.com/ui/1.10.3/jquery-ui.js" charset="utf-8"></script>        
//        <script src="lib/bootstrap/bootstrap.js" type="text/javascript" charset="utf-8"></script>
//        <script src="lib/paint/paint.js" type="text/javascript" charset="utf-8"></script>
//        <script src="lib/calculator/calculator.js" type="text/javascript" charset="utf-8"></script>
//        <script src="js/paper.js" type="text/javascript" charset="utf-8"></script>
//        <script src="js/index.js" type="text/javascript" charset="utf-8"></script>
//        <script src="js/agentPointer.js" type="text/javascript" charset="utf-8"></script>


loadScript("/pat2math/patequation/lib/jquery-ui/jquery-1.10.2.js", function() {
    loadScript("/pat2math/patequation/lib/jquery-ui/ui/jquery-ui.js", function() {
        //loadScript("/pat2math/patequation/lib/divalite/divakit/divalite.js");

        loadScript("/pat2math/patequation/js/string.js", function() {
            loadScript("/pat2math/patequation/js/object.js", function() {
                loadScript("/pat2math/patequation/js/conversion.js", function() {
                    loadScript("/pat2math/patequation/js/server.js", function() {
                        loadScript("/pat2math/patequation/js/index.js");
                    });
                });
            });
        });
        //loadScript("/pat2math/patequation/js/agentPointer.js");
        //loadScript("/pat2math/patequation/js/divaliteAux.js");
        
        loadScript("/pat2math/patequation/lib/bootstrap/bootstrap.js");
        //loadScript("/pat2math/patequation/lib/paint/paint.js");
        //loadScript("/pat2math/patequation/lib/calculator/calculator.js");
    });
});

loadScript("/pat2math/patequation/lib/jquery-ui/themes/base/jquery-ui.css");
loadScript("/pat2math/patequation/lib/bootstrap/bootstrap.css");
//loadScript("/pat2math/patequation/lib/calculator/calculator.css");
loadScript("/pat2math/js/pat2math.js");
//loadScript("/pat2math/patequation/lib/divalite/divakit/divacharkit/divalite.css");

loadScript("/pat2math/patequation/css/index.css");
loadScript("/pat2math/patequation/css/paper.css");

function loadScript(url, callback) {
    // Adding the script tag to the head as suggested before
    var head = document.getElementsByTagName('head')[0];
    var script;
    if (url.indexOf('.js') !== -1) {
        script = document.createElement('script');
        script.type = 'text/javascript';
        script.charset = 'utf-8';
        script.src = url;
    } else if (url.indexOf('.css') !== -1) {
        script = document.createElement('link');
        script.type = 'text/css';
        script.rel = 'stylesheet';
        script.href = url;
    }
    // Then bind the event to the callback function.
    // There are several events for cross browser compatibility.
    script.onreadystatechange = callback;
    script.onload = callback;

    // Fire the loading
    head.appendChild(script);
}