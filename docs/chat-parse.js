

//-----------------------------Global Constants------------------------------------------

//Messages
var TEXT = 0, IMAGE = 1, AUDIO = 2, VIDEO = 3, CONTACT = 4, DOCUMENT = 5, LOCATION = 6;

//Other Activity
var MEMBER_MOVEMENT = 20, ENCRYPTION_MESSAGE = 19, ADMIN_CHANGE = 18, NUMBER_CHANGE = 17, GROUP_CREATION = 16, SUBJECT_CHANGE = 15, ICON_CHANGE = 14;


//----------------Check for the various File API support-------------------

if (window.File && window.FileReader && window.FileList && window.Blob) {
  // Great success! All the File APIs are supported.
} else {
  alert('The File APIs are not fully supported in this browser.');
}


//----------------------------

var text = "notext";

  document.getElementById('files').addEventListener('change', handleFileSelect, false);


//---------------Post file uploaded into Database-------------------------
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
            if(isActivity(lines[i]) && lines[i].split(':').length > 4 && !set.has(lines[i].split(':')[3])){
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
                var name = lines[i].substring(preIndex,lines[i].length-2);
                console.log(getUser(lines[i])+":");
                console.log(lines[i]);
                chatNames.push(name);
            }
        }
        console.log("There have been "+j+" names of this chat:\n"+chatNames);
        return chatNames;
    }
}

function visualise(){
    var names = getChatNames();
    var mainc = document.getElementById("main-content");
    mainc.innerHTML = "";
    var chatTitle = document.createElement("div");
    chatTitle.setAttribute('id','chatTitle');
    chatTitle.innerHTML = names[names.length-1];
    mainc.parentNode.appendChild(chatTitle, mainc);
}

function getGeneralChatStats(){
    if(chatImported()){
        var chat = {};

        //Get Chat Names
        var names = getChatNames();
        chat.names = names;
        chat.name = names[names.length-1];

        //Get Chat Members
        chat.members = getMembers();

        //Count chat activities
        chat['total-activity'] = 0;
        chat.texts = 0;
        chat.images = 0;
        chat.audio = 0;
        chat.video = 0;
        var lines = text.split('\n');
        var j = 0;
        for(var i = 0;i < lines.length;i++){
            if(isActivity(lines[i])){
                var type = getActivityType(lines[i]);
                if(type==TEXT){chat['texts']++;}
                else if(type==IMAGE){chat['images']++;}
                else if(type==AUDIO){chat['audio']++;}
                else if(type==VIDEO){chat['video']++;}
                chat['total-activity']++;
            }
        }
        console.log(chat);

        var mainc = document.getElementById("main-content");
        var chatStats = document.createElement("div");
        chatStats.setAttribute('id','chatStats');
        chatStats.innerHTML = '<em>Names:</em><br>'+chat.names+'<br><em>Members</em><br>'+chat.members+'<br><em>Total Activity:&emsp;</em>'+chat['total-activity']+'<br><em>Texts:&emsp;</em>'+chat.texts+'<br><em>Images:&emsp;</em>'+chat.images+'<br><em>Audio:&emsp;</em>'+chat.audio+'<br><em>Video:&emsp;</em>'+chat.video;
        chatStats.style['text-align'] = 'left';
        mainc.parentNode.appendChild(chatStats, mainc);

        return chat;
    }
}

function seeActivityCountForUsers(){

    if(chatImported()){
        var users = [];
        var lines = text.split('\n');
        var j = 0;
        for(var i = 0;i < lines.length;i++){
            if(isActivity(lines[i])){
                var u = getUser(lines[i]);
                var type = getActivityType(lines[i]);

                //Quickly check if there is already an object for the user
                var found = false;
                for(var z=0;z<users.length;z++) {
                    if (users[z]['name']==u) {
                        if(type==TEXT){users[z]['texts']++;}
                        else if(type==IMAGE){users[z]['images']++;}
                        else if(type==AUDIO){users[z]['audio']++;}
                        else if(type==VIDEO){users[z]['video']++;}
                        else{users[z]['other']++;}
                        users[z]['total']++;
                        found = true;break;
                    }
                }
                //Create new user object if not already present
                if(!found){
                    users.push({name:u,total:1,texts:0,images:0,audio:0,video:0,other:0}); 
                    if(type==TEXT){users[users.length-1]['texts']++;}
                    else if(type==IMAGE){users[users.length-1]['images']++;}
                    else if(type==AUDIO){users[users.length-1]['audio']++;}
                    else if(type==VIDEO){users[users.length-1]['video']++;}
                    else{users[users.length-1]['other']++;}
                }
            }
        }

        var key = ["texts","images","audio","video","other"];

        console.log(users);

        var mainc = document.getElementById("main-content");
        var barChart = document.createElement("div");
        barChart.setAttribute('id','stacked-bar');
        mainc.parentNode.appendChild(barChart, mainc);


        //users = [{"name":"Geoff Natin","total":30643,"texts":503,"images":132,"other":128},{"name":"Jack Natin","total":29736,"texts":844,"images":287,"other":106},{"name":"Fetty Wap","total":32779,"texts":1725,"images":114,"other":131}];
        
        initStackedBarChart.draw({
            data: users,
            label: 'name',
            key: key,
            element: 'stacked-bar'
        });
    }
}


