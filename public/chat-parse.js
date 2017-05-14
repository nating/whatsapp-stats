

//----------------Check for the various File API support-------------------


if (window.File && window.FileReader && window.FileList && window.Blob) {
  // Great success! All the File APIs are supported.
} else {
  alert('The File APIs are not fully supported in this browser.');
}


//----------------------------

var text = "notext";


var db = new PouchDB('my-database');

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

//-------------------Log all the members of the chat to the console-----------------

function getMembers(){
    if(text!==("notext")){
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



//--------------Word Circles------------------

function doTheThing() 
     {
     
var page_text=text;
//alert(page_text);
var diameter = 600 - 30,
    limit=5000,
    format = d3.format(",d"),
    color = d3.scale.category20c();

var bubble = d3.layout.pack()
    .sort(null)
    .size([diameter, diameter])
    .padding(1.5);

var svg = d3.select("#svgid").append("svg")
    .attr("width", diameter)
    .attr("height", diameter)
    .attr("class", "bubble");

  
var data=[
["Tea","Coffee","Soda","Chips","Milk","Chocolate","Beer","Wine","Tobacco","gold","silver"],
[130,30,200,40,230,150,80,65,20,10,100]
];  

var stopwords = {"com":1,"amp":1,"http":1,"href":1,"statuses":1,"search":1,"ago":1,"link":1,"hours":1,"comments":1,"a":1, "about":1, "above":1, "above":1, "across":1, "after":1, "afterwards":1, "again":1, "against":1, "all":1, "almost":1, "alone":1, "along":1, "already":1, "also":1,"although":1,"always":1,"am":1,"among":1, "amongst":1, "amoungst":1, "amount":1,  "an":1, "and":1, "another":1, "any":1,"anyhow":1,"anyone":1,"anything":1,"anyway":1, "anywhere":1, "are":1, "around":1, "as":1,  "at":1, "back":1,"be":1,"became":1, "because":1,"become":1,"becomes":1, "becoming":1, "been":1, "before":1, "beforehand":1, "behind":1, "being":1, "below":1, "beside":1, "besides":1, "between":1, "beyond":1, "bill":1, "both":1, "bottom":1,"but":1, "by":1, "call":1, "can":1, "cannot":1, "cant":1, "co":1, "con":1, "could":1, "couldnt":1, "cry":1, "de":1, "describe":1, "detail":1, "do":1, "done":1, "down":1, "due":1, "during":1, "each":1, "eg":1, "eight":1, "either":1, "eleven":1,"else":1, "elsewhere":1, "empty":1, "enough":1, "etc":1, "even":1, "ever":1, "every":1, "everyone":1, "everything":1, "everywhere":1, "except":1, "few":1, "fifteen":1, "fify":1, "fill":1, "find":1, "fire":1, "first":1, "five":1, "for":1, "former":1, "formerly":1, "forty":1, "found":1, "four":1, "from":1, "front":1, "full":1, "further":1, "get":1, "give":1, "go":1, "had":1, "has":1, "hasnt":1, "have":1, "he":1, "hence":1, "her":1, "here":1, "hereafter":1, "hereby":1, "herein":1, "hereupon":1, "hers":1, "herself":1, "him":1, "himself":1, "his":1, "how":1, "however":1, "hundred":1, "ie":1, "if":1, "in":1, "inc":1, "indeed":1, "interest":1, "into":1, "is":1, "it":1, "its":1, "itself":1, "keep":1, "last":1, "latter":1, "latterly":1, "least":1, "less":1, "ltd":1, "made":1, "many":1, "may":1, "me":1, "meanwhile":1, "might":1, "mill":1, "mine":1, "more":1, "moreover":1, "most":1, "mostly":1, "move":1, "much":1, "must":1, "my":1, "myself":1, "name":1, "namely":1, "neither":1, "never":1, "nevertheless":1, "next":1, "nine":1, "no":1, "nobody":1, "none":1, "noone":1, "nor":1, "not":1, "nothing":1, "now":1, "nowhere":1, "of":1, "off":1, "often":1, "on":1, "once":1, "one":1, "only":1, "onto":1, "or":1, "other":1, "others":1, "otherwise":1, "our":1, "ours":1, "ourselves":1, "out":1, "over":1, "own":1,"part":1, "per":1, "perhaps":1, "please":1, "put":1, "rather":1, "re":1, "same":1, "see":1, "seem":1, "seemed":1, "seeming":1, "seems":1, "serious":1, "several":1, "she":1, "should":1, "show":1, "side":1, "since":1, "sincere":1, "six":1, "sixty":1, "so":1, "some":1, "somehow":1, "someone":1, "something":1, "sometime":1, "sometimes":1, "somewhere":1, "still":1, "such":1, "system":1, "take":1, "ten":1, "than":1, "that":1, "the":1, "their":1, "them":1, "themselves":1, "then":1, "thence":1, "there":1, "thereafter":1, "thereby":1, "therefore":1, "therein":1, "thereupon":1, "these":1, "they":1, "thickv":1, "thin":1, "third":1, "this":1, "those":1, "though":1, "three":1, "through":1, "throughout":1, "thru":1, "thus":1, "to":1, "together":1, "too":1, "top":1, "toward":1, "towards":1, "twelve":1, "twenty":1, "two":1, "un":1, "under":1, "until":1, "up":1, "upon":1, "us":1, "very":1, "via":1, "was":1, "we":1, "well":1, "were":1, "what":1, "whatever":1, "when":1, "whence":1, "whenever":1, "where":1, "whereafter":1, "whereas":1, "whereby":1, "wherein":1, "whereupon":1, "wherever":1, "whether":1, "which":1, "while":1, "whither":1, "who":1, "whoever":1, "whole":1, "whom":1, "whose":1, "why":1, "will":1, "with":1, "within":1, "without":1, "would":1, "yet":1, "you":1, "your":1, "yours":1, "yourself":1, "yourselves":1, "the":1};

var title=[];
var users=[];
var comments=[];
var score=[];
var wordList=[]; //each word one entry and contains the total count [ {cnt:30,title_list:[3,5,9],
var wordCount=[];
var wordMap={};
var wordIdList=[];
var wordTitleMap=[];
var minVal=10000;
var maxVal=-230;
var regex=/\s|\.|,|;|[^a-zA-Z0-9]/g;
var words;
var wordId=0;
var wordStr="";
var titleID=0;
var tokens=page_text.split(regex);
var totalWords=tokens.length;
for (var i=0;i<tokens.length ;i++)
{
  wordStr=tokens[i];
  try
  {
  
  {

  if (typeof(wordStr)!="undefined" && wordStr.length>2)
  {
     wordStr=wordStr.toLowerCase();
     if (stopwords[wordStr]==1 ) 
     {
       continue; //skip the stop words;
     }
     
    if (typeof(wordMap[wordStr])=="undefined"  )
    {
      
      wordList.push(wordStr);
      wordCount.push(1);
      wordMap[wordStr]=wordId;
      wordIdList.push(wordId);
      wordId++;
      
    }
    else
    {
      wordCount[wordMap[wordStr]]++;
    }
  } 
  }
  }
  catch (err)
  {
  
  }
  



  
}

wordIdList.sort(function(x, y)
  { 
    return -wordCount[x] + wordCount[y] 
  }
);

var wordPercentStr="<p>Total words on the page="+totalWords+" , Words used in Visualization="+wordId+"</p>";
wordPercentStr+="<table><tr><td>Word</td><td>Occurence/count</td><td>Good Density (%)</td><td>Gross Density (%)</td></tr>";
var wi=0;
var density;
var grossDensity;
for (var wp=0; wp<wordIdList.length;wp++)
{
  wi=wordIdList[wp];
  density=" "+(wordCount[wi]*100/wordId);
  density=density.substr(0,6);
  grossDensity=(" "+(wordCount[wi]*100/totalWords)).substr(0,6);
  wordPercentStr+="<tr>";
  wordPercentStr+="<td>"+wordList[wi]+"</td><td>"+wordCount[wi]+"</td><td>"+density+"</td><td>"+grossDensity+"</td>";
  wordPercentStr+="</tr>";
}
wordPercentStr+="</table>";
$("#topwords").html(wordPercentStr);
$("#countbox").text(wordId);

minVal=10000;
maxVal=-100;
for (var wi=0; wi<wordList.length; wi++)
{
  if (minVal>wordCount[wi] ) minVal=wordCount[wi];
  if (maxVal<wordCount[wi] ) maxVal=wordCount[wi];
  
}
var data=[
//["Tea","Coffee","Soda","Chips","Milk","Chocolate","Beer","Wine","Tobacco","gold","silver"],
//[130,30,200,40,230,150,80,65,20,10,100]
//users,
//score
wordList,
wordCount
];

var dobj=[];

for (var di=0;di<data[0].length;di++)
{
  dobj.push({"key":di,"value":data[1][di]});
  
  
  
}
  display_pack({children: dobj});
//d3.json("flare.json", function(error, root) 
function display_pack(root)
{
  var node = svg.selectAll(".node")
      .data(bubble.nodes(root)
      .filter(function(d) { return !d.children; }))
    .enter().append("g")
      .attr("class", "node")
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
    .style("fill", function(d) { return color(data[0][d.key]); })
      .on("mouseover", function(d,i)
  {
    d3.select(this).style("fill", "gold"); 
    showToolTip(" "+data[0][i]+"<br>"+data[1][i]+" ",d.x+d3.mouse(this)[0]+50,d.y+d3.mouse(this)[1],true);
    //console.log(d3.mouse(this));
  })
  .on("mousemove", function(d,i)
  {

    tooltipDivID.css({top:d.y+d3.mouse(this)[1],left:d.x+d3.mouse(this)[0]+50});
    //showToolTip("<ul><li>"+data[0][i]+"<li>"+data[1][i]+"</ul>",d.x+d3.mouse(this)[0]+10,d.y+d3.mouse(this)[1]-10,true);
    //console.log(d3.mouse(this));
  })  
    .on("mouseout", function()
  {
    d3.select(this).style("fill", function(d) { return color(data[0][d.key]); });
    showToolTip(" ",0,0,false);
  })  
  ;

  /*node.append("title")
      .text(function(d) { return data[0][d.key] + ": " + format(d.value); });
*/
  node.append("circle")
      .attr("r", function(d) { return d.r; })
    ;
      //.style("fill", function(d) { return color(data[0][d.key]); });

  node.append("text")
      .attr("dy", ".3em")
      .style("text-anchor", "middle")
    .style("fill","black")
      .text(function(d) { return data[0][d.key].substring(0, d.r / 3); });
}
//);



function showToolTip(pMessage,pX,pY,pShow)
{
  if (typeof(tooltipDivID)=="undefined")
  {
             tooltipDivID =$('<div id="messageToolTipDiv" style="position:absolute;display:block;z-index:10000;border:2px solid black;background-color:rgba(0,0,0,0.8);margin:auto;padding:3px 5px 3px 5px;color:white;font-size:12px;font-family:arial;border-radius: 5px;vertical-align: middle;text-align: center;min-width:50px;overflow:auto;"></div>');

    $('body').append(tooltipDivID);
  }
  if (!pShow) { tooltipDivID.hide(); return;}
  //MT.tooltipDivID.empty().append(pMessage);
  tooltipDivID.html(pMessage);
  tooltipDivID.css({top:pY,left:pX});
  tooltipDivID.show();
}

//d3.select(self.frameElement).style("height", diameter + "px");

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








