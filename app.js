//initial list of topics
var topics = [
	"Monster Hunter World",
	"Persona 3",
	"Infamous 2",
	"Kingdom Hearts 2",
	"Jak and Daxter",
	"Undertale",
	"Katamari",
	"Okami",
	"Final Fantasy X",
	"Kirby",
];

//removes all existing buttons and then makes buttons for each element in topics array
function displayButtons() {
	$("#buttons").empty();
	for (var i = 0; i < topics.length; i++) {
		//create new button
		var newButton = $("<button>");
		newButton.attr("class", "topic-button");
		
		//add topic name to text of button and data attribute
		newButton.text(topics[i]);
		newButton.attr("data-topic", topics[i]);
		$("#buttons").append(newButton);
	}
}

//on page load...
$(document).ready(function() {
	//display initial buttons
	displayButtons();

	//click listener for topic buttons
	$("#buttons").on("click", ".topic-button", function() {
		var queryUrl = "https://api.giphy.com/v1/gifs/search?api_key=CY6UZtoLGsDb7sYJ2f13NvtSGnimwjNS&q="
		+$(this).attr("data-topic") +"&limit=10&offset=0&rating=PG-13&lang=en"
		$.ajax({
			url: queryUrl,
			method: "GET"
		}).then(function(response) {
			var gifs = response.data;
			var gifSection = $("<div>");

			gifSection.attr("class", "gif-section");
			for (var i = 0; i < gifs.length; i++) {
				//create new div and img elements
				var gifDiv = $("<div>");
				var gifImg = $("<img>");
	
				//give data to img element with still and animated URLS, plus which state it is in
				gifImg.attr("data-still-url", gifs[i].images.fixed_height_still.url);
				gifImg.attr("data-animate-url", gifs[i].images.fixed_height.url);
				gifImg.attr("data-state", "still");
	
				//set img src to still URL
				gifImg.attr("src", gifImg.attr("data-still-url"));
				gifImg.attr("class", "gif-img");
	
				//add img to div
				gifDiv.append(gifImg);
	
				//add new elements for holding rating and url
				var gifRating = $("<p>");
				var gifLink = $("<a>");
				gifRating.text("Rating: " +gifs[i].rating);
				gifRating.attr("class", "gif-rating");
				gifLink.text("Giphy Link");
				gifLink.attr("href", gifs[i].url);
				gifLink.attr("class", "gif-link");
				gifDiv.append(gifRating);
				gifDiv.append(gifLink);
	
				//add the whole thing to the page
				$(gifSection).append(gifDiv);
			}

			$("#gifs").prepend(gifSection);
		});
	});

	//click listener for gifs
	$("#gifs").on("click", ".gif-img", function() {
		if ($(this).attr("data-state") == "still") {
			$(this).attr("src", $(this).attr("data-animate-url"));
			$(this).attr("data-state", "animate");
		} else {
			$(this).attr("src", $(this).attr("data-still-url"));
			$(this).attr("data-state", "still");
		}
	});

	//click listener for adding new button
	$("#add-button").on("click", "#add-button-submit", function() {
		event.preventDefault();
		var newTopic = $("#add-button-input").val().trim();
		topics.push(newTopic);
		displayButtons();
	});
});