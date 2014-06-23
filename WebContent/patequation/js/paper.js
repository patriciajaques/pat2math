$(document).ready(function() {    
    loadPaper("#paper-1");
});

function loadPaper(selectedSheet){

    $(selectedSheet + " #logo").tooltip();

    var date = new Date();
    $(selectedSheet + " #dateDay").html(date.getDate());
    $(selectedSheet + " #dateMonth").html(date.getMonth() + 1);
    var year = date.getFullYear() + "";
    $(selectedSheet + " #dateYear").html(year.substring(2));

    $(selectedSheet + " #dateDay").position({
        of: $(selectedSheet + " #date"),
        my: "left center",
        at: "left center"
    });

    $(selectedSheet + " #dateMonth").position({
        of: $(selectedSheet + " #dateMonthAux"),
        my: "center center",
        at: "center center"
    });

    $(selectedSheet + " #dateYear").position({
        of: $(selectedSheet + " #date"),
        my: "right center",
        at: "right center"
    });

    $(selectedSheet + " #dateMonthAux").position({
        of: $(selectedSheet + " #date"),
        my: "center center",
        at: "center center"
    });
}