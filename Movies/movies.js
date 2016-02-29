var apiKEY ="bbac8b1e7af798207cca486b8bb4c374",
i = 0,
text,
title,
tableFormat,
HTMLoverview,
HTMLpic,
HTMLcast,
HTMLgenre;
function initialize () 
{
		HTMLoverview = document.getElementById("Overview");
		HTMLpic = document.getElementById("moviePicture");
		HTMLcast = document.getElementById("Cast");
		HTMLgenre = document.getElementById("Genre");
}

function sendRequest () {
   var xhr = new XMLHttpRequest();
 
	
	var query = encodeURI(document.getElementById("form-input").value);
	xhr.open("GET", "https://api.themoviedb.org/3/search/movie?query=" + query+"&api_key=bbac8b1e7af798207cca486b8bb4c374");

  xhr.setRequestHeader("Accept","application/json");
   xhr.onreadystatechange = function () {
       if (this.readyState == 4) {
          var json = JSON.parse(this.responseText);
			console.log(json.total_results);
			console.log(typeof(json.total_results));
			console.log(json);
			
			
			
			
			title = "<ul>";
		 for(i = 0; i < json.results.length; i++)
			{
				
				
			title += "<li onclick = display("+i+")>"+ json.results[i].title + "    |    "+ json.results[i].release_date +" </li>";
		
			}
			
			title += "</ul>";
			document.getElementById("output").innerHTML = title;
		
						}
						
		display = function(i)
			{
						
				var ImageLocation = "https://image.tmdb.org/t/p/w370/"+json.results[i].poster_path;
				text ='<img src='+ImageLocation+'" style = width:400px; height:350px; align = "top" > ';
				HTMLpic.innerHTML = "<pre>" + text +"</pre>";
				HTMLoverview.innerHTML = "<pre><h4> Summary: </h4><textarea style = 'width:400px; height:100px;' >"+json.results[i].overview +"</textarea></pre>"
				getCast(json.results[i].id);
				getGenre(json.results[i].id);
				
				
			}
			
		getCast = function(ID)
		{
			var xhr2 = new XMLHttpRequest();
			var query = encodeURI(document.getElementById("form-input").value);
			xhr2.open("GET","https://api.themoviedb.org/3/movie/" +ID+"/credits"+"?query="+query+"&api_key=bbac8b1e7af798207cca486b8bb4c374" );	

			xhr2.setRequestHeader("Accept","application/json");
			xhr2.onreadystatechange = function () {
		if (this.readyState == 4) {
          var json = JSON.parse(this.responseText);
		console.log(json);
			
			var cast="";
			for(i= 0; i<5;i++)
			{
			cast+= json.cast[i].name+"\n";
				
				
				
			}
			HTMLcast.innerHTML = "<pre><h4>Cast:</h4>"+cast +"</pre>";
			console.log(cast);
			
			
			
		}
		}
		xhr2.send(null);
		
		
		
		}
		
		getGenre = function(ID)
		{
			var xhr3 = new XMLHttpRequest();
			var query = encodeURI(document.getElementById("form-input").value);
			xhr3.open("GET","https://api.themoviedb.org/3/movie/" +ID+"?query="+query+"&api_key=bbac8b1e7af798207cca486b8bb4c374" );	

			xhr3.setRequestHeader("Accept","application/json");
			xhr3.onreadystatechange = function () {
		if (this.readyState == 4) {
          var json = JSON.parse(this.responseText);
			console.log(json);
			
			var genre="";
			
			for(i= 0; i<json.genres.length;i++)
			{
				if (i == json.genres.length-1)
				{
					genre +=json.genres[i].name+".";
					i++;
				}
				else 
				genre += json.genres[i].name+", ";
				
				
				
			}
			console.log(genre);
			HTMLgenre.innerHTML = "<pre><h4> Genre:</h4>"+genre +"</pre>";
			
			
			
			
		}
		}
		xhr3.send(null);
		
		
		
		}
		
			
			
};
								
		

   xhr.send(null);
}




