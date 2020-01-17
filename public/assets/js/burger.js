// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function () {
  $(".devourIt").on("click", function (event) {
    event.preventDefault();

    var id = $(this).data("id");
    var updateBurger = {
      id: $(this).data("id"),
      devoured: true
    };

    $.ajax("/api/burgers/" + id, { //PUT request
      type: "PUT",
      data: updateBurger
    }).then(function () {
        console.log("changed devoured to", updateBurger.devoured);
        location.reload(); //Page reload for updates
      }
    );
  });

  $("#createForm").on("submit", function (event) {
    event.preventDefault(); //preventDefault needed on a submit event.

    let newBurger = {
      burgerName: $("#burger-name").val().trim(),
      devoured: false
    };

    $.ajax("/api/burgers", { //POST request.
      type: "POST",
      data: newBurger
    }).then(
      function () {
        console.log("created new burger");
        location.reload(); //Page reload for updates
      }
    );
  });
  $(".deleteIt").on("click", function(event) {
    event.preventDefault();
    var id = $(this).data("id");
    console.log("Delete button clicked for id# ", id);

    $.ajax({ //DELETE request.
      url: "/api/burgers/" + id,
      type: "DELETE"
    }).then(function(response) {
      console.log("Database deletion for burger# ", id);
      // Reload the page to get the updated list
      location.reload();
    });
  });
});