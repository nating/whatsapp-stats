
//-----------------------------Global Constants------------------------------------------

//Messages
var TEXT = 0, IMAGE = 1, AUDIO = 2, VIDEO = 3, CONTACT = 4, DOCUMENT = 5, LOCATION = 6;

//Other Activity
var MEMBER_MOVEMENT = 20, ENCRYPTION_MESSAGE = 19, ADMIN_CHANGE = 18, NUMBER_CHANGE = 17, GROUP_CREATION = 16, SUBJECT_CHANGE = 15, ICON_CHANGE = 14;

//----------------------------------Chat Parsing-----------------------------------------

//Create array of activity objects
function parseChat(text){

    //Create main Chat object
    var chat = {};

    //Get Chat Names
    var names = getChatNames(text);
    chat.names = names;
    chat.name = names[names.length-1];

    //Create Chat Member objects
    chat.members = [];
    var memberNames = getMemberNames(text);
    for(var i=0;i<memberNames.length;i++){
        chat.members.push({name:memberNames[i],activities:[]});
    }

    //For each line in the Chat
    var lines = text.split('\n');
    for(var i = 0;i < lines.length;i++){

        //We (most interested users) only care about the lines in the chat that are activity
        if(isActivity(lines[i])){

            //If the line has no associated member (someone was added to the chat etc.), then ignore it.
            if(!getMemberName(lines[i])){
              continue;
            }

            //Get information from the line
            memberName = getMemberName(lines[i]);
            type = getActivityType(lines[i]);
            time = getTime(lines[i]);
            date = getDate(lines[i]);

            //Create a new activity object and add it to the Chat's activities
            activity = {
              time: time,
              date: date,
              type: type
            };

            //Add to the relevant member's activities / Create new member if not already added
            for(var z=0;z<chat.members.length;z++) {
                if (chat.members[z]['name'].trim()===memberName.trim()){
                    chat.members[z]['activities'].push(activity);
                    break;
                }
            }
        }
    }

    return chat;
}


//---------------------------------Extracting details from Chat-----------------------------

//Returns the names of every member the Chat ever had
function getMemberNames(text){
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
    return members;
}

//Returns an array of the subjects of the Chat since its beginning
function getChatNames(text){
    var chatNames = [];
    var lines = text.split('\n');
    var j = 0;
    for(var i = 0;i < lines.length;i++){
        if(lines[i].includes(' changed the subject to ')){
            j++;
            preIndex = lines[i].indexOf('changed the subject to') + 24; //There are 24 characters from the start of that string to the subject
            var name = lines[i].substring(preIndex,lines[i].length-2);
            chatNames.push(name);
        }
    }
    return chatNames;
}

//-------------------------------Get data from line of activity-------------------------------

//Checks that the line of text in the file starts with the date and timestamp.
function isActivity(line){
    return line.substring(0,24).split(':').length>3;
}

//Checks that the line's type is in the Message Category (See global constants at top of file)
function isMessage(activity){
    return (getActivityType(activity) < 10);
}

//Takes a string of activity and returns the user who initiated the activity
function getMemberName(activity){
    if(isMessage(activity)){
        var afterTimeStamp = activity.split(':')[3];
        return afterTimeStamp.substring(1,afterTimeStamp.length);
    }
    else{
        return false;
    }
}

//Returns the time 'hh:mm:ss' that the line of activity was initiated at
function getTime(activity){
  return activity.split(',')[1].trim();
}

//Returns the date that the line of activity was initiated at
function getDate(activity){
  ds = activity.split(',')[0].trim().split('/');
  return Date(ds[2],ds[1],ds[0]);
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
