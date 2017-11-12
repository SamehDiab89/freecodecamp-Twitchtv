
var url = 'https://wind-bow.gomix.me/twitch-api/'
var stream = "streams/"; 
var user = "users/"; 
var channel = "channels/"; 
var n = 0;

var usernames = ["freecodecamp", "ESL_SC2", "OgamingSC2", "cretetion", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];

$(function(){
	setTimeout(function(){
     $('#loading').hide();
   },3900);
   setTimeout(function(){
     $('.username').show();
   },4000);
});

for (var i = 0; i < usernames.length; i++) {

	streamAjax(usernames[i] ,i);
};



function streamAjax (name, n) {
	$(".main").append(
		"<div class='username' id="+n+"></div>"
		);
	$.ajax( {
		    url:  url+stream+name,
		    dataType: 'jsonp',
		    type: 'GET',
    		cache: true,
    		crossDomain: true,
		    success: function(data) {
		       // console.log('stream: success', data);
		       var logo = "logo"+n;
		       var dataUser = "dataUser"+n;
		       if(data["stream"] != null) {
		       	$('#'+n).html(
		       		"<div class='info'><div id="+logo+"></div><div id="+dataUser+"></div><div class='status online'>online</div></div><div class='streamMain'><div class='stream streamGame'>Game: "+data["stream"]["game"]+"</div><div class='stream streamViewers'>viewers :"+data["stream"]["viewers"]+"</div></div>"
		       		)
		       	
		       	
		       } else {
		       	$('#'+n).html("<div class='info'><div id="+logo+"></div><div id="+dataUser+"></div><div class='status offline'>offline</div></div><div class='streamMain'>Stream offline. No available information.</div>")
		       };
		       
		       
		       userAjax(name, n);
		       
		    },
		    error: function (data, status, error) {
		      console.log('error', data, status, error);
		    }
		});
}

function userAjax (name, n) {
	$.ajax( {
		    url:  url+user+name,
		    dataType: 'jsonp',
		    type: 'GET',
    		cache: true,
    		crossDomain: true,
		    success: function(data) {
		       // console.log('user: success', data);
		       var dataUser = "dataUser"+n;
		       var logo = "logo"+n;
		       var bio = data["bio"];

		       if (bio === null) {
		       	bio = "No available bio"
		       } else {
		       	bio = "Bio : " + data["bio"];
		       }

		       $('#'+dataUser).html("<div class='dataUser'><a id='link"+n+"' target='_blank' href=''>"+data["display_name"]+"</a></div>");
		       $('#'+logo).html("<img class='logoImage' src="+data["logo"]+" alt=''>");
		       $('#'+n).append("<div class='bio'>"+bio+"</div>");
		       
		       channelAjax(name, n);
		       
		    },
		    error: function (data, status, error) {
		      console.log('error', data, status, error);
		    }
		});
}


function channelAjax (name, n) {
	$.ajax( {
		    url:  url+channel+name,
		    dataType: 'jsonp',
		    type: 'GET',
    		cache: true,
    		crossDomain: true,
		    success: function(data) {
		       // console.log('channel : success', data);
		       var link = data["url"];
		       console.log(link);
		       $("#link"+n).attr("href", link)

	
		    },
		    error: function (data, status, error) {
		      console.log('error', data, status, error);
		    }
		});
}

// function callAjax(name) {
// 	streamAjax(name);
// 	userAjax(name);
// 	channelAjax(name);
// }