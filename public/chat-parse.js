

//----------------Check for the various File API support-------------------


if (window.File && window.FileReader && window.FileList && window.Blob) {
  // Great success! All the File APIs are supported.
} else {
  alert('The File APIs are not fully supported in this browser.');
}


//----------------------------

var text = "notext";



//---------------Post file uploaded into Database-------------------------
//--------Code taken from https://www.html5rocks.com/en/tutorials/file/dndfiles/ ------------

function handleFileSelect(evt) {
    var files = evt.target.files;
    for (var i = 0, f; f = files[i]; i++) {
        var reader = new FileReader();
        reader.onload = (function(theFile) {
            return function(e) {
                text = e.target.result;
                console.log("mabe done");
            };
        })(f);
        reader.readAsText(f);
    }
}

//
function chatImported(){
    return text!==("notext");
}

//-------------------Log all the members of the chat to the console-----------------

function getMembers(){
    if(chatImported()){
        var lines = text.split('\n');
        var j = 0;
        let set = new Set();
        for(var i = 0;i < lines.length;i++){
            if(lines[i].split(':').length > 4 && !set.has(lines[i].split(':')[3])){
                set.add(lines[i].split(':')[3]);
                j++;
            }
        }
        var members = Array.from(set);
        console.log("There have been "+j+" members in this chat:\n"+members);
        return members;
    }
}


//---------------------------Get the name of the chat-------------------------------

function getChatNames(){
    if(chatImported()){
        var chatNames = [];
        var lines = text.split('\n');
        var j = 0;
        for(var i = 0;i < lines.length;i++){
            if(lines[i].includes(' changed the subject to ')){
                j++;
                preIndex = lines[i].indexOf('changed the subject to') + 24; //There are 24 characters from the start of that string to the subject
                console.log("preindex: "+preIndex);
                var name = lines[i].substring(preIndex,lines[i].length-2);
                console.log(name);
                chatNames += name;
            }
        }
        console.log("There have been "+j+" names of this chat:\n"+chatNames);
        return chatNames;
    }
}

function visualise(){
    
}

/*



//------------------POUCH DB CODE SNIPPETS-----------------------

//----Creating a database, inserting and retrieving


let db = new PouchDB('mydb');
try {
  let result = await db.post({});
  let doc = await db.get(result.id);
  console.log(doc);
} catch (err) {
  console.log(err);
}

//----Getting something from the database with error handling

let doc;
try {
  doc = await db.get('docid');
} catch (err) {
  if (err.name === 'not_found') {
    doc = {};
  } else {
    throw err; // some error other than 404
  }
}
console.log(doc);


//-----Creating an array of objects from multiple promises from database

let docs = [{}, {}, {}];
let promises = docs.map((doc) => db.post(doc));

let results = await Promise.all(promises);
console.log(results);



//-----Adding multiple things to the database

let docs = [{}, {}, {}];

for (let doc of docs) {
  await db.post(doc);
}



//-----Reading text file from local file url

function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                alert(allText);
            }
        }
    }
    rawFile.send(null);
}

*/








