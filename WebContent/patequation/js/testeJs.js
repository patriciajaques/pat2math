$(document).ready(function() {
    $("#botao1").click(function() {
        $("#lista_teste").hide("fast");
    });
    $("#botao2").click(function() {
        $("#lista_teste").show("fast");
    });
    
    
   
    
    
    
        
    $(".fraction").draggable({
        containment : "#containment-wrapper",
        appendTo : "body",
        scroll : false,
        cursor : "move",
        opacity : 0.7,
        helper : "clone",
        revert : "invalid",

        start : function() {
            if ($("#dialog").dialog("isOpen")) {
                $("#dialog").dialog('close');
            }

        },
        drag : function() {
        // alert("drag");
        },
        stop : function() {
        // alert("drop");
        // disabled: false;
        // $( "#fraction" ).draggable( "option", "disabled", true );
        // console.log("stop");
        // $(this).draggable( "disable" );
        }
    });
	
    //	$(".fractionFree").sortable();
    //	$(".fractionFree").disableSelection();
	
    $("#droppable").droppable({
        accept : ".fraction",
        activeClass : "custom-state-active",
        hoverClass : "ui-state-hover",
        drop : function(event, ui) {
            $(this).addClass("ui-state-highlight").find("p").html(""); 
            $(this).append(ui.draggable.clone().addClass("fractionFree"));
        // $("<div></div>").text(ui.draggable.text()).appendTo(this);
        }
    }).sortable({
        placeholder: "ui-state-highlight",
        cursorAt: false,
        //connectWith: "containment",
        axis : 'x',
        //items : ".fraction",
        //containment : 'parent',
        helper: 'clone'
    //		sort : function() {
    //			// gets added unintentionally by droppable interacting with sortable
    //			// using connectWithSortable fixes this, but doesn't allow you to
    //			// customize active/hoverClass options
    //			// $( this ).removeClass( "ui-state-highlight" );
    //
    //		}
    });
    $("#dialog").dialog({
        autoOpen : false,
        show : "blind",
        hide : "blind"
    });
    $("#bt1").button().click(function() {
        $("#dialog").dialog('open');
    });
});
