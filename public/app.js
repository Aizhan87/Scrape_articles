$(document).ready(function () {
  $('.modal').modal();
  $('.sidenav').sidenav();
});

// Grab the articles as a json
$.getJSON("/articles", function (data) {
  // For each one
  for (var i = 0; i < data.length; i++) {
    // Display the apropos information on the page
    $("#articles").append("<p class='data-entry' data-id=" + data[i]._id + "><span class='dataTitle' data-id=" +
      data[i]._id + ">" + data[i].title + "<br />" + data[i].link + "<br />" + "<span class='submit_note'>Submit note</span><span class='delete_scrape'>Delete From Saved</span></p>");
  }
});


$(document).on("click", "#scrape-articles", function () {
  alert("scrape complete!")
})


// Whenever someone clicks a p tag
$(document).on("click", ".submit_note", function () {
  $('.modal').modal("open");

  // Empty the notes from the note section
  $("#notes").empty();
  // Save the id from the p tag
  var thisId = $(this).parent();

  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId.attr("data-id")
  })
    // With that done, add the note information to the page
    .then(function (data) {
      console.log(data);
      // The title of the article
      $("#title").append("<h5>" + data.title + "</h5>");
      $("#submit-note-button").append("<button data-id='" + data._id + "' id='savenote' class='waves-effect waves-light btn'><a href='/'> Save Note</a></button>");
      $("#note-title").append("        " + data.note.title);
      $("#note-content").append("        " + data.note.body);

      // A button to submit a new note, with the id of the article saved to it

      $("#note-content").append("<button data-id='" + data.note._id + "' class='delete_note'>X</button>");

      // If there's a note in the article
      // if (data.note) {
      //   // Place the title of the note in the title input
      //   $("#titleinput").val(data.note.title);
      //   // Place the body of the note in the body textarea
      //   $("#bodyinput").val(data.note.body);
      // } else {
      //   $(".button").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");
      // }
    });
});

// When you click the savenote button
$(document).on("click", "#savenote", function () {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      // Value taken from title input
      title: $("#titleinput").val(),
      // Value taken from note textarea
      body: $("#bodyinput").val()
    }
  })
    // With that done
    .then(function (data) {

      $("#note-title").empty();
      $("#note-content").empty();
      // Log the response
      console.log(data);
      window.location.href = "/"

      // Empty the notes section
    });

  // Also, remove the values entered in the input and textarea for note entry
  $("#titleinput").val("");
  $("#bodyinput").val("");
});

$(document).on("click", ".delete_note", function () {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    type: "DELETE",
    url: "/articles/delete/" + thisId,
  })
    // With that done
    .then(function (data) {
      // Log the response
      console.log(data);
      // Empty the notes section

      $("#note-title").empty();
      $("#note-content").empty();

    });

  // Also, remove the values entered in the input and textarea for note entry
  $("#titleinput").val("");
  $("#bodyinput").val("");
});


$(document).on("click", ".delete_scrape", function () {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).parent();

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    type: "DELETE",
    url: "/articles/delete/scrape/" + thisId.attr("data-id"),
  })
    // With that done
    .then(function (data) {
      // Log the response
      console.log(data);
      // Empty the notes section
      window.location.href = "/"
    });
});