var HTMLrestPicture,
HTMLName;

function initialize () 
{
	
 HTMLName = document.getElementById("Name");
 
	
}




function addMarker(location) {
  var marker = new google.maps.Marker({
    position: location,
    map: map
  });
  markers.push(marker);
}




	
var map;
var markerList = [];

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 32.75, lng: -97.13},
    zoom: 16
  });}
  
 
function sendRequest () {
	clearList(markerList);
   var xhr = new XMLHttpRequest();
   var userInput;
   userInput = document.getElementById("search").value;

	var bounds = map.getBounds();
	
	xhr.open("GET", "proxy.php?term=" + userInput + "&bounds="+bounds.getSouthWest().lat()+","+bounds.getSouthWest().lng()+"|"+bounds.getNorthEast().lat()+","+bounds.getNorthEast().lng()+"&category_filter=restaurants&limit=10");
  
   xhr.setRequestHeader("Accept","application/json");
   xhr.onreadystatechange = function () {
       if (this.readyState == 4) {
          var json = JSON.parse(this.responseText);
          var str = JSON.stringify(json,undefined,2);
       
	
		var restName = "<ol>";
	
	
		
		console.log(json);
		var i,picture, rating,ratingNum,snippet,website,location;
				
		  for( i = 0; i < json.businesses.length; i++)
		  {
			if( i < 10 )
			{
			picture = json.businesses[i].image_url;
			rating = json.businesses[i].rating_img_url;
			ratingNum = " " +json.businesses[i].rating+"/5";
			snippet = json.businesses[i].snippet_text;
			website = json.businesses[i].url;

			var myLatLng = {lat:json.businesses[i].location.coordinate.latitude,lng:json.businesses[i].location.coordinate.longitude};
			var marker= new google.maps.Marker({ 
			position: myLatLng,
			label: ""+i,
			map: map,
			title: "Restaurant"});
			
			restName += "<li>" +"<h3>"+"<a href='"+website+"'>"+ json.businesses[i].name+"</a>"+"</h3>"+" <p> </p> <img src="+picture+"> <p></p> <img src="+rating+">"+ratingNum+"<p></p>"+snippet+" </li>";
			markerList.push(marker);
			}
			
			else
			{continue}
		}
		 restName += "</ol>";
		 HTMLName.innerHTML = restName;	
		  
		  
       }
	
   };
   xhr.send(null);
}


function clearList(markerList)
{
	
	for(i = 0 ; i < markerList.length; i++)
	{
		markerList[i].setMap(null);
		
	}
	markerList = [];
	
}