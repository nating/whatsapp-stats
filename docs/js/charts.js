



//Display the panels on the page
function visualise(chat){

  showTitlePanel(chat);

  showOverviewPanel(chat);

  showActivityOverTimePanel(chat);

}


//Title Panel displays Chat Subject and names of the members of the chat
function showTitlePanel(chat){
  members = chat.members;
  var membersList = document.getElementById('members-list');
  membersList.innerHTML = "";
  for(var i=0;i<members.length;i++){
    var newli = document.createElement("li");
    newli.appendChild(document.createTextNode(members[i].name));
    membersList.appendChild(newli);
  }
  var chatSubject = document.getElementById('chat-subject');
  chatSubject.innerHTML = chat.name;
}

//Overview panel displays general statistics of the chat
function showOverviewPanel(chat){

    total = 0;
    texts = 0;
    images = 0;
    audios = 0;
    videos = 0;

    members = chat.members;
    for(var i=0;i<members.length;i++){

      activities = members[i].activities;

      for(var j=0;j<activities.length;j++){
        activity = activities[j];
        if(activity.type==TEXT){texts++;}
        else if(activity.type==IMAGE){images++;}
        else if(activity.type==AUDIO){audios++;}
        else if(activity.type==VIDEO){videos++;}
        total++;
      }

    }

    //Add information to the panel
    var totalEl = document.getElementById('total');
    totalEl.innerHTML = total;
    var textsEl = document.getElementById('texts');
    textsEl.innerHTML = texts;
    var imagesEl = document.getElementById('images');
    imagesEl.innerHTML = images;
    var audiosEl = document.getElementById('audios');
    audiosEl.innerHTML = audios;
    var videosEl = document.getElementById('videos');
    videosEl.innerHTML = videos;

}

//The Activity Over Time panel displays the chat activity over time as a line chart
function showActivityOverTimePanel(chat){

  		var colorNames = {red:'red',orange:'orange',yellow:'yellow',green:'green',blue:'blue',purple:'purple',grey:'grey'}
  		var config_line = {
  			type: 'line',
  			data: {
  				datasets: [{
  					label: 'Geoff Natin',
  					backgroundColor: colorNames.red,
  					borderColor: colorNames.red,
  					data: [
              {
              t: new Date('2017','01','22'),
              y: 4
              },
              {
              t: new Date('2017','04','21'),
              y: 5
              },
              {
              t: new Date('2017','04','22'),
              y: 34
              },
              {
              t: new Date('2017','08','01'),
              y: 21
            },
                {
                  t: new Date('2017','11','21'),
                  y: 1
                }
  					],
  					fill: false,
  				}, {
  					label: 'Zach Diebold',
  					fill: false,
  					backgroundColor: colorNames.blue,
  					borderColor: colorNames.blue,
  					data: [
              {
              t: new Date('2017','00','22'),
              y: 12
              },
              {
              t: new Date('2017','04','16'),
              y: 18
              },
              {
              t: new Date('2017','04','22'),
              y: 24
              },
              {
              t: new Date('2017','07','06'),
              y: 9
            },
              {
                t: new Date('2017','11','22'),
                y: 32
              }
  					],
  				}]
  			},
  			options: {
  				responsive: true,
  				title: {
  					display: true,
  					text: 'Chat Activity Over Time'
  				},
  				tooltips: {
  					mode: 'index',
  					intersect: false,
  				},
  				hover: {
  					mode: 'nearest',
  					intersect: true
  				},
  				scales: {
  					xAxes: [{
              type: 'time',
              time:{
                unit: 'week',
                tooltipFormat: 'll',
                displayFormats: {
                    week: 'll'
                }
              },
  						display: true,
  						scaleLabel: {
  							display: true,
  							labelString: 'Date'
  						}
  					}],
  					yAxes: [{
  						display: true,
  						scaleLabel: {
  							display: true,
  							labelString: 'Activity'
  						}
  					}]
  				}
  			}
  		};

			var ctx_line = document.getElementById('canvas').getContext('2d');
			window.myLine = new Chart(ctx_line, config_line);

}
