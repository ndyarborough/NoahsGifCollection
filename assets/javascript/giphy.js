$(document).ready(function() {
var name;
    var searchTitle = ["Animals", "Family Guy", "Shark Week", "NBA", "NFL"];

    function createButtons() {
        $(".searchButtons").empty();

        for (i = 0; i < searchTitle.length; i++) {
            var showBtn = $('<button>').text(searchTitle[i]).addClass('gif').attr({
                'data-name': searchTitle[i]
            });
            $(".searchButtons").append(showBtn);
        }
    }

    createButtons();

    function getGifs() {

        $(".display-box").css("display","block");

        $(".display-box").empty();

        var giphyURL = "http://api.giphy.com/v1/gifs/search?q=" + searchWord + "&api_key=cee1e21b11c740869a9c7558b5981edd&limit=10";
       
        $.ajax({
            url: giphyURL,
            method: 'GET'
        }).done(function(response) {

            var gifArray = response.data;
            console.log(gifArray.length);

            for (i = 0; i < gifArray.length; i++) {
                var stillGif = gifArray[i].images.original_still.url;
                var animatedGif = gifArray[i].images.original.url;
                var thisRating = "Rating: " + gifArray[i].rating;

                var rating = $("<h3>").text(thisRating).addClass("rating");
                var displayGif = $('<img height="150">').attr('data-animated', animatedGif).attr('data-paused', stillGif).attr('src', stillGif).addClass('playOnHover');
                var fullGifDisplay = $('<button>').addClass("fullGifDisplay").append(rating, displayGif);
                $('.display-box').append(fullGifDisplay);
                console.log("yup");
            }
            
        });
    }

    function getGifsOnClick() {
        searchWord = $(this).data("name");
        getGifs();
    }

     function getGifsOnSubmit() {
        searchWord = $('#search').val();
        getGifs();

    }


  

    $(".searchButtons").on("click",".gif", getGifsOnClick);
    $("#submit").on("click", getGifsOnSubmit);




    $(document).on('mouseover', '.playOnHover', function() {
        $(this).attr('src', $(this).data('animated'));
    });
    $(document).on('mouseleave', '.playOnHover', function() {
        $(this).attr('src', $(this).data('paused'));
    });

    $('#submit').on('click', function() {
    	event.preventDefault();

        var newButton = $('#search').val().trim();
        if(searchTitle.indexOf(newButton) === -1 && newButton != ""){
        	searchTitle.push(newButton);
       		 createButtons();
        }
        $('#search').val("");
        

    });

}); //document.ready