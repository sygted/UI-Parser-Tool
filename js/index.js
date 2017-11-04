var text;
var width, height;
var x, y;

$(document).ready(function() {
    $(document).on("click", "#triggerParseModal", function() {
       $("#parseModal").modal('toggle');
    });

    $(document).on("click", "#saveBtn", function() {
        var textToSave = $("#jsonTextArea").val();
        var textToSaveAsBlob = new Blob([textToSave], {type:"text/plain"});
        var textToSaveAsURL = window.URL.createObjectURL(textToSaveAsBlob);
        var fileNameToSaveAs = $("#filename").val();
     
        var downloadLink = document.createElement("a");
        downloadLink.download = fileNameToSaveAs;
        downloadLink.innerHTML = "Download File";
        downloadLink.href = textToSaveAsURL;
        downloadLink.onclick = destroyClickedElement;
        downloadLink.style.display = "none";
        document.body.appendChild(downloadLink);
     
        downloadLink.click();
    });

    function destroyClickedElement(event)
    {
        document.body.removeChild(event.target);
    }
    
    $(document).on("click", "#clear", function() {
        $("#workspace").empty();
    });
    
    $(document).on("click", "#parseBtn", function() {
        var text = $("#jsonTextArea").val();
        readJSON(text);
        $("#parseModal").modal('toggle');
    });

    $("#fileChoose").change(function() {
        var file = document.getElementById('fileChoose').files[0];

        if (file) {
        // create reader
        var reader = new FileReader();
        reader.readAsText(file);
        reader.onload = function(e) {
            var jsonCode = e.target.result;
            readJSON(jsonCode);
        };
    }
    });
});

function readJSON(text) {
    var json = jQuery.parseJSON(text);
        
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
}

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
