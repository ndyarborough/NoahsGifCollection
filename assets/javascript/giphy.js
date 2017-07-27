 var searches = [];
 var stillGif = [];
 var animatedGif = [];
 var objectHolder;

function newSearch() {
	event.preventDefault();
	var inputValue = $("#search").val();
	if(searches.indexOf(inputValue) === -1){
		searches.push(inputValue);
	}
	var queryURL = $.get("https://api.giphy.com/v1/gifs/search?q=" + inputValue + "&api_key=cee1e21b11c740869a9c7558b5981edd&limit=1", function(response){
		console.log(response);
	objectHolder = response;
	$(".searches").children(".gif").remove();

	for(i = 0; i < searches.length; i++) {
		$(".searches").append("<button class='gif'>" + searches[i] + "</button>");
	}

	});

}

function loadInfo() {
	for(i = 0; i < objectHolder.data.length; i++) {
		stillGif[i]  = objectHolder.data[i].images.original_still.url;
	    animatedGif[i] = objectHolder.data[i].images.original.url;
	    console.log(stillGif[i]);
	    console.log(animatedGif[i]);
		// searches[i].push(stillGif);
		// searches[i].push(animatedGif);
		$(".my-search-box").append("<img height='200' class='stillGif' src='" + stillGif[i] + "'>" )
	}
}

function togglePlay() {
	var src = $(this).attr('src');
		if(src.search("_s.gif") != -1){
		 $(this).attr('src', src.replace('_s.gif', '.gif'));
		} else {
			$(this).attr('src', src.replace('.gif', '_s.gif'));
		}
}


$("#submit").on("click", newSearch);

$(document).on("click", ".gif", loadInfo);
$(document).on("click", ".stillGif", togglePlay);
