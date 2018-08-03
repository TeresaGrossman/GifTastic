
//Create Array of players//
var baseballArray = ["Babe Ruth⚾", "Willie Mays⚾", "Ty Cobb⚾", "Barry Bonds⚾", "Lou Gehrig⚾", "Hank Aaron⚾", "Ted Williams⚾", "Cy Young⚾", "Stan Musial⚾", "Jackie Robinson⚾"];


//Create buttons for the players by looping through and generating for each player
$(document).ready(function() {
    for (var i = 0; i < baseballArray.length; i++) {
        $("#baseball-buttons").append("<button type='button' onclick='searchGif(\"" + baseballArray[i] + "\")' class='btn btn-primary' value=' " + baseballArray[i] + "'> " + baseballArray[i] + " </button>");
    }
});
//Code for listening to click on car
function baseballButtonClicked() {
    var userInput = $('#baseball-input').val();
    searchGif(userInput);
}

//When user types in a new bbplayer, add the bbplayer to the list
function submitButtonClicked() {
    var userInput = $('#player-input').val();

    if (userInput) {
        $('#baseball-buttons').append("<button type='button' onclick='searchGif(\"" + userInput + "\")' class='btn btn-primary' value=' " + userInput + "'> " + userInput + " </button>");
    }
}

//API call to server obtain data
function searchGif(bbName) {
    $.ajax({
            url: 'https://api.giphy.com/v1/gifs/search?q= ' + bbName + ' &api_key=XFFV7uwDiuXnEk93bRv14tJlX056dSd4&limit=10&offset=0&rating=G&lang=en',
            method: 'GET',
        })
        .done(function(response) {
            displayGif(response);
        })
}

//Add the ratings to the gifs pulled keeps height fixed when still or animated//
function displayGif(response) {
    $('#bbPlayer').empty();
    for (var i = 0; i < response.data.length; i++) {
        var rating = "<div class='ratings'> Rating:  " + (response.data[i].rating) + " </div>";
        var image = rating + '<img src= " ' + response.data[i].images.fixed_height_still.url +
            '" data-still=" ' + response.data[i].images.fixed_height_still.url +
            ' " data-animate=" ' + response.data[i].images.fixed_height.url + '" data-state="still" class="movImage" style= "width:220px; height:220px">';

        image = '<div class="col-md-4">' + image + "</div>";
        $('#bbPlayer').append(image);
    }
//Create static and animated objects when clicks on players//
    $('.movImage').on('click', function() {
        var state = $(this).attr('data-state');
        if (state === 'still') {
            $(this).attr('src', $(this).attr("data-animate"));
            $(this).attr('data-state', 'animate');
        } else {
            $(this).attr('src', $(this).attr("data-still"));
            $(this).attr('data-state', 'still');
        }

    });
}