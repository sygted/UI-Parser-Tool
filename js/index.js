var text;
var width, height;
var x, y;

$(document).ready(function() {
    $(document).on("click", "#triggerParseModal", function() {
       $("#parseModal").modal('toggle');
    });
    
    $(document).on("click", "#clear", function() {
        $("#workspace").empty();
    });
    
    $(document).on("click", "#parseBtn", function() {
        var json = jQuery.parseJSON($("#jsonTextArea").val());
        
        var buttons = json.buttons;
        for(var i = 0; i < buttons.length; i++) {
            text = buttons[i].text;
            width = buttons[i].width;
            height = buttons[i].height;
            x = buttons[i].xPos;
            y = buttons[i].yPos;
            createButton(text, width, height, x, y);
        }
        
        var labels = json.label;
        for(var i = 0; i < labels.length; i++) {
            text = labels[i].text;
            width = labels[i].width;
            height = labels[i].height;
            x = labels[i].xPos;
            y = labels[i].yPos;
            createLabel(text, width, height, x, y);
        }
        
        var textFields = json.textfield;
        for(var i = 0; i < textFields.length; i++) {
            text = textFields[i].text;
            width = textFields[i].width;
            height = textFields[i].height;
            x = textFields[i].xPos;
            y = textFields[i].yPos;
            createTextField(text, width, height, x, y);
        }
    });
});

function createButton(text, width, height, x, y) {
    var newBtn = $('<button>');
    newBtn.css({
        "font-size" : 10,
        "width" : width,
        "height" : height,
        "position" : "absolute",
        "left" : x,
        "top" : y
    });
    newBtn.text(text);
    $("#workspace").append(newBtn);
}

function createLabel(text, width, height, x, y) {
    var newLbl = $('<span>');
    newLbl.css({
        "font-size" : 10,
        "width" : width,
        "height" : height,
        "position" : "absolute",
        "left" : x,
        "top" : y
    });
    newLbl.text(text);
    $("#workspace").append(newLbl);
}

function createTextField(text, width, height, x, y) {
    var newTf = $('<input type="text">');
    newTf.css({
        "font-size" : 10,
        "width" : width,
        "height" : height,
        "position" : "absolute",
        "left" : x,
        "top" : y
    });
    newTf.attr("placeholder", text);
    newTf.text(text);
    $("#workspace").append(newTf);
}
