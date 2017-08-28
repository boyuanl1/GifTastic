var topics = ["Panda", "Lama", "Elephant", "Squirrel", "Parrot"];

//function build all the buttons
function createButtons() {
	$("#buttons").empty();
	for (var i = 0; i < topics.length; i++) {
		var b = $("<button>");
		b.addClass("button");
		b.addClass("btn btn-primary");
		b.attr("value", topics[i]);
		b.text(topics[i]);
		$("#buttons").append(b);
	}
}

//click submit to re-build buttons
$("#addAnimal").on("click", function(event) {
	event.preventDefault();
	topics.push($("#animalInput").val().trim());
	createButtons();
})

//click on any animal button to get gifs
$(document).on("click", ".button", function() {
        var animal = $(this).val();
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
          animal + "&api_key=dc6zaTOxFJmzC&limit=10";
        
        $("#gif").empty();
        $.ajax({
            url: queryURL,
            method: "GET"
          })
          .done(function(response) {
            var results = response.data;
            for (var i = 0; i < results.length; i++) {
              var animalDiv = $("<div>");
              var p = $("<p>").text("Rating: " + results[i].rating);
              var animalImage = $("<img>");
              animalImage.attr("src", results[i].images.fixed_height.url);
              animalImage.attr("stillUrl", results[i].images.fixed_height_still.url);
              animalImage.attr("default", results[i].images.fixed_height.url);
              animalImage.attr("still", "false");
              animalImage.addClass("image");
              animalDiv.append(animalImage);
              animalDiv.append(p);    
              animalDiv.addClass("imageDiv");
              $("#gif").prepend(animalDiv);
            }
          });
});

//click on image to pause it
$(document).on("click", ".image", function() {
	
	if ($(this).attr("still") == "false") {
		$(this).attr("src", $(this).attr("stillUrl"));
		$(this).attr("still", "true");
	}
	else {
		$(this).attr("src", $(this).attr("default"));
		$(this).attr("still", "false");
	}
})

createButtons();