//-----------------------------------Get data from line of activity-----------------------------

//Checks that the line of text in the file starts with the date and timestamp.
function isActivity(line){
    return line.substring(0,24).split(':').length>3;
}

function isMessage(activity){
    return (getActivityType(activity) < 10);
}

//Takes a string of activity and returns the user who initiated the activity
function getUser(activity){
    if(isMessage(activity)){
        var afterTimeStamp = activity.split(':')[3];
        return afterTimeStamp.substring(1,afterTimeStamp.length);
    }
    else{
        return "Non-messages";
    }
}

//Takes a string of activity and returns what type of activity it is
function getActivityType(activity){
    if(activity.includes('image omitted')){
        return IMAGE;
    }
    else if(activity.includes('Contact card omitted')){
        return CONTACT;
    }
    else if(activity.includes(" changed this group's icon")){
        return ICON_CHANGE;
    }   
    else if(activity.includes('document omitted')){
        return DOCUMENT;
    }
    else if(activity.includes('video omitted')){
        return VIDEO;
    }
    else if(activity.includes('audio omitted')){
        return AUDIO;
    }
    else if(activity.includes(': location: https://maps.google.com/?q=')){
        console.log("hey joey joe joe"); //This line of code never runs.
        return LOCATION;
    }
    else if(activity.includes(' changed the subject to ')){
        return SUBJECT_CHANGE;
    }
    else if(activity.endsWith(' created this group') || activity.includes(': ‎You created group ')){
        return GROUP_CREATION;
    }
    else if(activity.endsWith("Messages you send to this group are now secured with end-to-end encryption.") || activity.endsWith('Messages you send to this chat and calls are now secured with end-to-end encryption.')){
        return ENCRYPTION_MESSAGE;
    }
    //Only cases left are texts and member entering and leaving
    //If not about member entering or leaving, then it is a message. Member movement have 3 occurences of ':', while texts have 4
    else if(activity.split(":").length>4){
        return TEXT;
    }
    else{
        return MEMBER_MOVEMENT;
    }
}



//-----------------------Stacked Horizontal Bar Chart code--------------------------

/*--------------

1. Add this to the DOM

<div id='stacked-bar'></div>

2. Have your data in the form:

    var data = [{"name":"Hello World","total":30643,"texts":503,"images":132,"audio":128},{"name":"Jane Doe","total":29736,"texts":844,"images":287,"audio":106}];
    var key = ["texts","images","audio"];

3. And then call this:

    initStackedBarChart.draw({
        data: data,
        key: key,
        element: 'stacked-bar'
    });

*/
var initStackedBarChart = {
    draw: function(config) {
        me = this,
        domEle = config.element,
        stackKey = config.key,
        yLabel = config.label,
        data = config.data,
        margin = {top: 20, right: 20, bottom: 30, left: 100},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom,
        xScale = d3.scaleLinear().rangeRound([0, width]),
        yScale = d3.scaleBand().rangeRound([height, 0]).padding(0.1),
        color = d3.scaleOrdinal().range(["#25D366", "#34B7F1" , "#f47a42", "#e534bf","#35a082"]);
        xAxis = d3.axisBottom(xScale),
        yAxis =  d3.axisLeft(yScale),
        svg = d3.select("#"+domEle).append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var stack = d3.stack()
            .keys(stackKey)
            /*.order(d3.stackOrder)*/
            .offset(d3.stackOffsetNone);
    
        var layers= stack(data);
            data.sort(function(a, b) { return b.total - a.total; });
            yScale.domain(data.map(function(d) { return d[yLabel]; }));
            xScale.domain([0, d3.max(layers[layers.length - 1], function(d) { return d[0] + d[1]; }) ]).nice();

        var layer = svg.selectAll(".layer")
            .data(layers)
            .enter().append("g")
            .attr("class", "layer")
            .style("fill", function(d, i) { return color(i); });

          layer.selectAll("rect")
              .data(function(d) { return d; })
            .enter().append("rect")
              .attr("y", function(d) { return yScale(d.data[yLabel]); })
              .attr("x", function(d) { return xScale(d[0]); })
              .attr("height", yScale.bandwidth())
              .attr("width", function(d) { return xScale(d[1]) - xScale(d[0]) });

            svg.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + (height+5) + ")")
            .call(xAxis);

            svg.append("g")
            .attr("class", "axis axis--y")
            .attr("transform", "translate(0,0)")
            .call(yAxis);                           
    }
}




