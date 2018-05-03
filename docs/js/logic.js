

//----------------Check for the various File API support-------------------

if (window.File && window.FileReader && window.FileList && window.Blob) {
  // Great success! All the File APIs are supported.
} else {
  alert('The File APIs are not fully supported in this browser.');
}

//----------------------------Load in Chat---------------------------------

//Create a variable for the chat's text to be read into
var text = "notext";

//Add event listener to the file upload element
document.getElementById('files').addEventListener('change', handleFileSelect, false);


//--------Code taken from https://www.html5rocks.com/en/tutorials/file/dndfiles/ ------------

function handleFileSelect(evt) {
    var files = evt.target.files;
    for (var i = 0, f; f = files[i]; i++) {
        var reader = new FileReader();
        reader.onload = (function(theFile) {
            return function(e) {
                text = e.target.result;
                document.getElementById('visualiseButton').disabled = false;
            };
        })(f);
        reader.readAsText(f);
    }
}

//Returns whether the chat has been successfully submitted
function chatSubmitted(){
    return text!==("notext");
}


function displayTestData(){

  loadJSON(function(response) {
     var chat = JSON.parse(response);
     visualise(chat);
  });

}




function displayData(text){

  var chat = parseChat(text);

  showTitlePanel(chat);
};

//Load in local JSON file
//https://stackoverflow.com/questions/19706046/how-to-read-an-external-local-json-file-in-javascript
function loadJSON(callback) {

    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'example-chat.json', true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
          }
    };
    xobj.send(null);
 }
