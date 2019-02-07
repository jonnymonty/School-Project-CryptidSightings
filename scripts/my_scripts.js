$(document).ready(function(){
    
    // Build a date picker for users to enter sighting date.
    $("#datepicker").datepicker({
        changeMonth: true,
        changeYear: true
    });
    
    // Build a better radio button set for end users to select creature type.
    $("#type_select").buttonset();
    
    // Build number entry sliders for user to enter distance, etc.
    $("#slide_dist").slider({
        value: 0,
        min: 0,
        max: 500,
        step: 10,
        slide: function(event, ui){
            $("#distance").val(ui.value);
        }
    });
    $("#distance").val($("#slide_dist").slider("value"));
    
    // Weight
    
    $("#slide_weight").slider({
        value: 0,
        min: 0,
        max: 5000,
        step: 5,
        slide: function(event, ui){
            $("#weight").val(ui.value);
        }
    });
    $("#weight").val($("#slide_weight").slider("value"));
    
    // Height
    
    $("#slide_height").slider({
        value: 0,
        min: 0,
        max: 20,
        step: 1,
        slide: function(event, ui){
            $("#height").val(ui.value);
        }
    });
    $("#height").val($("#slide_height").slider("value"));
    
    // Build a color mixer interface component for user to enter data.
    
    function refreshSwatch(){
        var red = $("#red").slider("value");
        var green = $("#green").slider("value");
        var blue = $("#blue").slider("value");
        var my_rgb = "rgb(" + red + "," + green + "," + blue + ")";
        
        $("#swatch").css("background-color", my_rgb);
        
        $("#red_val").val(red);
        $("#green_val").val(green);
        $("#blue_val").val(blue);
        $("#color_val").val(my_rgb);
    }
    
    $("#red, #green, #blue").slider({
        orientation: "horizontal",
        range: "min",
        max: 255,
        value: 127,
        slide: refreshSwatch,
        change: refreshSwatch
        
    });
    
    $("#red").slider("value", 127);
    $("#green").slider("value", 127);
    $("#blue").slider("value", 127);
    
    // Build for a latitude and longitude slider.
    $("#slide_lat").slider({
        value: 0,
        min: -90,
        max: 90,
        step: .00001,
        slide: function(event, ui){
            $("#latitude").val(ui.value);
        }
    });
    
    $("#slide_long").slider({
        value: 0,
        min: -180,
        max: 180,
        step: .00001,
        slide: function(event, ui){
            $("#longitude").val(ui.value);
        }
    });
    
    //Build a pretty submit button and form submit functionality
    $("button:submit").button();
    
    $("#frmAddSighting").submit(function(){
        return false;
    });
    
    $("#btnSave").click(function(){
        var data = $("#frmAddSighting :input").serializeArray();
        
        $.post($("#frmAddSighting").attr('action'), data, function(json){
            if(json.status === "fail"){
                alert(json.message);
            } else if(json.status === "success"){
                alert(json.message);
            } else {
                alert("Nothing Happened");
            }
        }, "json");
    });
}); // end doc ready